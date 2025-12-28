
import React, { useState, useEffect, createContext, useContext, PropsWithChildren } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Theme, User, AuthState } from './types';
import { storage } from './services/storageService';
import { supabase } from './services/supabaseClient';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardHome from './pages/DashboardHome';
import ResearchTool from './pages/ResearchTool';
import AnalyticsReports from './pages/AnalyticsReports';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

// Components
import DashboardLayout from './components/DashboardLayout';

// Auth Context
interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Theme Context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = storage.get<Theme | null>('theme', null);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
  });

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // Handle case where profile might not have been created by trigger yet
        console.warn("Profile not found, creating fallback session state", error);
        setAuth({
          user: {
            id: userId,
            email: email,
            name: email.split('@')[0],
            credits: 100, // Default for new users
            isPremium: false,
            preferences: { theme: Theme.DARK, notifications: true },
            stats: { totalResearches: 0, savedReports: 0, activeProjects: 0 }
          },
          isAuthenticated: true,
          isLoading: false
        });
        return;
      }

      setAuth({
        user: {
          id: userId,
          email: email,
          name: profile?.name || email.split('@')[0],
          credits: profile?.credits ?? 0,
          isPremium: profile?.is_premium ?? false,
          preferences: profile?.preferences || { theme: Theme.DARK, notifications: true },
          stats: profile?.stats || { totalResearches: 0, savedReports: 0, activeProjects: 0 }
        },
        isAuthenticated: true,
        isLoading: false
      });
    } catch (e) {
      console.error("Critical error in fetchProfile:", e);
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    // 1. Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!);
      } else {
        setAuth(prev => ({ ...prev, isLoading: false }));
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.debug(`Auth Event: ${event}`);
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email!);
      } else {
        setAuth({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
    storage.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
  };

  const register = async (name: string, email: string, pass: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/#/login`
      }
    });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuth({ user: null, isAuthenticated: false, isLoading: false });
  };

  const updateUser = async (updated: User) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: updated.name,
        preferences: updated.preferences,
        stats: updated.stats,
        credits: updated.credits,
        is_premium: updated.isPremium
      })
      .eq('id', updated.id);

    if (error) throw error;
    setAuth(prev => ({ ...prev, user: updated }));
  };

  const refreshProfile = async () => {
    if (auth.user) {
      await fetchProfile(auth.user.id, auth.user.email);
    }
  };

  const ProtectedRoute: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    if (auth.isLoading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-600 rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">Initializing InsightHub...</p>
        </div>
      );
    }
    if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ ...auth, login, register, logout, updateUser, refreshProfile }}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/signup" element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardHome />} />
              <Route path="tool/:type" element={<ResearchTool />} />
              <Route path="reports" element={<AnalyticsReports />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

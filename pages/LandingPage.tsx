
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, Shield, BarChart2, Search, ArrowRight, Play, CheckCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';
import { Theme } from '../types';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 sm:px-12 py-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-xl text-white">I</div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">InsightHub</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-purple-600 dark:hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-purple-600 dark:hover:text-white transition-colors">Demo</a>
          <a href="#pricing" className="hover:text-purple-600 dark:hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === Theme.LIGHT ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <NavLink to="/login" className="text-sm font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Sign In</NavLink>
          <NavLink to="/signup" className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">Get Started</NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-6 sm:px-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-8 animate-bounce">
            <Zap className="w-4 h-4" />
            <span>Next-Gen AI Research Suite</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Uncover Market Truths with <br /> <span className="text-purple-600 dark:text-purple-500">Intelligent AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop drowning in raw data. InsightHub uses Gemini AI to process billions of data points into actionable intelligence, competitive gaps, and growth opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/signup" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </NavLink>
            <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center shadow-sm dark:shadow-none">
              <Play className="mr-2 w-5 h-5 fill-current" /> Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-20 border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: '10k+', label: 'Active Researchers' },
            { value: '2.5M', label: 'Analyses Run' },
            { value: '99.9%', label: 'Accuracy Rate' },
            { value: '50+', label: 'Data Connectors' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Precision-Engineered Tools</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Everything you need to outpace the competition and dominate your niche.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Market Intelligence', icon: BarChart2, desc: 'Real-time trend analysis and growth forecasting across global markets.' },
              { title: 'Sentiment Tracking', icon: Zap, desc: 'Deep emotional analysis of user reviews, social posts, and news cycles.' },
              { title: 'Competitor Intel', icon: Shield, desc: 'Automated monitoring of competitor pricing, features, and strategic moves.' }
            ].map((f) => (
              <div key={f.title} className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-purple-500/10 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900/20 transition-all">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">Ready to transform your research?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">Join the world's most innovative product managers and analysts.</p>
          <NavLink to="/signup" className="inline-block px-12 py-5 bg-purple-600 dark:bg-white text-white dark:text-slate-900 font-bold text-xl rounded-2xl hover:bg-purple-700 dark:hover:bg-slate-200 transition-all shadow-lg">
            Get Started Now — It's Free
          </NavLink>
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> No credit card</div>
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> 14-day pro trial</div>
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 sm:px-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white">I</div>
              <span className="text-xl font-bold">InsightHub</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">AI-powered research platform for the modern era.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Features</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Integrations</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Guides</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">About</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between text-xs text-slate-600 gap-4">
          <p>© 2025 InsightHub AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-purple-600 dark:hover:text-white">Terms</a>
            <a href="#" className="hover:text-purple-600 dark:hover:text-white">Privacy</a>
            <a href="#" className="hover:text-purple-600 dark:hover:text-white">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

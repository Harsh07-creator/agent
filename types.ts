
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ResearchType {
  PRODUCT = 'product_research',
  MARKET = 'market_analysis',
  SENTIMENT = 'sentiment_analysis',
  COMPETITIVE = 'competitive_intelligence',
  PRICING = 'pricing_intelligence',
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role?: string;
  avatarUrl?: string;
  credits: number;
  isPremium: boolean;
  preferences: {
    theme: Theme;
    notifications: boolean;
  };
  stats: {
    totalResearches: number;
    savedReports: number;
    activeProjects: number;
  };
}

export interface ResearchResult {
  id: string;
  title: string;
  query: string;
  type: ResearchType;
  content: string; // Markdown or JSON string
  timestamp: string;
  isSaved: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

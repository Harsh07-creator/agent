
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Loader2, Save, Download, Share2, AlertCircle, CheckCircle2, Globe, Coins } from 'lucide-react';
import { ResearchType } from '../types';
import { gemini } from '../services/geminiService';
import { firecrawl } from '../services/firecrawlService';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../App';

const ResearchTool: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { user, refreshProfile } = useAuth();
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [agentStatus, setAgentStatus] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const toolInfo = {
    [ResearchType.PRODUCT]: { title: 'Product Research', placeholder: 'Compare best CRM tools for small business...', color: 'purple' },
    [ResearchType.MARKET]: { title: 'Market Intelligence', placeholder: 'Analyze trends in renewable energy for 2025...', color: 'pink' },
    [ResearchType.SENTIMENT]: { title: 'Sentiment Analysis', placeholder: 'Analyze customer sentiment for the latest iPhone launch...', color: 'emerald' },
    [ResearchType.COMPETITIVE]: { title: 'Competitive Intelligence', placeholder: 'Competitor analysis for Tesla in European markets...', color: 'blue' },
    [ResearchType.PRICING]: { title: 'Pricing Intelligence', placeholder: 'Pricing strategy for SaaS project management tools...', color: 'amber' },
  };

  const currentTool = toolInfo[type as ResearchType] || toolInfo[ResearchType.PRODUCT];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (user && user.credits < 5) {
      setError("Insufficient credits. Please upgrade your plan or wait for renewal.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setIsSaved(false);

    try {
      // Step 1: Agent Searching phase
      setAgentStatus('Agent browsing the web for live data via Firecrawl...');
      const webContext = await firecrawl.searchAndCrawl(query);
      
      // Step 2: Reasoning phase
      setAgentStatus('Analyzing data with Gemini and generating insights...');
      const insight = await gemini.runResearch(type as ResearchType || ResearchType.PRODUCT, query, webContext);
      
      setResult(insight);

      // Step 3: Deduct credits and update stats in Supabase
      if (user) {
        // Save history
        await supabase.from('researches').insert({
          user_id: user.id,
          title: query.slice(0, 50) + (query.length > 50 ? '...' : ''),
          query,
          type: type || ResearchType.PRODUCT,
          content: insight,
          is_saved: false
        });

        // Deduct 5 credits and increment total researches
        const newCredits = Math.max(0, user.credits - 5);
        const newTotalResearches = (user.stats.totalResearches || 0) + 1;

        await supabase.from('profiles').update({
          credits: newCredits,
          stats: {
            ...user.stats,
            totalResearches: newTotalResearches
          }
        }).eq('id', user.id);

        await refreshProfile();
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
      setAgentStatus('');
    }
  };

  const handleSave = async () => {
    if (!result || !user) return;
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentTool.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Harness AI & Live Web Data to get deep insights instantly.</p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-2xl border border-amber-200 dark:border-amber-700/50">
          <Coins className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{user?.credits} Credits</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentTool.placeholder}
              rows={3}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-purple-500 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all resize-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={isAnalyzing || !query.trim()}
              className={`
                w-full sm:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center transition-all
                ${isAnalyzing 
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-95'}
              `}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Run Agentic Search (5 Credits)'
              )}
            </button>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <Globe className="w-4 h-4 mr-2 text-blue-500" />
              Dynamic Web Search Enabled
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="flex items-center justify-center p-4 bg-purple-500/10 rounded-xl animate-pulse">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{agentStatus}</span>
            </div>
          )}
        </form>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 p-4 rounded-2xl flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-red-800 dark:text-red-400 font-bold">Analysis Blocked</h4>
            <p className="text-red-700 dark:text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Agent Findings</h3>
                <p className="text-xs text-slate-500">Context verified from live sources</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleSave}
                disabled={isSaved}
                className={`p-2 rounded-xl transition-all ${isSaved ? 'text-green-500 bg-green-50 dark:bg-green-900/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                <Save className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-8 prose prose-slate dark:prose-invert max-w-none">
            <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchTool;

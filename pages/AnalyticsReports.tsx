
import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, MoreVertical, Download, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../App';

const AnalyticsReports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('researches')
        .select('*')
        .order('timestamp', { ascending: false });

      if (data) setReports(data);
      setLoading(false);
    }
    fetchHistory();
  }, [user]);

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('researches').delete().eq('id', id);
    if (!error) {
      setReports(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Research History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Cloud-synced analysis history.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search history..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No history yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">Your research will be saved automatically as you work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/20 text-purple-600`}>
                  <FileText className="w-6 h-6" />
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors line-clamp-1">{report.title}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <span className="capitalize">{report.type.replace('_', ' ')}</span>
                  <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
                  <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(report.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsReports;

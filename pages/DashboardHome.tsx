import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { TrendingUp, Users, FileText, Zap, ChevronRight } from 'lucide-react';
import { useAuth, useTheme } from '../App';
import { gemini } from '../services/geminiService';
import { Theme } from '../types';

const activityData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 18 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 25 },
  { name: 'Fri', count: 20 },
  { name: 'Sat', count: 8 },
  { name: 'Sun', count: 10 },
];

const categoryData = [
  { name: 'Product', value: 40, color: '#8b5cf6' },
  { name: 'Market', value: 30, color: '#ec4899' },
  { name: 'Sentiment', value: 15, color: '#10b981' },
  { name: 'Pricing', value: 15, color: '#f59e0b' },
];

const radarData = [
  { subject: 'Depth', A: 120, B: 110, fullMark: 150 },
  { subject: 'Speed', A: 98, B: 130, fullMark: 150 },
  { subject: 'Accuracy', A: 86, B: 130, fullMark: 150 },
  { subject: 'Clarity', A: 99, B: 100, fullMark: 150 },
  { subject: 'Utility', A: 85, B: 90, fullMark: 150 },
];

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [tip, setTip] = useState('Loading intelligence...');

  useEffect(() => {
    gemini.getDashboardStatsSuggestions().then(setTip);
  }, []);

  const isDark = theme === Theme.DARK;
  const chartTextColor = isDark ? '#94a3b8' : '#64748b';
  const chartGridColor = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipText = isDark ? '#f1f5f9' : '#0f172a';

  const stats = [
    { label: 'Total Researches', value: user?.stats.totalResearches || 0, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' },
    { label: 'Active Projects', value: user?.stats.activeProjects || 0, icon: Zap, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/20' },
    { label: 'Saved Reports', value: user?.stats.savedReports || 0, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
    { label: 'Market Credits', value: '450', icon: Users, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Welcome back, {user?.name}!</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Here's what's happening with your research today.</p>
        </div>
        <div className="flex items-center bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <Zap className="w-5 h-5 text-amber-500 mr-3" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300 italic transition-colors">"{tip}"</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl transition-colors`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full transition-colors">+12%</span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 transition-colors">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Research Activity</h2>
            <select className="bg-slate-50 dark:bg-slate-900 text-xs border-none rounded-lg px-2 py-1 ring-1 ring-slate-200 dark:ring-slate-700 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: chartTextColor}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: chartTextColor}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: isDark ? 'none' : '1px solid #e2e8f0', borderRadius: '12px', color: tooltipText }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors mb-6">Insight Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: isDark ? 'none' : '1px solid #e2e8f0', borderRadius: '12px', color: tooltipText }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-slate-600 dark:text-slate-400 transition-colors">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors mb-6">Recent Reports</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all group cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mr-4 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white transition-colors">AI Dictation Tools Analysis</h4>
                    <p className="text-xs text-slate-500 transition-colors">Completed 2 hours ago • Product Research</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors mb-6">Analysis Quality Radar</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke={chartGridColor} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: chartTextColor }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                <Radar
                  name="Quality"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="B"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.2}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: isDark ? 'none' : '1px solid #e2e8f0', borderRadius: '12px', color: tooltipText }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

import React from 'react';
import { useAuth } from '../App';
import { Camera, Mail, Building2, UserCircle, ShieldCheck, MapPin, Coins, Star } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Profile */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-800 p-1">
              <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-300 relative overflow-hidden">
                <UserCircle className="w-20 h-20" />
                <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                {user?.name}
                {user?.isPremium && <Star className="w-6 h-6 ml-2 text-amber-500 fill-amber-500" />}
                <ShieldCheck className="w-6 h-6 ml-2 text-blue-500" />
              </h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="flex items-center text-sm text-slate-500 dark:text-slate-400"><Mail className="w-4 h-4 mr-1.5" /> {user?.email}</span>
                <span className="flex items-center text-sm text-slate-500 dark:text-slate-400"><Building2 className="w-4 h-4 mr-1.5" /> Insight Labs</span>
                <span className="flex items-center text-sm text-slate-500 dark:text-slate-400"><MapPin className="w-4 h-4 mr-1.5" /> San Francisco, CA</span>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">About Me</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Passionate market analyst specializing in AI-driven competitive intelligence and product positioning. 
              Using InsightHub to accelerate the discovery of untapped market opportunities.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Activity Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Researches</p>
                <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{user?.stats.totalResearches}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Saved</p>
                <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{user?.stats.savedReports}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-amber-500" /> Usage & Plan
            </h3>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  {user?.isPremium ? 'Pro Plan' : 'Free Tier'}
                </span>
                <span className="text-xs font-bold text-slate-500">{user?.isPremium ? '$29/mo' : '$0/mo'}</span>
              </div>
              <div className="w-full bg-purple-200 dark:bg-purple-900/30 rounded-full h-2 mb-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, ((user?.credits || 0) / 500) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500">Credits Remaining: {user?.credits} / 500</p>
            </div>
            {!user?.isPremium && (
              <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Upgrade to Pro
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

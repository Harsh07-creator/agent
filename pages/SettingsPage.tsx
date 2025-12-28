
import React from 'react';
import { useAuth, useTheme } from '../App';
import { Theme } from '../types';
import { Bell, Moon, Sun, Shield, CreditCard, Key, Database } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          <button className="w-full text-left px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold text-sm">General</button>
          <button className="w-full text-left px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">Security</button>
          <button className="w-full text-left px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">Billing</button>
          <button className="w-full text-left px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">API Integrations</button>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Appearance */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Sun className="w-5 h-5 mr-3 text-amber-500" /> Appearance
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Dark Mode</p>
                <p className="text-xs text-slate-500">Switch between light and dark visual themes.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-purple-600 transition-colors"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === Theme.DARK ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-3 text-purple-500" /> Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Email Alerts</p>
                  <p className="text-xs text-slate-500">Get summaries of your reports via email.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">In-App Notifications</p>
                  <p className="text-xs text-slate-500">Real-time alerts for completed analyses.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Database className="w-5 h-5 mr-3 text-pink-500" /> AI & Data Sources
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center mr-4">
                    <span className="font-bold text-xs">G</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Gemini 2.5 Flash</p>
                    <p className="text-xs text-slate-500">Current active model for research.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-500 uppercase">Active</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ClickStats {
  totalClicks: number;
  clicksByType: {
    hero_register?: number;
    navbar_register_desktop?: number;
    navbar_register_mobile?: number;
  };
  clicksByDate: Array<{
    _id: string;
    count: number;
  }>;
  recentClicks: Array<{
    _id: string;
    buttonType: string;
    createdAt: string;
    ipAddress: string;
    userAgent: string;
  }>;
}

export default function ClickStatsPage() {
  const [stats, setStats] = useState<ClickStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/clickTracking');
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C540AB] mx-auto mb-4"></div>
          <p className="text-xl">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={fetchStats}
            className="px-6 py-2 bg-[#C540AB] hover:bg-[#A333A3] rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Registration Click Analytics
          </h1>
          <p className="text-gray-400">
            Track how many people clicked on register buttons
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#C540AB] mb-2">Total Clicks</h3>
            <p className="text-3xl font-bold">{stats?.totalClicks || 0}</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#C540AB] mb-2">Hero Button</h3>
            <p className="text-3xl font-bold">{stats?.clicksByType.hero_register || 0}</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#C540AB] mb-2">Desktop Navbar</h3>
            <p className="text-3xl font-bold">{stats?.clicksByType.navbar_register_desktop || 0}</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#C540AB] mb-2">Mobile Navbar</h3>
            <p className="text-3xl font-bold">{stats?.clicksByType.navbar_register_mobile || 0}</p>
          </div>
        </motion.div>

        {/* Daily Clicks Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Daily Clicks (Last 30 Days)</h3>
          <div className="space-y-2">
            {stats?.clicksByDate.map((day) => (
              <div key={day._id} className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">{formatDate(day._id)}</span>
                <span className="text-white font-semibold">{day.count} clicks</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Clicks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Clicks (Last 100)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-[#C540AB]">Button Type</th>
                  <th className="text-left py-3 px-2 text-[#C540AB]">Time</th>
                  <th className="text-left py-3 px-2 text-[#C540AB]">IP Address</th>
                  <th className="text-left py-3 px-2 text-[#C540AB]">User Agent</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentClicks.map((click) => (
                  <tr key={click._id} className="border-b border-white/5">
                    <td className="py-3 px-2">
                      <span className="inline-block px-2 py-1 bg-[#C540AB]/20 text-[#C540AB] rounded text-xs">
                        {click.buttonType.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-300">{formatDateTime(click.createdAt)}</td>
                    <td className="py-3 px-2 text-gray-300">{click.ipAddress}</td>
                    <td className="py-3 px-2 text-gray-400 max-w-xs truncate">
                      {click.userAgent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <button
            onClick={fetchStats}
            className="px-6 py-3 bg-[#C540AB] hover:bg-[#A333A3] text-white font-semibold rounded-xl transition-all duration-200"
          >
            Refresh Data
          </button>
        </motion.div>
      </div>
    </div>
  );
}

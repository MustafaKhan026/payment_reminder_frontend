'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import SmartInsights from '@/components/common/SmartInsights';
import DashboardCharts from '@/components/charts/DashboardCharts';
import { getAdminDashboardStats } from '@/app/api/admin';

const AdminStatsCard = ({ title, value, icon: Icon, color, iconColor }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className={iconColor} />
      </div>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalPending: 0,
    dueToday: 0,
    completedMonth: 0,
    overdue: 0
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await getAdminDashboardStats();
      if (response.ok) {
        const data = await response.json();
        
        if (data.stats) {
          setStats({
            totalPending: data.stats.total_pending_amount || 0,
            dueToday: data.stats.payments_due_today || 0,
            completedMonth: data.stats.completed_this_month || 0,
            overdue: data.stats.overdue_payments || 0
          });
        }

        if (data.analytics) {
          setAnalyticsData(data.analytics);
        }
        
        // Data for SmartInsights
        setInsightsData({
            expected_collection: data.expected_collection,
            top_overdue: data.top_overdue
        });
      }
    } catch (error) {
      console.error("Failed to fetch admin dashboard data", error);
    } finally {
      setLoading(false);
    }
  };
  
  const chartAnalytics = useMemo(() => {
     if (analyticsData) return analyticsData;
     return null;
  }, [analyticsData]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin! Here's an overview of payment reminders.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard 
          title="Total Pending Payments" 
          value={`₹${stats.totalPending.toLocaleString()}`}
          icon={DollarSign} 
          color="bg-blue-50 dark:bg-blue-900/20" 
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <AdminStatsCard 
          title="Payments Due Today" 
          value={stats.dueToday} 
          icon={Clock} 
          color="bg-yellow-50 dark:bg-yellow-900/20" 
          iconColor="text-yellow-600 dark:text-yellow-400"
        />
        <AdminStatsCard 
          title="Completed This Month" 
          value={stats.completedMonth} 
          icon={CheckCircle} 
          color="bg-green-50 dark:bg-green-900/20"
          iconColor="text-green-600 dark:text-green-400"
        />
        <AdminStatsCard 
          title="Overdue Payments" 
          value={stats.overdue} 
          icon={AlertTriangle} 
          color="bg-red-50 dark:bg-red-900/20"
          iconColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* Smart Insights (Middle Row) */}
      <SmartInsights data={insightsData} />
      
      {/* Charts (Bottom Row) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Analytics</h2>
        <DashboardCharts analytics={chartAnalytics} />
      </div>
    </div>
  );
}

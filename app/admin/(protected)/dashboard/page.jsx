import React from 'react';
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import SmartInsights from '@/components/common/SmartInsights';
import DashboardCharts from '@/components/charts/DashboardCharts';

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
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Ravi Soni! Here's an overview of your payment reminders.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard 
          title="Total Pending Payments" 
          value="₹52,000" 
          icon={DollarSign} 
          color="bg-blue-50 dark:bg-blue-900/20" 
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <AdminStatsCard 
          title="Payments Due Today" 
          value="0" 
          icon={Clock} 
          color="bg-yellow-50 dark:bg-yellow-900/20" 
          iconColor="text-yellow-600 dark:text-yellow-400"
        />
        <AdminStatsCard 
          title="Completed This Month" 
          value="0" 
          icon={CheckCircle} 
          color="bg-green-50 dark:bg-green-900/20"
          iconColor="text-green-600 dark:text-green-400"
        />
        <AdminStatsCard 
          title="Overdue Payments" 
          value="0" 
          icon={AlertTriangle} 
          color="bg-red-50 dark:bg-red-900/20"
          iconColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* Smart Insights (Middle Row) */}
      <SmartInsights />
      
      {/* Charts (Bottom Row) */}
      <DashboardCharts />
    </div>
  );
}

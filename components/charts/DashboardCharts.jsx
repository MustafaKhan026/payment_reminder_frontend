'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Dummy Data
const monthlyTrendData = [
  { name: 'Jul', received: 4000, pending: 2400 },
  { name: 'Aug', received: 3000, pending: 1398 },
  { name: 'Sep', received: 2000, pending: 9800 },
  { name: 'Oct', received: 2780, pending: 3908 },
  { name: 'Nov', received: 1890, pending: 4800 },
  { name: 'Dec', received: 2390, pending: 3800 },
];

const pendingVsPaidData = [
  { name: 'Paid', value: 65, color: '#10B981' }, // Emerald 500
  { name: 'Pending', value: 25, color: '#F59E0B' }, // Amber 500
  { name: 'Overdue', value: 10, color: '#EF4444' }, // Red 500
];

const overdueByDaysData = [
  { name: '0-7 Days', count: 12, amount: 45000 },
  { name: '8-15 Days', count: 8, amount: 28000 },
  { name: '15-30 Days', count: 5, amount: 15000 },
  { name: '30+ Days', count: 3, amount: 12000 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Monthly Payment Trend (Bar Chart) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 xl:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Monthly Payment Trend</h3>
          <select className="text-sm border-none bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1 cursor-pointer">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="received" name="Received" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Pending vs Paid (Donut Chart) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Payment Status</h3>
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pendingVsPaidData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pendingVsPaidData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center">
             <span className="text-2xl font-bold text-gray-800 dark:text-white">85%</span>
             <p className="text-xs text-gray-500">Recovery Rate</p>
          </div>
        </div>
      </div>

      {/* 3. Overdue by Days (Bar Chart - Styled differently) */}

    </div>
  );
}

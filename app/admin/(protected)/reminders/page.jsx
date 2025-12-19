'use client';

import React, { useState, useEffect } from 'react';
import { reminderAPI } from '@/lib/api/reminders';
import { Bell, Calendar, User, Search, FileText, Mail } from 'lucide-react';

export default function AdminRemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReminders = async () => {
    try {
        const response = await reminderAPI.getAllReminders();
        if (response.ok) {
            const data = await response.json();
            setReminders(Array.isArray(data) ? data : []); 
        }
    } catch (error) {
        console.error('Failed to fetch reminders:', error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const filteredReminders = reminders.filter(rem => 
    rem.reminder_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rem.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(rem.invoice_id).includes(searchTerm) ||
    String(rem.user_id).includes(searchTerm)
  );

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'sent': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'failed': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Reminders</h1>
           <p className="text-gray-500 dark:text-gray-400">View and manage system payment reminders</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
              type="text"
              placeholder="Search by ID, type or status..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {loading ? (
         <div className="flex justify-center py-12">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
         </div>
      ) : filteredReminders.length === 0 ? (
         <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
             <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                 <Bell className="text-gray-400" size={32} />
             </div>
             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reminders found</h3>
             <p className="text-gray-500 dark:text-gray-400">There are no reminders in the system matching your search.</p>
         </div>
      ) : (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {filteredReminders.map((reminder) => (
                 <div key={reminder.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-4">
                        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[reminder.status?.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
                            {reminder.status}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                            <User size={12} />
                            User ID: {reminder.user_id}
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2 mb-2">
                        <FileText size={16} className="text-indigo-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Invoice #{reminder.invoice_id}</span>
                     </div>

                     <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Mail size={16} />
                        <span className="capitalize">{reminder.reminder_type} Reminder</span>
                     </div>
                 </div>
             ))}
         </div>
      )}
    </div>
  );
}

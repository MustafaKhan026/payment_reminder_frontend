'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Building, Phone } from 'lucide-react';

export default function UserProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
         <p className="text-gray-500 dark:text-gray-400">Manage your account information</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
         {/* Cover / Header */}
         <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
         
         <div className="px-8 pb-8 relative">
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800 absolute -top-12 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-md">
               {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            
            <div className="pt-16 pb-6 border-b border-gray-100 dark:border-gray-700">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
               <p className="text-gray-500 dark:text-gray-400">{user?.role || 'Customer'}</p>
            </div>

            <div className="pt-6 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-500">
                      <Mail size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email Address</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-500">
                      <Building size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Company</p>
                      <p className="font-medium text-gray-900 dark:text-white">Not Set</p>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-500">
                      <Phone size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">Not Set</p>
                   </div>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-right">
               <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                  Edit Profile
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

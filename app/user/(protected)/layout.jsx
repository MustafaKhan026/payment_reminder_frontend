'use client';

import { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Navbar from '@/app/components/Navbar';
import { LayoutDashboard, FileText, CreditCard, User } from 'lucide-react';

export default function UserLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userLinks = [
    { name: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
    { name: 'My Invoices', href: '/user/invoices', icon: FileText },
    { name: 'My Payments', href: '/user/payments', icon: CreditCard },
    { name: 'Profile', href: '/user/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        links={userLinks} 
        title="My Dashboard" 
        userRole="User" 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

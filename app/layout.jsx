'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './components/theme-provider';
import './globals.css';

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PayRemind - Payment Reminder Dashboard</title>
        <meta name="description" content="Manage and track payment reminders efficiently" />
      </head>
      <body className="bg-gray-100 dark:bg-[#1A222C] min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="lg:ml-64">
            <Navbar 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
            />
            <main className="p-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


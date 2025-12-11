'use client';

import { useState, useMemo } from 'react';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import PaymentTable from './components/PaymentTable';
import ReminderModal from './components/ReminderModal';
import QuickActions from './components/QuickActions';
import RecentActivities from './components/RecentActivities';
import AddCustomerModal from './components/AddCustomerModal';
import AddInvoiceModal from './components/AddInvoiceModal';

// Sample payment data
const samplePayments = [
  {
    id: 1,
    customerName: 'John Smith',
    email: 'john.smith@example.com',
    amount: 2500,
    dueDate: '2025-12-15',
    status: 'Pending',
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    amount: 1800,
    dueDate: '2025-12-09',
    status: 'Overdue',
  },
  {
    id: 3,
    customerName: 'Michael Brown',
    email: 'michael.b@example.com',
    amount: 3200,
    dueDate: '2025-12-20',
    status: 'Paid',
  },
  {
    id: 4,
    customerName: 'Emily Davis',
    email: 'emily.davis@example.com',
    amount: 1500,
    dueDate: '2025-12-09',
    status: 'Pending',
  },
  {
    id: 5,
    customerName: 'David Wilson',
    email: 'david.w@example.com',
    amount: 4200,
    dueDate: '2025-12-05',
    status: 'Overdue',
  },
  {
    id: 6,
    customerName: 'Jessica Martinez',
    email: 'jessica.m@example.com',
    amount: 2100,
    dueDate: '2025-12-18',
    status: 'Pending',
  },
  {
    id: 7,
    customerName: 'Robert Taylor',
    email: 'robert.t@example.com',
    amount: 3800,
    dueDate: '2025-12-12',
    status: 'Paid',
  },
  {
    id: 8,
    customerName: 'Amanda Anderson',
    email: 'amanda.a@example.com',
    amount: 2900,
    dueDate: '2025-12-09',
    status: 'Pending',
  },
  {
    id: 9,
    customerName: 'Christopher Lee',
    email: 'chris.lee@example.com',
    amount: 1600,
    dueDate: '2025-12-22',
    status: 'Pending',
  },
  {
    id: 10,
    customerName: 'Michelle White',
    email: 'michelle.w@example.com',
    amount: 5100,
    dueDate: '2025-12-08',
    status: 'Overdue',
  },
  {
    id: 11,
    customerName: 'James Harris',
    email: 'james.h@example.com',
    amount: 2700,
    dueDate: '2025-12-16',
    status: 'Paid',
  },
  {
    id: 12,
    customerName: 'Lisa Clark',
    email: 'lisa.clark@example.com',
    amount: 3400,
    dueDate: '2025-12-14',
    status: 'Pending',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  // Modal states for Quick Actions
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Filter payments based on search and status
  const filteredPayments = useMemo(() => {
    return samplePayments.filter((payment) => {
      const matchesSearch = payment.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const pending = samplePayments.filter((p) => p.status === 'Pending');
    const dueToday = samplePayments.filter((p) => p.dueDate === '2025-12-09');
    const completed = samplePayments.filter((p) => p.status === 'Paid');
    const overdue = samplePayments.filter((p) => p.status === 'Overdue');

    return {
      totalPending: pending.reduce((sum, p) => sum + p.amount, 0),
      pendingCount: pending.length,
      dueTodayCount: dueToday.length,
      completedThisMonth: completed.length,
      overdueCount: overdue.length,
    };
  }, []);

  const handleSendReminder = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your payment reminders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Pending Payments"
          value={`$${stats.totalPending.toLocaleString()}`}
          color="blue"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatsCard
          title="Payments Due Today"
          value={stats.dueTodayCount}
          color="yellow"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatsCard
          title="Completed This Month"
          value={stats.completedThisMonth}
          color="green"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatsCard
          title="Overdue Payments"
          value={stats.overdueCount}
          color="red"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions
          onAddCustomer={() => setCustomerModalOpen(true)}
          onAddInvoice={() => setInvoiceModalOpen(true)}
        />
        <RecentActivities />
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Payment Table */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Payments</h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredPayments.length} of {samplePayments.length} payments
          </span>
        </div>
        <PaymentTable
          payments={filteredPayments}
          onSendReminder={handleSendReminder}
        />
      </div>

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
      />
      
      {/* Quick Action Modals */}
      <AddCustomerModal 
        isOpen={isCustomerModalOpen} 
        onClose={() => setCustomerModalOpen(false)} 
      />
      <AddInvoiceModal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => setInvoiceModalOpen(false)} 
      />
    </div>
  );
}

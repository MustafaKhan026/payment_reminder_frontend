'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import ReminderModal from '../components/ReminderModal';
import QuickActions from '../components/QuickActions';
import RecentActivities from '../components/RecentActivities';
import AddCustomerModal from '../components/AddCustomerModal';
import AddInvoiceModal from '../components/AddInvoiceModal';
import { getAllInvoicesAPI } from '../api/invoices';
import { getUsersAPI } from '../api/users';
import Preloader from '../components/Preloader';

import SmartInsights from '../components/SmartInsights';
import DashboardCharts from '../components/DashboardCharts';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  // Data states
  const [invoices, setInvoices] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);

  // Modal states for Quick Actions
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Protect the route
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          setDataLoading(true);
          const [invoicesRes, usersRes] = await Promise.all([
            getAllInvoicesAPI(user.id),
            getUsersAPI()
          ]);

          if (invoicesRes.ok) {
            const invoicesData = await invoicesRes.json();
            // Map API data to component expected format
            const mappedInvoices = invoicesData.map(inv => ({
              id: inv.id,
              customerName: inv.customer_name,
              email: '', // API doesn't return email for invoice customer yet
              amount: typeof inv.amount === 'string' ? parseFloat(inv.amount) : inv.amount,
              dueDate: inv.due_date,
              status: inv.status || 'Pending',
            }));
            setInvoices(mappedInvoices);
          }

          if (usersRes.ok) {
            const usersData = await usersRes.json();
            setUserCount(usersData.length);
          }
        } catch (error) {
          console.error("Failed to fetch dashboard data", error);
        } finally {
          setDataLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  // Filter payments based on search and status
  const filteredPayments = useMemo(() => {
    return invoices.filter((payment) => {
      const matchesSearch = payment.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, invoices]);

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const pending = invoices.filter((p) => p.status === 'Pending');
    const dueToday = invoices.filter((p) => p.dueDate === today && p.status === 'Pending');
    const completed = invoices.filter((p) => p.status === 'Paid');
    const overdue = invoices.filter((p) => p.status === 'Overdue');

    // Filter completed this month
    const currentMonth = new Date().getMonth();
    const completedThisMonth = completed.filter(p => {
        const d = new Date(p.dueDate); // Using Due Date as proxy for completion date or Issue date if available
        return d.getMonth() === currentMonth;
    });

    return {
      totalPending: pending.reduce((sum, p) => sum + p.amount, 0),
      pendingCount: pending.length,
      dueTodayCount: dueToday.length,
      completedThisMonthCount: completedThisMonth.length,
      overdueCount: overdue.length,
    };
  }, [invoices]);

  const handleSendReminder = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPayment(null);
  };

  // Show loading state
  if (authLoading || (dataLoading && !invoices.length)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user.name}! Here's an overview of your payment reminders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Pending Payments"
          value={`₹${stats.totalPending.toLocaleString()}`}
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
          value={stats.completedThisMonthCount}
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

      {/* Smart Insights */}
      <SmartInsights />

      {/* Visual Analytics */}
      <DashboardCharts />

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
            Showing {filteredPayments.length} payments
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

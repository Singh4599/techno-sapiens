import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Download, LogOut, Shield, DollarSign, BarChart3, Search, Filter, X } from 'lucide-react';
import { auth, db } from '@/lib/supabase';
import Button from '@components/common/Button';
import AnalyticsDashboard from '@components/admin/AnalyticsDashboard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegistrations: 0,
    totalRevenue: 0,
    totalEvents: 0,
  });
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  
  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      // Check hardcoded admin session
      const isAdmin = localStorage.getItem('isAdmin');
      
      if (isAdmin !== 'true') {
        alert('Access Denied: Admin login required');
        navigate('/admin/login');
        return;
      }

      // Load dashboard data
      loadDashboardData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      // Load ALL registrations from GLOBAL storage (not just current user's)
      const registrations = JSON.parse(localStorage.getItem('all_registrations') || '[]');
      
      console.log('📊 Loading admin data...');
      console.log('Total registrations found:', registrations.length);
      
      setAllRegistrations(registrations);
      setRecentRegistrations(registrations);

      // Calculate stats
      const totalUsers = new Set(registrations.map(r => r.user_id)).size || 0;
      const totalRevenue = registrations.reduce((sum, r) => sum + (r.amount || 0), 0);
      
      setStats({
        totalUsers: totalUsers || registrations.length,
        totalRegistrations: registrations.length,
        totalRevenue,
        totalEvents: 6, // Sample events count
      });
      
      console.log('✅ Admin stats:', {
        users: totalUsers || registrations.length,
        registrations: registrations.length,
        revenue: totalRevenue
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and Search Logic
  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterEvent, filterStatus, filterDate, allRegistrations]);

  const applyFilters = () => {
    let filtered = [...allRegistrations];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reg =>
        reg.name?.toLowerCase().includes(query) ||
        reg.email?.toLowerCase().includes(query) ||
        reg.phone?.includes(query) ||
        reg.event?.toLowerCase().includes(query)
      );
    }

    // Event filter
    if (filterEvent !== 'all') {
      filtered = filtered.filter(reg => reg.event === filterEvent || reg.event_name === filterEvent);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(reg => reg.status === filterStatus);
    }

    // Date filter
    if (filterDate !== 'all') {
      const today = new Date();
      filtered = filtered.filter(reg => {
        const regDate = new Date(reg.registered_at);
        if (filterDate === 'today') {
          return regDate.toDateString() === today.toDateString();
        } else if (filterDate === 'week') {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return regDate >= weekAgo;
        } else if (filterDate === 'month') {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return regDate >= monthAgo;
        }
        return true;
      });
    }

    setRecentRegistrations(filtered);
    console.log(`📊 Filtered: ${filtered.length} of ${allRegistrations.length} registrations`);
  };

  // Get unique events for filter dropdown
  const uniqueEvents = [...new Set(allRegistrations.map(r => r.event || r.event_name))].filter(Boolean);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setFilterEvent('all');
    setFilterStatus('all');
    setFilterDate('all');
  };

  const handleLogout = async () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const exportToCSV = () => {
    if (recentRegistrations.length === 0) {
      alert('❌ No data to export with current filters');
      return;
    }

    const csvContent = [
      ['Name', 'Email', 'Phone', 'Event', 'Date', 'Status', 'Payment Status'],
      ...recentRegistrations.map(reg => [
        reg.name || 'N/A',
        reg.email || 'N/A',
        reg.phone || 'N/A',
        reg.event || reg.event_name || 'N/A',
        reg.date || new Date(reg.registered_at || Date.now()).toLocaleDateString() || 'N/A',
        reg.status || 'confirmed',
        reg.payment_status || 'paid',
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Include filter info in filename
    let filename = 'registrations';
    if (filterEvent !== 'all') filename += `_${filterEvent.replace(/\s+/g, '-')}`;
    if (filterStatus !== 'all') filename += `_${filterStatus}`;
    if (filterDate !== 'all') filename += `_${filterDate}`;
    filename += `_${new Date().toISOString().split('T')[0]}.csv`;
    
    a.download = filename;
    a.click();
    
    alert(`✅ Exported ${recentRegistrations.length} registrations successfully!`);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-text-secondary">Manage your tech fest</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={showAnalytics ? "primary" : "outline"}
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              {showAnalytics ? 'Hide' : 'Show'} Analytics
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Users className="w-8 h-8 text-primary mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-text-secondary">Total Users</div>
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Calendar className="w-8 h-8 text-secondary mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              {stats.totalRegistrations}
            </div>
            <div className="text-sm text-text-secondary">Registrations</div>
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DollarSign className="w-8 h-8 text-accent mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              ₹{stats.totalRevenue}
            </div>
            <div className="text-sm text-text-secondary">Revenue</div>
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Trophy className="w-8 h-8 text-primary mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              {stats.totalEvents}
            </div>
            <div className="text-sm text-text-secondary">Active Events</div>
          </motion.div>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <AnalyticsDashboard stats={stats} registrations={recentRegistrations} />
          </motion.div>
        )}

        {/* Recent Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Recent Registrations</h2>
              <p className="text-sm text-text-secondary mt-1">
                Showing {recentRegistrations.length} of {allRegistrations.length} registrations
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={exportToCSV}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Filtered CSV
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="glass-strong rounded-2xl p-6 border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Search & Filters</h3>
              {(searchQuery || filterEvent !== 'all' || filterStatus !== 'all' || filterDate !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Event Filter */}
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Events</option>
                {uniqueEvents.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Date Filter */}
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>

          {recentRegistrations.length === 0 ? (
            <div className="glass-strong rounded-2xl p-8 border border-white/10 text-center">
              <Calendar className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">No registrations match your filters</p>
            </div>
          ) : (
            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Event</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {recentRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-text-primary">
                          {reg.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {reg.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {reg.phone || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-primary">
                          {reg.event || reg.event_name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {reg.date || (reg.registered_at ? new Date(reg.registered_at).toLocaleDateString() : 'N/A')}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              reg.status === 'confirmed'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                          >
                            {reg.status || 'confirmed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

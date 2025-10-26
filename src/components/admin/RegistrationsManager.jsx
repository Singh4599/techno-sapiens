import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, Download, Eye, X, RefreshCw } from 'lucide-react';
import ShinyCard from '@components/admin/ShinyCard';
import { supabase } from '../../lib/supabase';

const RegistrationsManager = () => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchRegistrations();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing registrations...');
      fetchRegistrations(true);
    }, 10000);

    // Real-time subscription to new registrations
    const channel = supabase
      .channel('admin-registrations')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'registrations' 
        },
        (payload) => {
          console.log('🔔 Registration change detected!', payload);
          console.log('Event type:', payload.eventType);
          fetchRegistrations(true);
        }
      )
      .subscribe((status) => {
        console.log('📡 Realtime status:', status);
      });

    return () => {
      clearInterval(interval);
      channel.unsubscribe();
    };
  }, []);

  const fetchRegistrations = async (silent = false) => {
    try {
      if (!silent) {
        console.log('🔄 Fetching registrations...');
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const { data, error } = await supabase
        .from('registrations')
        .select('*');

      console.log('📦 Supabase response:', { 
        count: data?.length, 
        error: error,
        data: data 
      });

      if (error) {
        console.error('❌ Database error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        if (!silent) alert('Database error: ' + error.message);
        setRegistrations([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      if (!data || data.length === 0) {
        console.warn('⚠️ No registrations found in database');
        console.warn('This might be an RLS issue. Check Supabase RLS policies.');
        setRegistrations([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      console.log('✅ Found', data.length, 'registrations');

      // Process each registration
      const processed = [];
      for (const reg of data) {
        try {
          const { data: event } = await supabase
            .from('events')
            .select('name')
            .eq('id', reg.event_id)
            .single();

          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, phone')
            .eq('id', reg.user_id)
            .single();

          processed.push({
            id: reg.id,
            name: profile?.full_name || 'Unknown User',
            email: profile?.email || 'No Email',
            phone: profile?.phone || 'No Phone',
            event: event?.name || 'Unknown Event',
            teamSize: reg.team_size || 1,
            registeredAt: new Date().toLocaleString(),
            status: reg.status || 'confirmed',
            paymentStatus: reg.payment_status || 'pending',
            amount: reg.amount || 0
          });

          if (!silent) {
            console.log('✅ Processed:', profile?.full_name, 'for', event?.name);
          }
        } catch (err) {
          console.error('❌ Error processing registration:', reg.id, err);
        }
      }

      console.log('🎯 Total registrations:', processed.length);
      setRegistrations(processed);
      setLastUpdated(new Date());
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('❌ Fatal error fetching registrations:', error);
      if (!silent) alert('Fatal error: ' + error.message);
      setRegistrations([]);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleManualRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchRegistrations(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Event', 'Team Size', 'Status', 'Payment', 'Amount'];
    const rows = registrations.map(r => [
      r.id, r.name, r.email, r.phone, r.event, r.teamSize, r.status, r.paymentStatus, r.amount
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-orbitron font-bold gradient-text">Registrations</h2>
          <p className="text-sm text-text-muted mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()} 
            {refreshing && <span className="ml-2 text-primary">● Refreshing...</span>}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="px-4 py-3 bg-surface-light border border-primary/20 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={exportToCSV}
            className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-primary">{registrations.length}</p>
          </div>
        </ShinyCard>
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-green-500">
              {registrations.filter(r => r.status === 'confirmed').length}
            </p>
          </div>
        </ShinyCard>
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-500">
              {registrations.filter(r => r.status === 'pending').length}
            </p>
          </div>
        </ShinyCard>
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ₹{registrations.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
            </p>
          </div>
        </ShinyCard>
      </div>

      {/* Registrations Table */}
      <ShinyCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-text-secondary font-medium">Name</th>
                <th className="text-left p-4 text-text-secondary font-medium">Event</th>
                <th className="text-left p-4 text-text-secondary font-medium">Team Size</th>
                <th className="text-left p-4 text-text-secondary font-medium">Status</th>
                <th className="text-left p-4 text-text-secondary font-medium">Payment</th>
                <th className="text-left p-4 text-text-secondary font-medium">Amount</th>
                <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <motion.tr 
                  key={reg.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="p-4">
                    <div>
                      <p className="text-text-primary font-medium">{reg.name}</p>
                      <p className="text-text-secondary text-sm">{reg.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary">{reg.event}</td>
                  <td className="p-4 text-text-secondary">{reg.teamSize}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      reg.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      reg.paymentStatus === 'paid' 
                        ? 'bg-green-500/20 text-green-500'
                        : reg.paymentStatus === 'free'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-text-primary font-medium">
                    {reg.amount === 0 ? 'Free' : `₹${reg.amount}`}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedRegistration(reg)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShinyCard>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-background-surface rounded-2xl p-6 max-w-2xl w-full border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold gradient-text">Registration Details</h3>
              <button 
                onClick={() => setSelectedRegistration(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Name</p>
                  <p className="text-text-primary font-medium">{selectedRegistration.name}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Email</p>
                  <p className="text-text-primary font-medium">{selectedRegistration.email}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Phone</p>
                  <p className="text-text-primary font-medium">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Event</p>
                  <p className="text-text-primary font-medium">{selectedRegistration.event}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Team Size</p>
                  <p className="text-text-primary font-medium">{selectedRegistration.teamSize}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Registered At</p>
                  <p className="text-text-primary font-medium">{selectedRegistration.registeredAt}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedRegistration.status === 'confirmed' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {selectedRegistration.status}
                  </span>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Payment</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedRegistration.paymentStatus === 'paid' 
                      ? 'bg-green-500/20 text-green-500'
                      : selectedRegistration.paymentStatus === 'free'
                      ? 'bg-blue-500/20 text-blue-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {selectedRegistration.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-text-secondary text-sm mb-1">Amount</p>
                <p className="text-2xl font-bold text-primary">
                  {selectedRegistration.amount === 0 ? 'Free' : `₹${selectedRegistration.amount}`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsManager;

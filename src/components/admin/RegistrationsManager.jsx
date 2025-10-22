import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, Download, Eye, X } from 'lucide-react';
import ShinyCard from '@components/admin/ShinyCard';

const RegistrationsManager = () => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  
  // Sample registrations data
  const registrations = [
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      email: 'rahul@example.com', 
      phone: '+91 98765 43210',
      event: 'Hackathon 2025',
      teamSize: 4,
      registeredAt: '2025-03-10 10:30 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 500
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      email: 'priya@example.com', 
      phone: '+91 98765 43211',
      event: 'AI/ML Workshop',
      teamSize: 1,
      registeredAt: '2025-03-10 11:15 AM',
      status: 'confirmed',
      paymentStatus: 'free',
      amount: 0
    },
    { 
      id: 3, 
      name: 'Amit Kumar', 
      email: 'amit@example.com', 
      phone: '+91 98765 43212',
      event: 'Code Combat',
      teamSize: 1,
      registeredAt: '2025-03-10 02:45 PM',
      status: 'pending',
      paymentStatus: 'pending',
      amount: 200
    },
    { 
      id: 4, 
      name: 'Sneha Reddy', 
      email: 'sneha@example.com', 
      phone: '+91 98765 43213',
      event: 'Gaming Tournament',
      teamSize: 5,
      registeredAt: '2025-03-11 09:20 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 300
    },
  ];

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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-orbitron font-bold gradient-text">Registrations</h2>
        <button 
          onClick={exportToCSV}
          className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
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

import { useState } from 'react';
import { Calendar, List, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EventManagement from '../components/admin/EventManagement';
import RegistrationsManager from '../components/admin/RegistrationsManager';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg font-semibold hover:bg-red-500/30 transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'registrations'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <List className="w-5 h-5" />
            Registrations
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'events'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Events
          </button>
        </div>

        {/* Content */}
        {activeTab === 'registrations' ? (
          <RegistrationsManager />
        ) : (
          <EventManagement />
        )}
      </div>
    </div>
  );
};

export default Admin;

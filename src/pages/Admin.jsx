import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, Heart, TrendingUp, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import EventManagement from '../components/admin/EventManagement';
import { motion } from 'framer-motion';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_session_time');
    navigate('/admin-login');
  };

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      setLoading(true);
      console.log('🔄 Checking admin authentication...');

      // Check if admin is authenticated via localStorage
      const adminAuth = localStorage.getItem('admin_authenticated');
      const sessionTime = localStorage.getItem('admin_session_time');

      if (!adminAuth || adminAuth !== 'true') {
        console.log('❌ Not authenticated, redirecting to admin login');
        navigate('/admin-login');
        return;
      }

      // Check if session is still valid (24 hours)
      const now = Date.now();
      const sessionAge = now - parseInt(sessionTime || '0');
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (sessionAge > twentyFourHours) {
        console.log('❌ Session expired, clearing and redirecting');
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_session_time');
        navigate('/admin-login');
        return;
      }

      console.log('✅ Admin authenticated, granting access');
      setIsAdmin(true);

    } catch (error) {
      console.error('❌ Error in admin check:', error);
      setIsAdmin(false);
      navigate('/admin-login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="text-center glass-strong rounded-2xl p-8 border border-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-text-secondary mb-2">You don't have admin permissions.</p>
          <p className="text-sm text-text-muted">Redirecting to home in 2 seconds...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Logout Button */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-500 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      
      {/* Admin Content */}
      <EventManagement />
    </div>
  );
};

export default Admin;

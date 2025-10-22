import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, Heart, TrendingUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import EventManagement from '../components/admin/EventManagement';
import { motion } from 'framer-motion';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting admin check...');

      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 Current user:', user?.email);

      if (!user) {
        console.log('❌ No user, redirecting to login');
        navigate('/login');
        return;
      }

      // Simple check: if user exists and is logged in, allow access for now
      console.log('✅ User logged in, granting admin access for testing');
      setIsAdmin(true);

    } catch (error) {
      console.error('❌ Error in admin check:', error);
      setIsAdmin(false);
      setTimeout(() => navigate('/'), 2000);
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

  return <EventManagement />;
};

export default Admin;

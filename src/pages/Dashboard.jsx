import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Trophy, Download, LogOut, Mail, Phone, Building } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Button from '@components/common/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Check session first
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }

      setUser(currentUser);
      
      // Use user metadata for profile
      setProfile({
        full_name: currentUser.user_metadata?.full_name || 'User',
        email: currentUser.email,
        phone: currentUser.user_metadata?.phone || '',
        college: currentUser.user_metadata?.college || '',
        year: currentUser.user_metadata?.year || '',
        branch: currentUser.user_metadata?.branch || '',
      });

      // Load registrations from Supabase database
      const { data: userRegistrations, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', currentUser.id);

      if (error) {
        console.error('Error loading registrations:', error);
        setRegistrations([]);
      } else {
        // Fetch event details for each registration
        const registrationsWithEvents = await Promise.all(
          (userRegistrations || []).map(async (reg) => {
            const { data: event } = await supabase
              .from('events')
              .select('id, name, slug, date, time, venue, category')
              .eq('id', reg.event_id)
              .single();
            
            return {
              ...reg,
              events: event
            };
          })
        );
        
        setRegistrations(registrationsWithEvents);
        console.log('✅ Dashboard loaded for user:', currentUser.id);
        console.log('📊 User registrations:', registrationsWithEvents.length);
      }

      // Load certificates (empty for now)
      setCertificates([]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
      // Don't redirect on error, just show empty dashboard
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Please login to view dashboard</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
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
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-2">
              My Dashboard
            </h1>
            <p className="text-text-secondary">Welcome back, {profile?.full_name || 'User'}!</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Calendar className="w-8 h-8 text-primary mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              {registrations.length}
            </div>
            <div className="text-sm text-text-secondary">Events Registered</div>
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-8 h-8 text-secondary mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              {certificates.length}
            </div>
            <div className="text-sm text-text-secondary">Certificates Earned</div>
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <User className="w-8 h-8 text-accent mb-3" />
            <div className="text-3xl font-bold text-text-primary mb-1">
              Active
            </div>
            <div className="text-sm text-text-secondary">Account Status</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              className="glass-strong rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">Profile</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-text-muted">Name</div>
                    <div className="text-text-primary">{profile?.full_name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-text-muted">Email</div>
                    <div className="text-text-primary">{profile?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-text-muted">Phone</div>
                    <div className="text-text-primary">{profile?.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-text-muted">College</div>
                    <div className="text-text-primary">{profile?.college}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-text-muted">Year & Branch</div>
                    <div className="text-text-primary">
                      {profile?.year} Year - {profile?.branch}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Registrations & Certificates */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Registrations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4">My Registrations</h2>
              {registrations.length === 0 ? (
                <div className="glass-strong rounded-2xl p-8 border border-white/10 text-center">
                  <Calendar className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary mb-4">No registrations yet</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/events')}
                  >
                    Browse Events
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-text-primary mb-1">
                            {reg.events?.name || 'Event'}
                          </h3>
                          <p className="text-sm text-text-secondary mb-1">
                            📅 {reg.events?.date ? new Date(reg.events.date).toLocaleDateString() : 'Date TBA'} • 
                            ⏰ {reg.events?.time || 'Time TBA'}
                          </p>
                          <p className="text-sm text-text-muted">
                            📍 {reg.events?.venue || 'Venue TBA'} • 
                            🎯 {reg.events?.category || 'Category'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              reg.status === 'confirmed'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                          >
                            {reg.status || 'confirmed'}
                          </span>
                          <p className="text-xs text-text-muted mt-2">
                            {reg.payment_status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* My Certificates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4">My Certificates</h2>
              {certificates.length === 0 ? (
                <div className="glass-strong rounded-2xl p-8 border border-white/10 text-center">
                  <Trophy className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">No certificates yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-text-primary mb-1">
                            {cert.events?.name}
                          </h3>
                          <p className="text-sm text-text-secondary capitalize">
                            {cert.certificate_type.replace('_', ' ')}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => window.open(cert.certificate_url, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Mail, Phone, User, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

const EventRegistrationModal = ({ event, isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [teamSize, setTeamSize] = useState(event?.team_size_min || 1);
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    team_name: '',
    team_members: Array(event?.team_size_min || 1).fill({ name: '', email: '', phone: '' }),
  });

  // Load user profile when modal opens
  useEffect(() => {
    if (isOpen) {
      loadUserProfile();
    }
  }, [isOpen, event]);

  const loadUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userData = {
          full_name: session.user.user_metadata?.full_name || '',
          email: session.user.email || '',
          phone: session.user.user_metadata?.phone || '',
        };
        setUserProfile(userData);
        
        // Auto-fill first member with user details
        setFormData(prev => ({
          ...prev,
          team_members: [
            {
              name: userData.full_name,
              email: userData.email,
              phone: userData.phone,
            },
            ...prev.team_members.slice(1)
          ]
        }));
      }
    } catch (error) {
      console.log('Could not load profile:', error);
    }
  };

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    const members = Array(size).fill(null).map((_, i) => 
      formData.team_members[i] || { name: '', email: '', phone: '' }
    );
    setFormData({ ...formData, team_members: members });
  };

  const handleMemberChange = (index, field, value) => {
    const members = [...formData.team_members];
    members[index] = { ...members[index], [field]: value };
    setFormData({ ...formData, team_members: members });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please login to register for events. Redirecting to login...');
        setLoading(false);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      const user = session.user;
      if (!user) {
        setError('Please login to register for events');
        setLoading(false);
        return;
      }

      // Ensure user profile exists in profiles table
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              phone: user.user_metadata?.phone || '',
              college: user.user_metadata?.college || '',
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Continue anyway - profile might already exist
        }
      }

      // Check if already registered
      const { data: existingReg } = await supabase
        .from('registrations')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_id', event.id)
        .single();

      if (existingReg) {
        setError('You are already registered for this event!');
        setLoading(false);
        return;
      }

      // Create registration in Supabase
      const { data: registration, error: regError } = await supabase
        .from('registrations')
        .insert([
          {
            user_id: user.id,
            event_id: event.id,
            team_name: teamSize > 1 ? formData.team_name : null,
            team_size: teamSize,
            status: 'confirmed',
            payment_status: event.registration_fee > 0 ? 'pending' : 'paid',
            amount: event.registration_fee || 0,
          }
        ])
        .select()
        .single();

      if (regError) throw regError;

      // Store team members if team event
      if (teamSize > 1 && formData.team_members && registration) {
        const teamMembers = formData.team_members.map(member => ({
          registration_id: registration.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
        }));

        const { error: teamError } = await supabase
          .from('team_members')
          .insert(teamMembers);

        if (teamError) console.error('Team members error:', teamError);
      }

      console.log('✅ Registration successful in Supabase!');
      console.log('📧 Confirmation email would be sent to:', user.email);

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !event) return null;

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative glass-strong rounded-2xl p-8 border border-white/10 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">Registration Successful!</h3>
          <p className="text-text-secondary">
            You have successfully registered for {event.name}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl p-8 border border-white/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-text-secondary" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-orbitron font-bold gradient-text mb-2">
              Register for Event
            </h2>
            <p className="text-text-secondary text-lg">{event.name}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
              <span>📅 {new Date(event.date).toLocaleDateString()}</span>
              <span>📍 {event.venue}</span>
              {event.registration_fee > 0 && <span>💰 ₹{event.registration_fee}</span>}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Team Size Selection */}
            {event.team_size_max > 1 && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Team Size *
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: event.team_size_max - event.team_size_min + 1 }, (_, i) => {
                    const size = event.team_size_min + i;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleTeamSizeChange(size)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                          teamSize === size
                            ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                            : 'bg-white/5 text-text-secondary hover:bg-white/10'
                        }`}
                      >
                        {size} {size === 1 ? 'Member' : 'Members'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Team Name */}
            {teamSize > 1 && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Team Name *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    type="text"
                    value={formData.team_name}
                    onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                    placeholder="Enter your team name"
                    required
                    className="pl-12"
                  />
                </div>
              </div>
            )}

            {/* Team Members */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-4">
                Team Member{teamSize > 1 ? 's' : ''} Details *
              </label>
              <div className="space-y-4">
                {formData.team_members.map((member, index) => (
                  <div key={index} className="glass rounded-xl p-4 border border-white/10">
                    <h4 className="text-sm font-medium text-text-primary mb-3">
                      Member {index + 1}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <Input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          placeholder="Name"
                          required
                          className="pl-10 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <Input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          placeholder="Email"
                          required
                          className="pl-10 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <Input
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                          placeholder="Phone (optional)"
                          className="pl-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
                className="flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Register Now
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventRegistrationModal;

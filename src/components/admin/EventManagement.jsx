import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Edit, Trash2, Plus, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../common/Button';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
    
    // Real-time subscription
    const subscription = supabase
      .channel('admin-events')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        () => fetchEvents()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          registrations:registrations(count)
        `)
        .order('date', { ascending: true });

      if (error) throw error;

      const transformedEvents = data.map(event => ({
        ...event,
        seats_filled: event.registrations[0]?.count || 0
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRegistration = async (eventId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ registration_open: !currentStatus })
        .eq('id', eventId);

      if (error) throw error;
      
      alert(`Registration ${!currentStatus ? 'opened' : 'closed'} successfully!`);
    } catch (error) {
      console.error('Error toggling registration:', error);
      alert('Failed to update registration status');
    }
  };

  const updateMaxParticipants = async (eventId, newMax) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ max_participants: parseInt(newMax) })
        .eq('id', eventId);

      if (error) throw error;
      
      setEditingEvent(null);
      alert('Max participants updated successfully!');
    } catch (error) {
      console.error('Error updating max participants:', error);
      alert('Failed to update max participants');
    }
  };

  const deleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom">
        <h1 className="text-4xl font-orbitron font-bold gradient-text mb-8">
          Event Management
        </h1>

        <div className="space-y-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="glass-strong rounded-xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {event.name}
                  </h3>
                  <p className="text-text-secondary mb-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-text-muted">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="text-text-muted">
                      📍 {event.venue}
                    </span>
                    <span className="text-text-muted">
                      🎯 {event.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                      event.registration_open 
                        ? 'bg-primary text-black hover:bg-primary/80' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                    onClick={() => toggleRegistration(event.id, event.registration_open)}
                  >
                    {event.registration_open ? (
                      <>
                        <Unlock className="w-4 h-4" />
                        Click to Close
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Click to Open
                      </>
                    )}
                  </button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Registration Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                  <div className="text-sm text-text-muted mb-1">Registered</div>
                  <div className="text-3xl font-bold text-primary">
                    {event.seats_filled}
                  </div>
                </div>

                <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
                  <div className="text-sm text-text-muted mb-1">Max Capacity</div>
                  {editingEvent === event.id ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        defaultValue={event.max_participants}
                        className="w-24 px-2 py-1 bg-background border border-white/10 rounded text-text-primary"
                        id={`max-${event.id}`}
                      />
                      <button
                        onClick={() => {
                          const newMax = document.getElementById(`max-${event.id}`).value;
                          updateMaxParticipants(event.id, newMax);
                        }}
                        className="text-green-500 hover:text-green-400"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditingEvent(null)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-secondary">
                        {event.max_participants}
                      </div>
                      <button
                        onClick={() => setEditingEvent(event.id)}
                        className="text-text-muted hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                  <div className="text-sm text-text-muted mb-1">Seats Left</div>
                  <div className="text-3xl font-bold text-accent">
                    {event.max_participants - event.seats_filled}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-secondary">Registration Progress</span>
                  <span className="text-primary font-bold">
                    {Math.round((event.seats_filled / event.max_participants) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${(event.seats_filled / event.max_participants) * 100}%` }}
                  />
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex gap-2 mt-4">
                {event.registration_open ? (
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-500 text-xs font-bold">
                    ✓ Registration Open
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-500 text-xs font-bold">
                    ✗ Registration Closed
                  </span>
                )}
                
                {event.seats_filled >= event.max_participants && (
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-500 text-xs font-bold">
                    ⚠ Full
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventManagement;

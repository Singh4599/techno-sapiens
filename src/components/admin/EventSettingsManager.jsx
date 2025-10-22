import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, ToggleLeft, ToggleRight, Save } from 'lucide-react';
import ShinyCard from '@components/admin/ShinyCard';

const EventSettingsManager = () => {
  const [events, setEvents] = useState([
    { 
      id: 1, 
      name: 'Hackathon 2025', 
      registrationOpen: true,
      maxParticipants: 100,
      currentParticipants: 45
    },
    { 
      id: 2, 
      name: 'AI/ML Workshop', 
      registrationOpen: true,
      maxParticipants: 50,
      currentParticipants: 32
    },
    { 
      id: 3, 
      name: 'Code Combat', 
      registrationOpen: false,
      maxParticipants: 80,
      currentParticipants: 80
    },
    { 
      id: 4, 
      name: 'Gaming Tournament', 
      registrationOpen: true,
      maxParticipants: 60,
      currentParticipants: 28
    },
    { 
      id: 5, 
      name: 'Web Dev Bootcamp', 
      registrationOpen: true,
      maxParticipants: 40,
      currentParticipants: 15
    },
    { 
      id: 6, 
      name: 'Tech Quiz', 
      registrationOpen: false,
      maxParticipants: 30,
      currentParticipants: 12
    },
  ]);

  const toggleRegistration = (id) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, registrationOpen: !event.registrationOpen }
        : event
    ));
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-orbitron font-bold gradient-text">Event Settings</h2>
        <button 
          onClick={saveSettings}
          className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save All
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Total Events</p>
            <p className="text-3xl font-bold text-primary">{events.length}</p>
          </div>
        </ShinyCard>
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Open for Registration</p>
            <p className="text-3xl font-bold text-green-500">
              {events.filter(e => e.registrationOpen).length}
            </p>
          </div>
        </ShinyCard>
        <ShinyCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Closed</p>
            <p className="text-3xl font-bold text-red-500">
              {events.filter(e => !e.registrationOpen).length}
            </p>
          </div>
        </ShinyCard>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ShinyCard>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">{event.name}</h3>
                    <p className="text-sm text-text-secondary">
                      {event.currentParticipants} / {event.maxParticipants} participants
                    </p>
                  </div>
                  <button
                    onClick={() => toggleRegistration(event.id)}
                    className={`p-2 rounded-lg transition-all ${
                      event.registrationOpen 
                        ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                        : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                    }`}
                  >
                    {event.registrationOpen ? (
                      <ToggleRight className="w-8 h-8" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Capacity</span>
                    <span className="text-text-primary font-medium">
                      {Math.round((event.currentParticipants / event.maxParticipants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${
                        event.currentParticipants >= event.maxParticipants
                          ? 'bg-red-500'
                          : event.currentParticipants >= event.maxParticipants * 0.8
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-text-secondary">Registration Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.registrationOpen 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {event.registrationOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
            </ShinyCard>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <ShinyCard>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-2">How to use</h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Toggle the switch to open/close registrations for any event</li>
              <li>• Green = Open for registration, Red = Closed</li>
              <li>• Progress bar shows current capacity</li>
              <li>• Click "Save All" to apply changes</li>
            </ul>
          </div>
        </div>
      </ShinyCard>
    </div>
  );
};

export default EventSettingsManager;

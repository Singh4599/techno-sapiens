import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar } from 'lucide-react';

const scheduleData = {
  day1: [
    { time: '09:00 AM', event: 'Registration & Welcome', venue: 'Main Hall', type: 'ceremony' },
    { time: '10:00 AM', event: 'Opening Ceremony', venue: 'Auditorium', type: 'ceremony' },
    { time: '11:00 AM', event: 'Keynote Speech', venue: 'Auditorium', type: 'event' },
    { time: '12:00 PM', event: 'Hackathon Begins', venue: 'Lab 1-3', type: 'event' },
    { time: '01:00 PM', event: 'Lunch Break', venue: 'Cafeteria', type: 'break' },
    { time: '02:00 PM', event: 'AI/ML Workshop', venue: 'Lab 101', type: 'workshop' },
    { time: '04:00 PM', event: 'Code Combat Round 1', venue: 'Computer Lab', type: 'event' },
    { time: '06:00 PM', event: 'Evening Snacks', venue: 'Cafeteria', type: 'break' },
    { time: '07:00 PM', event: 'Tech Talk: Future of AI', venue: 'Seminar Hall', type: 'event' },
  ],
  day2: [
    { time: '09:00 AM', event: 'Day 2 Kickoff', venue: 'Main Hall', type: 'ceremony' },
    { time: '10:00 AM', event: 'Web Dev Workshop', venue: 'Lab 201', type: 'workshop' },
    { time: '12:00 PM', event: 'Hackathon Continues', venue: 'Lab 1-3', type: 'event' },
    { time: '01:00 PM', event: 'Lunch Break', venue: 'Cafeteria', type: 'break' },
    { time: '02:00 PM', event: 'Gaming Tournament', venue: 'Gaming Arena', type: 'event' },
    { time: '04:00 PM', event: 'Code Combat Finals', venue: 'Computer Lab', type: 'event' },
    { time: '06:00 PM', event: 'Cultural Night', venue: 'Open Ground', type: 'event' },
    { time: '09:00 PM', event: 'Day 2 Ends', venue: '-', type: 'ceremony' },
  ],
  day3: [
    { time: '09:00 AM', event: 'Final Day Begins', venue: 'Main Hall', type: 'ceremony' },
    { time: '10:00 AM', event: 'Hackathon Presentations', venue: 'Auditorium', type: 'event' },
    { time: '12:00 PM', event: 'Lunch Break', venue: 'Cafeteria', type: 'break' },
    { time: '01:00 PM', event: 'Tech Quiz Finals', venue: 'Auditorium 2', type: 'event' },
    { time: '03:00 PM', event: 'Prize Distribution', venue: 'Main Auditorium', type: 'ceremony' },
    { time: '05:00 PM', event: 'Closing Ceremony', venue: 'Main Auditorium', type: 'ceremony' },
    { time: '06:00 PM', event: 'Event Ends', venue: '-', type: 'ceremony' },
  ],
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('day1');

  const days = [
    { id: 'day1', label: 'Day 1', date: 'March 15' },
    { id: 'day2', label: 'Day 2', date: 'March 16' },
    { id: 'day3', label: 'Day 3', date: 'March 17' },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'event': return 'border-primary text-primary';
      case 'workshop': return 'border-secondary text-secondary';
      case 'break': return 'border-text-muted text-text-muted';
      case 'ceremony': return 'border-accent text-accent';
      default: return 'border-primary text-primary';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Event Schedule
          </h1>
          <p className="text-text-secondary text-lg">
            Plan your participation with our detailed schedule
          </p>
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                selectedDay === day.id
                  ? 'bg-primary text-black scale-105'
                  : 'glass-strong text-text-secondary hover:bg-white/5 border border-white/10'
              }`}
            >
              <div className="text-lg font-bold">{day.label}</div>
              <div className="text-sm opacity-80">{day.date}</div>
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {/* Schedule Items */}
          <div className="space-y-6">
            {scheduleData[selectedDay].map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Time Dot */}
                <div className="absolute left-5 top-6 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />

                {/* Content Card */}
                <div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">
                        {item.event}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{item.time}</span>
                        </div>
                        {item.venue !== '-' && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{item.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="mt-12 glass-strong rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-text-primary mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-text-secondary">Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-sm text-text-secondary">Workshop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-text-muted" />
              <span className="text-sm text-text-secondary">Break</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-text-secondary">Ceremony</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Schedule;

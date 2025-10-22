import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ShinyCard from '@components/admin/ShinyCard';

const SimpleEventsManager = () => {
  const [events] = useState([
    { id: 1, name: 'Hackathon 2025', category: 'Hackathon', date: '2025-03-15', status: 'published' },
    { id: 2, name: 'AI/ML Workshop', category: 'Workshop', date: '2025-03-16', status: 'published' },
    { id: 3, name: 'Code Combat', category: 'Competition', date: '2025-03-15', status: 'published' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-orbitron font-bold gradient-text">Events Manager</h2>
        <button className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <ShinyCard borderColor="#00E5FF">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-text-secondary font-medium">Name</th>
                <th className="text-left p-4 text-text-secondary font-medium">Category</th>
                <th className="text-left p-4 text-text-secondary font-medium">Date</th>
                <th className="text-left p-4 text-text-secondary font-medium">Status</th>
                <th className="text-left p-4 text-text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <motion.tr 
                  key={event.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="p-4 text-text-primary font-medium">{event.name}</td>
                  <td className="p-4 text-text-secondary">{event.category}</td>
                  <td className="p-4 text-text-secondary">{event.date}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShinyCard>
    </div>
  );
};

export default SimpleEventsManager;

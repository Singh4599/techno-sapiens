import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import EventCard from '@components/events/EventCard';
import EventRegistrationModal from '@components/events/EventRegistrationModal';
import { EVENT_CATEGORIES } from '@utils/constants';
import { useRealtimeEvents } from '../hooks/useRealtimeEvents';

// Sample events data with seats info - Top 3 Events
const sampleEvents = [
  {
    id: 1,
    name: 'Hackathon 2025',
    slug: 'hackathon-2025',
    description: 'Build innovative solutions in 24 hours. Compete with the best minds and win exciting prizes.',
    category: 'Hackathon',
    date: '2025-03-15',
    time: '09:00:00',
    venue: 'Main Auditorium',
    prize_pool: 100000,
    team_size_min: 2,
    team_size_max: 4,
    registration_fee: 500,
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
    difficulty: 'Advanced',
    seats_total: 100,
    seats_filled: 67,
    tags: ['Coding', 'Innovation', 'Team']
  },
  {
    id: 2,
    name: 'AI/ML Workshop',
    slug: 'ai-ml-workshop',
    description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning from industry experts.',
    category: 'Workshop',
    date: '2025-03-16',
    time: '10:00:00',
    venue: 'Lab 101',
    prize_pool: 0,
    team_size_min: 1,
    team_size_max: 1,
    registration_fee: 0,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    difficulty: 'Beginner',
    seats_total: 50,
    seats_filled: 23,
    tags: ['AI', 'ML', 'Workshop']
  },
  {
    id: 3,
    name: 'Code Combat',
    slug: 'code-combat',
    description: 'Test your coding skills in this intense competitive programming challenge.',
    category: 'Competition',
    date: '2025-03-15',
    time: '14:00:00',
    venue: 'Computer Lab',
    prize_pool: 50000,
    team_size_min: 1,
    team_size_max: 1,
    registration_fee: 200,
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
    difficulty: 'Intermediate',
    seats_total: 80,
    seats_filled: 45,
    tags: ['DSA', 'Competitive', 'Solo']
  },
  // Add more events here when needed
];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use real-time events hook
  const { events: realtimeEvents, loading, error } = useRealtimeEvents();
  
  // Use real-time events if available, otherwise fallback to sample data
  const eventsToDisplay = realtimeEvents.length > 0 ? realtimeEvents : sampleEvents;

  // Filter events
  const filteredEvents = eventsToDisplay.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = async (event) => {
    // Check if user is logged in
    const { auth } = await import('@/lib/supabase');
    const session = await auth.getSession();
    
    if (!session || !session.user) {
      // Not logged in - show alert and redirect
      alert('Please login first to register for events!');
      window.location.href = '/login';
      return;
    }
    
    // User is logged in - open modal
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegistrationSuccess = () => {
    // Refresh or show success message
    alert('Registration successful! Check your dashboard.');
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Events
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Explore our exciting lineup of events, workshops, and competitions
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background-surface border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </motion.div>


        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Error loading events: {error}</p>
            <p className="text-text-muted">Showing sample events instead</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index}
                onRegister={() => handleRegister(event)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-secondary text-lg">No events found matching your criteria.</p>
          </motion.div>
        )}

        {/* Registration Modal */}
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleRegistrationSuccess}
        />
      </div>
    </div>
  );
};

export default Events;

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, Clock, ArrowLeft, DollarSign } from 'lucide-react';
import Button from '@components/common/Button';
import { formatDate, formatTime, formatCurrency } from '@utils/helpers';

// Sample events data (same as Events.jsx)
const sampleEvents = [
  {
    id: 1,
    name: 'Hackathon 2025',
    slug: 'hackathon-2025',
    description: 'Build innovative solutions in 24 hours. Compete with the best minds and win exciting prizes. This is your chance to showcase your coding skills and creativity.',
    category: 'Hackathon',
    date: '2025-03-15',
    time: '09:00:00',
    venue: 'Main Auditorium',
    prize_pool: 100000,
    team_size_min: 2,
    team_size_max: 4,
    registration_fee: 500,
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
    details: {
      about: 'Join us for an exciting 24-hour hackathon where you can build innovative solutions, learn new technologies, and compete for amazing prizes. This event brings together the best minds in technology to solve real-world problems.',
      rules: [
        'Teams of 2-4 members',
        'Original code only',
        'All technologies allowed',
        'Final submission by 9 AM next day',
      ],
      prizes: [
        '1st Prize: ₹50,000',
        '2nd Prize: ₹30,000',
        '3rd Prize: ₹20,000',
      ],
      schedule: [
        '9:00 AM - Registration & Breakfast',
        '10:00 AM - Opening Ceremony',
        '11:00 AM - Hacking Begins',
        '1:00 PM - Lunch',
        '6:00 PM - Dinner',
        '9:00 AM (Next Day) - Submissions Close',
        '10:00 AM - Presentations',
        '12:00 PM - Prize Distribution',
      ],
    },
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
    details: {
      about: 'A comprehensive workshop covering the basics of AI and ML. Learn from industry experts and get hands-on experience with real-world projects.',
      topics: [
        'Introduction to AI/ML',
        'Python for Data Science',
        'Machine Learning Algorithms',
        'Neural Networks Basics',
        'Hands-on Projects',
      ],
      requirements: [
        'Laptop with Python installed',
        'Basic programming knowledge',
        'Enthusiasm to learn!',
      ],
    },
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
    details: {
      about: 'A competitive programming contest with challenging problems. Test your algorithmic skills and compete for prizes.',
      format: [
        '3 hours duration',
        '5-7 problems',
        'Individual participation',
        'Online judge system',
      ],
      prizes: [
        '1st Prize: ₹25,000',
        '2nd Prize: ₹15,000',
        '3rd Prize: ₹10,000',
      ],
    },
  },
];

const EventDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const event = sampleEvents.find(e => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  const handleRegister = async () => {
    const { auth } = await import('@/lib/supabase');
    const session = await auth.getSession();
    
    if (!session || !session.user) {
      alert('Please login first to register for events!');
      navigate('/login');
      return;
    }
    
    // Navigate to events page with registration
    navigate('/events', { state: { registerEvent: event } });
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </motion.button>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <img 
              src={event.image_url} 
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-block px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-black text-sm font-semibold mb-4">
                {event.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
                {event.name}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl">
                {event.description}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              className="glass-strong rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4">About</h2>
              <p className="text-text-secondary leading-relaxed">
                {event.details?.about || event.description}
              </p>
            </motion.div>

            {/* Additional Details */}
            {event.details?.rules && (
              <motion.div
                className="glass-strong rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-4">Rules</h2>
                <ul className="space-y-2">
                  {event.details.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-secondary">
                      <span className="text-primary mt-1">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {event.details?.topics && (
              <motion.div
                className="glass-strong rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-4">Topics Covered</h2>
                <ul className="space-y-2">
                  {event.details.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-secondary">
                      <span className="text-primary mt-1">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {event.details?.schedule && (
              <motion.div
                className="glass-strong rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-4">Schedule</h2>
                <div className="space-y-3">
                  {event.details.schedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-text-secondary">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <motion.div
              className="glass-strong rounded-2xl p-6 border border-white/10 sticky top-32"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-bold text-text-primary mb-6">Event Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{event.team_size_min}-{event.team_size_max} members</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>{event.registration_fee === 0 ? 'Free' : formatCurrency(event.registration_fee)}</span>
                </div>
              </div>

              {event.prize_pool > 0 && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="text-primary font-bold">Prize Pool</span>
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {formatCurrency(event.prize_pool)}
                  </div>
                </div>
              )}

              {event.details?.prizes && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-text-primary mb-3">Prizes</h4>
                  <div className="space-y-2">
                    {event.details.prizes.map((prize, index) => (
                      <div key={index} className="text-sm text-text-secondary">
                        {prize}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                variant="primary" 
                fullWidth
                onClick={handleRegister}
                className="mb-3"
              >
                Register Now
              </Button>
              
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => navigate('/events')}
              >
                Back to Events
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

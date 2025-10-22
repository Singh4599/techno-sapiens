import { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@components/home/HeroSection';
import CountdownTimer from '@components/home/CountdownTimer';
import StatsSection from '@components/home/StatsSection';
import EventCard from '@components/events/EventCard';
import EventRegistrationModal from '@components/events/EventRegistrationModal';
import { Search, Linkedin, Twitter, Github, ChevronDown, Mail, Phone, MapPin, Clock, Send, Sparkles, Trophy, Users, Zap, Target, Rocket, Star, Code, Briefcase } from 'lucide-react';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { EVENT_CATEGORIES, GALLERY_CATEGORIES, SITE_CONFIG } from '@utils/constants';
import GlitchText from '@components/animations/GlitchText';
import MagneticButton from '@components/animations/MagneticButton';
import TiltCard from '@components/animations/TiltCard';
import ParallaxSection from '@components/animations/ParallaxSection';
import Marquee from '@components/common/Marquee';
import RevealText from '@components/animations/RevealText';
import { useRealtimeEvents } from '../hooks/useRealtimeEvents';
import IconAnimation from '@components/animations/IconAnimation';
import CounterAnimation from '@components/animations/CounterAnimation';
import Card3D from '@components/animations/Card3D';

// Sample Data - Top 3 Featured Events
const sampleEvents = [
  { 
    id: 1, 
    name: 'Hackathon 2025', 
    slug: 'hackathon-2025', 
    description: 'Build innovative solutions in 24 hours', 
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
    description: 'Learn AI and Machine Learning fundamentals', 
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
    description: 'Competitive programming challenge', 
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
];

const sampleSpeakers = [
  { id: 1, name: 'Dr. Priya Sharma', designation: 'Chief AI Officer', company: 'TechCorp India', bio: 'Leading AI expert with 15+ years experience', expertise: ['AI', 'ML', 'Deep Learning'], photo_url: 'https://i.pravatar.cc/300?img=1', linkedin: '#', twitter: '#', github: '#' },
  { id: 2, name: 'Arjun Patel', designation: 'Senior Engineer', company: 'Google India', bio: 'Full-stack developer passionate about scalable apps', expertise: ['Web Dev', 'Cloud', 'DevOps'], photo_url: 'https://i.pravatar.cc/300?img=12', linkedin: '#', twitter: '#', github: '#' },
  { id: 3, name: 'Ananya Reddy', designation: 'Cybersecurity Expert', company: 'CyberSafe India', bio: 'Specialist in ethical hacking', expertise: ['Security', 'Hacking', 'Networks'], photo_url: 'https://i.pravatar.cc/300?img=5', linkedin: '#', twitter: '#', github: '#' },
  { id: 4, name: 'Rohan Mehta', designation: 'Blockchain Dev', company: 'CryptoTech India', bio: 'Building DApps and smart contracts', expertise: ['Blockchain', 'Smart Contracts', 'Web3'], photo_url: 'https://i.pravatar.cc/300?img=13', linkedin: '#', twitter: '#', github: '#' },
  { id: 5, name: 'Kavya Iyer', designation: 'Data Scientist', company: 'Amazon India', bio: 'Expert in data analytics and ML models', expertise: ['Data Science', 'Analytics', 'Python'], photo_url: 'https://i.pravatar.cc/300?img=9', linkedin: '#', twitter: '#', github: '#' },
  { id: 6, name: 'Vikram Singh', designation: 'Mobile App Developer', company: 'Flipkart', bio: 'Building high-performance mobile apps', expertise: ['React Native', 'Flutter', 'Mobile'], photo_url: 'https://i.pravatar.cc/300?img=14', linkedin: '#', twitter: '#', github: '#' },
  { id: 7, name: 'Neha Kapoor', designation: 'UI/UX Designer', company: 'Adobe India', bio: 'Creative designer focused on UX', expertise: ['UI/UX', 'Design', 'Figma'], photo_url: 'https://i.pravatar.cc/300?img=10', linkedin: '#', twitter: '#', github: '#' },
  { id: 8, name: 'Aditya Gupta', designation: 'DevOps Engineer', company: 'Microsoft India', bio: 'Expert in cloud infrastructure', expertise: ['DevOps', 'Kubernetes', 'AWS'], photo_url: 'https://i.pravatar.cc/300?img=15', linkedin: '#', twitter: '#', github: '#' },
];

const scheduleData = {
  day1: [
    { time: '09:00 AM', event: 'Registration & Welcome', venue: 'Main Hall', type: 'ceremony' },
    { time: '10:00 AM', event: 'Opening Ceremony', venue: 'Auditorium', type: 'ceremony' },
    { time: '12:00 PM', event: 'Hackathon Begins', venue: 'Lab 1-3', type: 'event' },
    { time: '02:00 PM', event: 'AI/ML Workshop', venue: 'Lab 101', type: 'workshop' },
  ],
  day2: [
    { time: '09:00 AM', event: 'Day 2 Kickoff', venue: 'Main Hall', type: 'ceremony' },
    { time: '10:00 AM', event: 'Web Dev Workshop', venue: 'Lab 201', type: 'workshop' },
    { time: '02:00 PM', event: 'Gaming Tournament', venue: 'Gaming Arena', type: 'event' },
  ],
  day3: [
    { time: '10:00 AM', event: 'Hackathon Presentations', venue: 'Auditorium', type: 'event' },
    { time: '03:00 PM', event: 'Prize Distribution', venue: 'Main Auditorium', type: 'ceremony' },
    { time: '05:00 PM', event: 'Closing Ceremony', venue: 'Main Auditorium', type: 'ceremony' },
  ],
};

const galleryImages = [
  { id: 1, category: 'day1', caption: 'Opening Ceremony', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop' },
  { id: 2, category: 'workshops', caption: 'AI Workshop', image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop' },
  { id: 3, category: 'hackathon', caption: 'Hackathon Teams', image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop' },
  { id: 4, category: 'cultural', caption: 'Cultural Night', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop' },
  { id: 5, category: 'day2', caption: 'Tech Talks', image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop' },
  { id: 6, category: 'awards', caption: 'Prize Distribution', image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop' },
  { id: 7, category: 'workshops', caption: 'Web Dev Workshop', image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop' },
  { id: 8, category: 'hackathon', caption: 'Coding Session', image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop' },
];

const faqData = [
  { q: 'What is Techno Sapiens?', a: 'An annual college tech fest with hackathons, workshops, and competitions.' },
  { q: 'How do I register?', a: 'Create an account and click Register on your desired event.' },
  { q: 'Can I register for multiple events?', a: 'Yes! As long as schedules don\'t conflict.' },
  { q: 'Are events free?', a: 'Some are free, others require a registration fee.' },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDay, setSelectedDay] = useState('day1');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const speakersScrollRef = useRef(null);
  const speakersSectionRef = useRef(null);

  // Use real-time events hook
  const { events: realtimeEvents, loading: eventsLoading } = useRealtimeEvents();
  
  // Use real-time events if available, otherwise fallback to sample data
  const eventsToDisplay = realtimeEvents.length > 0 ? realtimeEvents.slice(0, 3) : sampleEvents;

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const container = speakersScrollRef.current;
      const section = speakersSectionRef.current;
      if (!container || !section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;

      if (!isInView) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

      // COMPLETE LOCK: Prevent vertical scroll until horizontal is done
      if (e.deltaY > 0 && !isAtEnd) {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY * 0.5;
        return;
      }
      
      if (e.deltaY < 0 && !isAtStart) {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY * 0.5;
        return;
      }
    };

    const section = speakersSectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const filteredEvents = sampleEvents.filter(e => selectedCategory === 'all' || e.category.toLowerCase() === selectedCategory);
  const filteredGallery = galleryImages.filter(img => selectedGalleryCategory === 'all' || img.category === selectedGalleryCategory);

  return (
    <div>
      {/* Hero */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Countdown */}
      <section id="countdown" className="py-20 bg-background">
        <CountdownTimer />
      </section>

      {/* Stats */}
      <section id="stats" className="py-20 bg-background">
        <StatsSection />
      </section>

      {/* Marquee Announcements */}
      <section className="py-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-primary/20">
        <Marquee speed={60}>
          <div className="flex items-center gap-12 px-6">
            {[
              '🎉 Early Bird Registration Open',
              '🏆 ₹10L+ Prize Pool',
              '🚀 50+ Events & Workshops',
              '💡 Industry Expert Speakers',
              '🎯 Exclusive Networking',
              '🎪 Cultural Night',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-lg font-medium whitespace-nowrap">
                <IconAnimation animation="bounce">
                  <Sparkles className="w-5 h-5 text-primary" />
                </IconAnimation>
                <span className="gradient-text">{text}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div className="inline-block mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-6xl">🎯</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Featured Events
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">🚀 Top 3 upcoming events • <span className="text-primary font-semibold">Limited seats</span> • Register now!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {eventsToDisplay.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} onRegister={() => handleRegister(event)} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/events">
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold rounded-xl text-xl relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(0,229,255,0.3)',
                    '0 0 50px rgba(0,229,255,0.5)',
                    '0 0 30px rgba(0,229,255,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All Events 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section id="benefits" className="py-20 bg-background-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div className="inline-block mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-6xl">🎯</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Why Attend Techno Sapiens?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">🚀 Transform your career • <span className="text-primary font-semibold">Limited seats</span> • Join the revolution</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: 'Win Big Prizes', desc: '₹10L+ prize pool across events', color: 'from-yellow-500 to-orange-500' },
              { icon: Users, title: 'Network & Connect', desc: 'Meet 5000+ tech enthusiasts', color: 'from-blue-500 to-cyan-500' },
              { icon: Code, title: 'Learn & Build', desc: '50+ workshops & hackathons', color: 'from-green-500 to-emerald-500' },
              { icon: Briefcase, title: 'Career Opportunities', desc: 'Direct placements & internships', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, title: 'Hands-on Experience', desc: 'Real-world projects & coding', color: 'from-orange-500 to-red-500' },
              { icon: Star, title: 'Certificates', desc: 'Industry-recognized certificates', color: 'from-pink-500 to-rose-500' },
              { icon: Target, title: 'Skill Development', desc: 'Master trending technologies', color: 'from-indigo-500 to-purple-500' },
              { icon: Rocket, title: 'Startup Ecosystem', desc: 'Connect with founders & investors', color: 'from-cyan-500 to-blue-500' }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 h-full relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-primary/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 relative z-10`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-orbitron font-bold text-text-primary mb-2 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary text-sm relative z-10">
                    {benefit.desc}
                  </p>

                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/events">
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold rounded-xl text-xl relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(0,229,255,0.3)',
                    '0 0 50px rgba(0,229,255,0.5)',
                    '0 0 30px rgba(0,229,255,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All Events & Register
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
            <p className="text-text-muted text-sm mt-3">⏰ Early bird offer ends soon!</p>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-background relative overflow-hidden">
        <div className="container-custom max-w-5xl relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div className="inline-block mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <span className="text-6xl">📅</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Event Schedule
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">⏰ Plan your 3-day tech journey • <span className="text-primary font-semibold">40+ sessions</span> • Don't miss out!</p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            {[{ id: 'day1', label: 'Day 1', date: 'March 15' }, { id: 'day2', label: 'Day 2', date: 'March 16' }, { id: 'day3', label: 'Day 3', date: 'March 17' }].map((day) => (
              <motion.button key={day.id} onClick={() => setSelectedDay(day.id)} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${selectedDay === day.id ? 'bg-primary text-black scale-105 shadow-[0_0_30px_rgba(0,229,255,0.5)]' : 'glass-strong text-text-secondary hover:bg-white/5 border border-white/10'}`}>
                <div className="text-lg font-bold">{day.label}</div>
                <div className="text-sm opacity-80">{day.date}</div>
              </motion.button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
            <div className="space-y-6">
              {scheduleData[selectedDay].map((item, index) => (
                <motion.div key={index} className="relative pl-20" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <motion.div className="absolute left-5 top-6 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20" whileHover={{ x: 10 }}>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.event}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /><span>{item.time}</span></div>
                      {item.venue !== '-' && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{item.venue}</span></div>}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background relative overflow-hidden">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div className="inline-block mb-4" animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <span className="text-6xl">❓</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Got Questions?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">💡 Find answers to frequently asked questions • <span className="text-primary font-semibold">Quick help</span></p>
          </motion.div>

          <div className="space-y-3">
            {faqData.map((item, index) => (
              <motion.div key={index} className="glass-strong rounded-xl border border-white/10 hover:border-primary/50 overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <motion.button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors" whileHover={{ x: 5 }}>
                  <span className="text-lg font-medium text-text-primary pr-4">{item.q}</span>
                  <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6 text-text-secondary">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background-surface relative overflow-hidden">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              <GlitchText intensity="medium">Get In Touch</GlitchText>
            </h2>
            <p className="text-text-secondary text-lg">We'd love to hear from you</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div className="lg:col-span-1 space-y-6" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <motion.div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Email</h3>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-text-secondary hover:text-primary transition-colors">{SITE_CONFIG.email}</a>
              </motion.div>
              <motion.div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Phone</h3>
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-text-secondary hover:text-primary transition-colors">{SITE_CONFIG.phone}</a>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass-strong rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold gradient-text mb-6">Send a Message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Name" name="name" type="text" placeholder="John Doe" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required />
                    <Input label="Email" name="email" type="email" placeholder="john@example.com" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required />
                  </div>
                  <Input label="Subject" name="subject" type="text" placeholder="How can we help?" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} required />
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Message *</label>
                    <textarea name="message" rows="6" placeholder="Tell us more..." value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required
                      className="w-full px-4 py-3 bg-background-surface border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                  </div>
                  <MagneticButton intensity={0.3}>
                    <Button type="submit" size="lg" fullWidth rightIcon={<Send className="w-5 h-5" />}>Send Message</Button>
                  </MagneticButton>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Home;

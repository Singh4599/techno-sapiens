import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, Clock, Heart, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@components/common/Button';
import { formatDate, formatTime, formatCurrency } from '@utils/helpers';

const EventCard = ({ event, index, onRegister }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [event.date, event.time]);

  const progress = event.seats_total ? (event.seats_filled / event.seats_total) * 100 : 0;
  const seatsLeft = event.seats_total - event.seats_filled;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'from-green-500 to-emerald-500';
      case 'Intermediate': return 'from-yellow-500 to-orange-500';
      case 'Advanced': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      {/* Card */}
      <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {event.image_url ? (
            <img 
              src={event.image_url} 
              alt={event.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-black text-sm font-semibold z-10">
            {event.category}
          </div>

          {/* Difficulty Badge */}
          {event.difficulty && (
            <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getDifficultyColor(event.difficulty)} backdrop-blur-sm rounded-full text-white text-xs font-bold z-10`}>
              {event.difficulty}
            </div>
          )}

          {/* Wishlist Heart */}
          <motion.button
            className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart 
              className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-orbitron font-bold gradient-text mb-3">
            {event.name}
          </h3>
          
          <p className="text-text-secondary mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Countdown Timer */}
          {timeLeft.days >= 0 && (
            <div className="flex gap-2 mb-4 justify-center">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-primary/10 rounded-lg px-3 py-2 border border-primary/30">
                  <span className="text-2xl font-bold text-primary">{item.value}</span>
                  <span className="text-xs text-text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Registration Progress Bar */}
          {event.seats_total && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {event.seats_filled}/{event.seats_total} Registered
                </span>
                <span className={`font-bold ${seatsLeft < 10 ? 'text-red-500' : 'text-primary'}`}>
                  {seatsLeft} seats left!
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${progress > 80 ? 'bg-red-500' : 'bg-gradient-to-r from-primary to-secondary'}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}


          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDate(event.date, 'short')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock className="w-4 h-4 text-primary" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Users className="w-4 h-4 text-primary" />
              <span>{event.team_size_min}-{event.team_size_max} members</span>
            </div>
          </div>

          {/* Prize Pool */}
          {event.prize_pool > 0 && (
            <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold">
                Prize Pool: {formatCurrency(event.prize_pool)}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-white/10">
            {/* Registration Status */}
            {event.registration_open === false && (
              <div className="mb-3 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
                <span className="text-red-500 font-bold text-sm">🔒 Registration Closed</span>
              </div>
            )}
            {seatsLeft === 0 && event.registration_open !== false && (
              <div className="mb-3 px-3 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-center">
                <span className="text-orange-500 font-bold text-sm">⚠️ Event Full</span>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (onRegister) onRegister();
                }}
                fullWidth
                disabled={event.registration_open === false || seatsLeft === 0}
              >
                {event.registration_open === false ? 'Closed' : seatsLeft === 0 ? 'Full' : 'Register Now'}
              </Button>
              <Link to={`/events/${event.slug}`} className="flex-1">
                <Button size="sm" variant="outline" fullWidth>Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    prize_pool: PropTypes.number,
    team_size_min: PropTypes.number,
    team_size_max: PropTypes.number,
    registration_fee: PropTypes.number,
  }).isRequired,
  index: PropTypes.number,
  onRegister: PropTypes.func,
};

export default EventCard;

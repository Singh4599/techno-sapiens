import { motion } from 'framer-motion';
import { useCountdown } from '@hooks/useCountdown';
import { SITE_CONFIG } from '@utils/constants';

const TimeUnit = ({ value, label }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl group-hover:bg-primary/30 transition-all duration-300" />
        
        {/* Card */}
        <div className="relative glass-strong rounded-2xl p-6 md:p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300">
          {/* Value */}
          <motion.div
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-2"
          >
            {String(value).padStart(2, '0')}
          </motion.div>
          
          {/* Label */}
          <div className="text-sm md:text-base text-text-secondary uppercase tracking-wider">
            {label}
          </div>
        </div>

        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 opacity-30">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray={`${(value / (label === 'Days' ? 365 : 60)) * 283} 283`}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const timeRemaining = useCountdown(SITE_CONFIG.eventDate);

  if (timeRemaining.total <= 0) {
    return (
      <section className="section-padding bg-background-surface">
        <div className="container-custom text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-bold gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            The Event Has Started! 🎉
          </motion.h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background-surface relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            Event Starts In
          </h2>
          <p className="text-text-secondary text-lg">
            Don't miss out on the biggest tech fest of the year!
          </p>
        </motion.div>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          <TimeUnit value={timeRemaining.days} label="Days" />
          <TimeUnit value={timeRemaining.hours} label="Hours" />
          <TimeUnit value={timeRemaining.minutes} label="Minutes" />
          <TimeUnit value={timeRemaining.seconds} label="Seconds" />
        </div>

        {/* Pulsing Effect when deadline approaches */}
        {timeRemaining.days < 7 && (
          <motion.div
            className="text-center mt-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-warning font-semibold">
              ⚡ Hurry! Only {timeRemaining.days} days left to register!
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CountdownTimer;

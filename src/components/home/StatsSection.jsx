import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Users, Trophy, Calendar, Building2 } from 'lucide-react';
import { STATS } from '@utils/constants';
import CountUpNumber from '@components/animations/CountUpNumber';
import IconAnimation from '@components/animations/IconAnimation';
import Card3D from '@components/animations/Card3D';

const StatCard = ({ icon: Icon, value, label, suffix = '', delay = 0 }) => {
  const ref = useRef(null);

  return (
    <Card3D>
      <motion.div
        ref={ref}
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Card */}
        <div className="relative glass-strong rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 glow-pulse shadow-lg hover:shadow-primary/20">
        {/* Icon with Animation */}
        <IconAnimation animation="pulse">
          <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </IconAnimation>

        {/* Value with CountUp */}
        <div className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-2">
          <CountUpNumber end={parseInt(value)} duration={2.5} suffix={suffix} />
        </div>

        {/* Label */}
        <div className="text-text-secondary text-sm uppercase tracking-wider">
          {label}
        </div>
      </div>
      </motion.div>
    </Card3D>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: STATS.participants,
      label: 'Participants',
      suffix: '+',
    },
    {
      icon: Calendar,
      value: STATS.events,
      label: 'Events',
      suffix: '+',
    },
    {
      icon: Trophy,
      value: STATS.prizePool,
      label: 'Prize Pool',
      suffix: '',
    },
    {
      icon: Building2,
      value: STATS.sponsors,
      label: 'Sponsors',
      suffix: '+',
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-surface" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            By The Numbers
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join thousands of innovators, creators, and tech enthusiasts in the ultimate celebration of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

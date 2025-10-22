import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';
import Scene3D from '@components/3d/Scene3D';
import InteractiveBackground from '@components/3d/InteractiveBackground';
import { SITE_CONFIG } from '@utils/constants';
import { formatDate } from '@utils/helpers';
import TypewriterText from '@components/animations/TypewriterText';
import RippleButton from '@components/animations/RippleButton';
import ParticleBackground from '@components/animations/ParticleBackground';
import FloatingElements from '@components/animations/FloatingElements';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-20"
        >
          <source src="https://cdn.coverr.co/videos/coverr-digital-technology-background-9142/1080p.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Interactive 3D Background */}
      <Scene3D>
        <InteractiveBackground />
      </Scene3D>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background -z-5" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 -z-5" />

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium backdrop-blur-sm">
              {SITE_CONFIG.tagline}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="gradient-text block mb-4">
              {SITE_CONFIG.name}
            </span>
            <span className="text-3xl md:text-4xl lg:text-5xl text-text-secondary font-space">
              2025
            </span>
          </motion.h1>

          {/* Description with Typewriter */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto min-h-[60px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TypewriterText 
              phrases={[
                'Experience the future of technology',
                'Join the innovation revolution',
                'Build. Create. Innovate.',
                'Where ideas become reality'
              ]}
              className="gradient-text font-medium"
            />
          </motion.p>

          {/* Event Info */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{formatDate(SITE_CONFIG.eventDate, 'long')}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-primary rounded-full" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{SITE_CONFIG.venue}</span>
            </div>
          </motion.div>

          {/* CTA Buttons with Ripple */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/register">
              <RippleButton className="px-8 py-4 bg-primary text-black rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5" />
              </RippleButton>
            </Link>
            <Link to="/events">
              <RippleButton className="px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-bold text-lg hover:bg-primary/10 transition-all">
                Explore Events
              </RippleButton>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            }}
          >
            <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-primary rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Trophy, Rocket, Heart, Zap } from 'lucide-react';
import { GALLERY_CATEGORIES } from '@utils/constants';
import GlitchText from '@components/animations/GlitchText';

const About = () => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all');

  const galleryImages = [
    { id: 1, image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', caption: 'Hackathon Day 1', category: 'Hackathons' },
    { id: 2, image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', caption: 'Workshop Session', category: 'Workshops' },
    { id: 3, image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', caption: 'Cultural Night', category: 'Cultural' },
    { id: 4, image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', caption: 'Award Ceremony', category: 'Awards' },
    { id: 5, image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', caption: 'Team Building', category: 'Day 1' },
    { id: 6, image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', caption: 'Coding Competition', category: 'Competitions' },
    { id: 7, image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', caption: 'Tech Talk', category: 'Day 2' },
    { id: 8, image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', caption: 'Project Expo', category: 'Exhibitions' },
  ];

  const filteredGallery = galleryImages.filter(img => selectedGalleryCategory === 'all' || img.category === selectedGalleryCategory);

  const stats = [
    { icon: Users, value: '5000+', label: 'Participants' },
    { icon: Trophy, value: '50+', label: 'Events' },
    { icon: Rocket, value: '100+', label: 'Projects' },
    { icon: Heart, value: '25+', label: 'Partners' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We foster creativity and encourage innovative thinking in technology'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong community of tech enthusiasts and learners'
    },
    {
      icon: Zap,
      title: 'Excellence',
      description: 'Striving for excellence in everything we do'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Driven by passion for technology and learning'
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            About Techno Sapiens
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Empowering the next generation of innovators and tech leaders
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                Techno Sapiens is the premier technical society of our college, established with a vision to create a platform where technology meets creativity. Since our inception, we've been dedicated to fostering innovation, learning, and collaboration among students.
              </p>
              <p>
                Our annual tech fest has become one of the most anticipated events in the region, attracting thousands of participants from colleges across the country. We host a diverse range of events including hackathons, coding competitions, workshops, tech talks, and cultural activities.
              </p>
              <p>
                What sets us apart is our commitment to providing hands-on learning experiences, industry exposure, and networking opportunities. We believe in learning by doing, and our events are designed to challenge participants while ensuring they have fun along the way.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-text-secondary text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            className="glass-strong rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-orbitron font-bold gradient-text mb-4">
              Our Mission
            </h3>
            <p className="text-text-secondary leading-relaxed">
              To create an ecosystem that nurtures technical talent, promotes innovation, and bridges the gap between academic learning and industry requirements. We aim to provide students with opportunities to explore, experiment, and excel in various domains of technology.
            </p>
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-orbitron font-bold gradient-text mb-4">
              Our Vision
            </h3>
            <p className="text-text-secondary leading-relaxed">
              To be recognized as the leading technical society that produces future-ready professionals who are not just technically sound but also innovative, creative, and socially responsible. We envision a community where learning never stops and innovation knows no bounds.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-xl font-bold text-text-primary mb-2">
                  {value.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.div className="inline-block mb-4" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-6xl">📸</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Event Gallery
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">✨ Relive the amazing memories • <span className="text-primary font-semibold">1000+ photos</span> • From past events</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {GALLERY_CATEGORIES.map((cat) => (
              <motion.button key={cat.value} onClick={() => setSelectedGalleryCategory(cat.value)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${selectedGalleryCategory === cat.value ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,229,255,0.5)]' : 'glass-strong text-text-secondary hover:bg-white/5 border border-white/10'}`}>
                {cat.label}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((image, index) => (
              <motion.div key={image.id} className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.05, rotateZ: 2 }}>
                {image.image_url && (
                  <img 
                    src={image.image_url} 
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <motion.div className="text-center" initial={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
                    <p className="text-white font-bold text-xl mb-2">{image.caption}</p>
                    <p className="text-white/80 text-sm">Click to view</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

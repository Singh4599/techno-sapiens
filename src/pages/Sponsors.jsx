import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const sponsors = {
  platinum: [
    {
      id: 1,
      name: 'TechCorp India',
      logo: 'https://via.placeholder.com/200x100/00E5FF/000000?text=TechCorp',
      website: 'https://techcorp.com',
      description: 'Leading technology solutions provider'
    },
  ],
  gold: [
    {
      id: 2,
      name: 'CodeMasters',
      logo: 'https://via.placeholder.com/180x90/FF00E5/000000?text=CodeMasters',
      website: 'https://codemasters.com',
      description: 'Premium coding bootcamp platform'
    },
    {
      id: 3,
      name: 'DevHub',
      logo: 'https://via.placeholder.com/180x90/00FF85/000000?text=DevHub',
      website: 'https://devhub.com',
      description: 'Developer community platform'
    },
  ],
  silver: [
    {
      id: 4,
      name: 'CloudStack',
      logo: 'https://via.placeholder.com/160x80/FFB800/000000?text=CloudStack',
      website: 'https://cloudstack.com',
      description: 'Cloud infrastructure provider'
    },
    {
      id: 5,
      name: 'DataFlow',
      logo: 'https://via.placeholder.com/160x80/00E5FF/000000?text=DataFlow',
      website: 'https://dataflow.com',
      description: 'Data analytics solutions'
    },
    {
      id: 6,
      name: 'SecureNet',
      logo: 'https://via.placeholder.com/160x80/FF00E5/000000?text=SecureNet',
      website: 'https://securenet.com',
      description: 'Cybersecurity services'
    },
  ],
};

const Sponsors = () => {
  const SponsorCard = ({ sponsor, tier }) => (
    <motion.a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative glass-strong rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center shadow-lg hover:shadow-primary/20">
        {/* Logo */}
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <img 
            src={sponsor.logo} 
            alt={sponsor.name}
            className="max-w-full h-auto"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {sponsor.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4">
          {sponsor.description}
        </p>

        {/* Link Icon */}
        <div className="mt-auto flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm">Visit Website</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.a>
  );

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
            Our Sponsors
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Proudly supported by industry leaders and innovators
          </p>
        </motion.div>

        {/* Platinum Sponsors */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary"></div>
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold gradient-text">
              Platinum Sponsors
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sponsors.platinum.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} tier="platinum" />
            ))}
          </div>
        </motion.div>

        {/* Gold Sponsors */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary"></div>
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-secondary">
              Gold Sponsors
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.gold.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} tier="gold" />
            ))}
          </div>
        </motion.div>

        {/* Silver Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent"></div>
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-accent">
              Silver Sponsors
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.silver.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} tier="silver" />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold gradient-text mb-4">
              Become a Sponsor
            </h3>
            <p className="text-text-secondary mb-6">
              Partner with us to reach thousands of talented students and showcase your brand at one of the biggest tech fests in the region.
            </p>
            <a
              href="mailto:sponsors@technosapiens.com"
              className="inline-block px-8 py-4 bg-primary text-black rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sponsors;

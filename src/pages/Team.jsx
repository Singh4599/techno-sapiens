import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'President',
    department: 'Core Team',
    image: 'https://i.pravatar.cc/300?img=33',
    bio: 'Leading the tech society with passion and innovation',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'rajesh@technosapiens.com' }
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Vice President',
    department: 'Core Team',
    image: 'https://i.pravatar.cc/300?img=1',
    bio: 'Managing operations and event coordination',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'priya@technosapiens.com' }
  },
  {
    id: 3,
    name: 'Arjun Patel',
    role: 'Technical Head',
    department: 'Technical',
    image: 'https://i.pravatar.cc/300?img=12',
    bio: 'Overseeing all technical events and workshops',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'arjun@technosapiens.com' }
  },
  {
    id: 4,
    name: 'Ananya Reddy',
    role: 'Events Head',
    department: 'Events',
    image: 'https://i.pravatar.cc/300?img=5',
    bio: 'Planning and executing amazing tech events',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'ananya@technosapiens.com' }
  },
  {
    id: 5,
    name: 'Rohan Mehta',
    role: 'Marketing Head',
    department: 'Marketing',
    image: 'https://i.pravatar.cc/300?img=13',
    bio: 'Building brand presence and partnerships',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'rohan@technosapiens.com' }
  },
  {
    id: 6,
    name: 'Kavya Iyer',
    role: 'Design Head',
    department: 'Design',
    image: 'https://i.pravatar.cc/300?img=9',
    bio: 'Creating stunning visuals and experiences',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'kavya@technosapiens.com' }
  },
  {
    id: 7,
    name: 'Vikram Singh',
    role: 'Sponsorship Head',
    department: 'Sponsorship',
    image: 'https://i.pravatar.cc/300?img=14',
    bio: 'Securing partnerships and sponsorships',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'vikram@technosapiens.com' }
  },
  {
    id: 8,
    name: 'Neha Kapoor',
    role: 'Content Head',
    department: 'Content',
    image: 'https://i.pravatar.cc/300?img=10',
    bio: 'Managing all content and communications',
    social: { linkedin: '#', twitter: '#', github: '#', email: 'neha@technosapiens.com' }
  },
];

const Team = () => {
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
            Our Team
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Meet the passionate individuals behind Techno Sapiens
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card */}
              <div className="relative glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-primary/20">
                {/* Image */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 transform group-hover:scale-110 transition-all duration-500">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-orbitron font-bold gradient-text mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-1">{member.role}</p>
                  <p className="text-xs text-text-muted">{member.department}</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-text-secondary text-center mb-4 line-clamp-2">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="mt-auto flex justify-center gap-2 pt-4 border-t border-white/10">
                  <a
                    href={member.social.linkedin}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.github}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

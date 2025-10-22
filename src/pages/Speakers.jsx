import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

// Sample speakers data
const sampleSpeakers = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    designation: 'Chief AI Officer',
    company: 'TechCorp India',
    bio: 'Leading expert in Artificial Intelligence with 15+ years of experience in machine learning and neural networks.',
    expertise: ['AI', 'Machine Learning', 'Deep Learning'],
    photo_url: 'https://i.pravatar.cc/300?img=1',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 2,
    name: 'Arjun Patel',
    designation: 'Senior Software Engineer',
    company: 'Google India',
    bio: 'Full-stack developer passionate about building scalable web applications and cloud architecture.',
    expertise: ['Web Development', 'Cloud', 'DevOps'],
    photo_url: 'https://i.pravatar.cc/300?img=12',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    designation: 'Cybersecurity Expert',
    company: 'CyberSafe India',
    bio: 'Cybersecurity specialist focused on ethical hacking and network security solutions.',
    expertise: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
    photo_url: 'https://i.pravatar.cc/300?img=5',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 4,
    name: 'Rohan Mehta',
    designation: 'Blockchain Developer',
    company: 'CryptoTech India',
    bio: 'Blockchain enthusiast working on decentralized applications and smart contracts.',
    expertise: ['Blockchain', 'Smart Contracts', 'Web3'],
    photo_url: 'https://i.pravatar.cc/300?img=13',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 5,
    name: 'Kavya Iyer',
    designation: 'Data Scientist',
    company: 'Amazon India',
    bio: 'Expert in data analytics and machine learning models for business intelligence.',
    expertise: ['Data Science', 'Analytics', 'Python'],
    photo_url: 'https://i.pravatar.cc/300?img=9',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 6,
    name: 'Vikram Singh',
    designation: 'Mobile App Developer',
    company: 'Flipkart',
    bio: 'Specialized in building high-performance mobile applications for iOS and Android.',
    expertise: ['React Native', 'Flutter', 'Mobile Dev'],
    photo_url: 'https://i.pravatar.cc/300?img=14',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 7,
    name: 'Neha Kapoor',
    designation: 'UI/UX Designer',
    company: 'Adobe India',
    bio: 'Creative designer focused on user-centered design and innovative digital experiences.',
    expertise: ['UI/UX', 'Design Systems', 'Figma'],
    photo_url: 'https://i.pravatar.cc/300?img=10',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    id: 8,
    name: 'Aditya Gupta',
    designation: 'DevOps Engineer',
    company: 'Microsoft India',
    bio: 'Expert in cloud infrastructure, CI/CD pipelines, and container orchestration.',
    expertise: ['DevOps', 'Kubernetes', 'AWS'],
    photo_url: 'https://i.pravatar.cc/300?img=15',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
];

const Speakers = () => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      const container = scrollContainerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;

      if (!isInView) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

      // COMPLETE LOCK: If not at end, prevent ALL vertical scroll
      if (e.deltaY > 0 && !isAtEnd) {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY * 0.5;
        setIsScrollLocked(true);
        return;
      }
      
      // If scrolling up and not at start
      if (e.deltaY < 0 && !isAtStart) {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY * 0.5;
        setIsScrollLocked(true);
        return;
      }
      
      // Only allow vertical scroll when at boundaries
      setIsScrollLocked(false);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Speakers
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Learn from industry leaders and tech innovators
          </p>
        </motion.div>

        {/* Horizontal Scrolling Speakers */}
        <div 
          ref={sectionRef}
          className="relative"
        >
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-8 scrollbar-hide"
          >
          <div className="flex gap-6 min-w-max px-4">
          {sampleSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card */}
              <div className="relative glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 h-full flex flex-col min-w-[300px] w-[300px]">
                {/* Avatar */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {speaker.photo_url ? (
                    <img 
                      src={speaker.photo_url} 
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-black">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-orbitron font-bold gradient-text mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-primary mb-1">{speaker.designation}</p>
                  <p className="text-sm text-text-muted">{speaker.company}</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                  {speaker.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {speaker.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-auto flex justify-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href={speaker.linkedin}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={speaker.twitter}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={speaker.github}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;

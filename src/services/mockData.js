// Mock data for development (will be replaced with Supabase)

export const mockEvents = [
  {
    id: '1',
    name: 'Hackathon 2025',
    slug: 'hackathon-2025',
    description: 'Build innovative solutions in 24 hours. Compete with the best minds and win exciting prizes.',
    category: 'Hackathon',
    date: '2025-03-15',
    time: '09:00:00',
    venue: 'Main Auditorium',
    prize_pool: 100000,
    team_size_min: 2,
    team_size_max: 4,
    registration_fee: 500,
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    status: 'published',
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'AI/ML Workshop',
    slug: 'ai-ml-workshop',
    description: 'Learn AI and Machine Learning fundamentals from industry experts.',
    category: 'Workshop',
    date: '2025-03-16',
    time: '10:00:00',
    venue: 'Lab 101',
    prize_pool: 0,
    team_size_min: 1,
    team_size_max: 1,
    registration_fee: 0,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    status: 'published',
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Code Combat',
    slug: 'code-combat',
    description: 'Competitive programming challenge. Test your coding skills.',
    category: 'Competition',
    date: '2025-03-15',
    time: '14:00:00',
    venue: 'Computer Lab',
    prize_pool: 50000,
    team_size_min: 1,
    team_size_max: 1,
    registration_fee: 200,
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    status: 'published',
    created_at: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Gaming Tournament',
    slug: 'gaming-tournament',
    description: 'Battle in popular esports titles and win amazing prizes.',
    category: 'Gaming',
    date: '2025-03-17',
    time: '12:00:00',
    venue: 'Gaming Arena',
    prize_pool: 75000,
    team_size_min: 1,
    team_size_max: 5,
    registration_fee: 300,
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    status: 'published',
    created_at: '2025-01-04T00:00:00Z'
  }
];

export const mockSpeakers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    designation: 'Chief AI Officer',
    company: 'TechCorp',
    bio: 'Leading AI expert with 15+ years of experience in machine learning and deep learning.',
    expertise: ['AI', 'ML', 'Deep Learning'],
    photo_url: 'https://i.pravatar.cc/300?img=1',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    featured: true,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'John Smith',
    designation: 'Senior Engineer',
    company: 'Google',
    bio: 'Full-stack developer passionate about building scalable applications.',
    expertise: ['Web Dev', 'Cloud', 'DevOps'],
    photo_url: 'https://i.pravatar.cc/300?img=12',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    featured: true,
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Emily Chen',
    designation: 'Cybersecurity Expert',
    company: 'CyberSafe',
    bio: 'Specialist in ethical hacking and network security.',
    expertise: ['Security', 'Hacking', 'Networks'],
    photo_url: 'https://i.pravatar.cc/300?img=5',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    featured: false,
    created_at: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Michael Brown',
    designation: 'Blockchain Developer',
    company: 'CryptoTech',
    bio: 'Building decentralized applications and smart contracts.',
    expertise: ['Blockchain', 'Smart Contracts', 'Web3'],
    photo_url: 'https://i.pravatar.cc/300?img=13',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    featured: false,
    created_at: '2025-01-04T00:00:00Z'
  }
];

export const mockGallery = [
  {
    id: '1',
    title: 'Hackathon 2024 Opening',
    description: 'Participants at the opening ceremony',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: 'Events',
    display_order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Workshop Session',
    description: 'AI/ML workshop in progress',
    image_url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
    category: 'Workshops',
    display_order: 2,
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Cultural Night',
    description: 'Amazing performances at cultural night',
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    category: 'Cultural',
    display_order: 3,
    created_at: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Award Ceremony',
    description: 'Winners receiving their prizes',
    image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    category: 'Awards',
    display_order: 4,
    created_at: '2025-01-04T00:00:00Z'
  }
];

export const mockFAQs = [
  {
    id: '1',
    question: 'What is Techno Sapiens?',
    answer: 'Techno Sapiens is the ultimate college tech fest featuring hackathons, workshops, competitions, and cultural events.',
    category: 'General',
    display_order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    question: 'How do I register for events?',
    answer: 'Click on the Register button, create an account, and select the events you want to participate in.',
    category: 'Registration',
    display_order: 2,
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    question: 'What is the registration fee?',
    answer: 'Registration fees vary by event. Some workshops are free, while competitions have nominal fees.',
    category: 'Registration',
    display_order: 3,
    created_at: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    question: 'Can I participate in multiple events?',
    answer: 'Yes! You can register for multiple events as long as their timings don\'t clash.',
    category: 'Events',
    display_order: 4,
    created_at: '2025-01-04T00:00:00Z'
  }
];

export const mockSponsors = [
  {
    id: '1',
    name: 'TechCorp',
    logo_url: 'https://via.placeholder.com/200x100/00E5FF/000000?text=TechCorp',
    tier: 'Platinum',
    website: 'https://techcorp.com',
    display_order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'InnovateLabs',
    logo_url: 'https://via.placeholder.com/200x100/8A2BE2/FFFFFF?text=InnovateLabs',
    tier: 'Gold',
    website: 'https://innovatelabs.com',
    display_order: 2,
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'CodeMasters',
    logo_url: 'https://via.placeholder.com/200x100/FF00FF/000000?text=CodeMasters',
    tier: 'Silver',
    website: 'https://codemasters.com',
    display_order: 3,
    created_at: '2025-01-03T00:00:00Z'
  }
];

export const mockSchedule = [
  {
    id: '1',
    day: 'day1',
    time_start: '09:00:00',
    time_end: '10:00:00',
    event_id: '1',
    title: 'Opening Ceremony',
    description: 'Welcome and inauguration',
    venue: 'Main Auditorium',
    speaker_ids: ['1', '2'],
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    day: 'day1',
    time_start: '10:30:00',
    time_end: '12:00:00',
    event_id: '2',
    title: 'AI/ML Workshop',
    description: 'Introduction to Machine Learning',
    venue: 'Lab 101',
    speaker_ids: ['1'],
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    day: 'day1',
    time_start: '14:00:00',
    time_end: '17:00:00',
    event_id: '3',
    title: 'Code Combat',
    description: 'Competitive Programming Round 1',
    venue: 'Computer Lab',
    speaker_ids: [],
    created_at: '2025-01-03T00:00:00Z'
  }
];

export const mockAnnouncements = [
  {
    id: '1',
    title: 'Early Bird Registration Open',
    content: 'Register now and get 20% discount on all events!',
    type: 'info',
    active: true,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Workshop Schedule Updated',
    content: 'Check the latest schedule for workshop timings.',
    type: 'warning',
    active: true,
    created_at: '2025-01-02T00:00:00Z'
  }
];

export const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    college: 'MIT',
    phone: '+91 9876543210',
    role: 'user',
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    college: 'Stanford',
    phone: '+91 9876543211',
    role: 'user',
    created_at: '2025-01-02T00:00:00Z'
  }
];

export const mockRegistrations = [
  {
    id: '1',
    user_id: '1',
    event_id: '1',
    team_name: 'Code Warriors',
    team_members: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Alice Brown', email: 'alice@example.com' }
    ],
    payment_status: 'completed',
    payment_id: 'PAY123456',
    status: 'approved',
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: '2',
    event_id: '2',
    team_name: null,
    team_members: [
      { name: 'Jane Smith', email: 'jane@example.com' }
    ],
    payment_status: 'pending',
    payment_id: null,
    status: 'pending',
    created_at: '2025-01-02T00:00:00Z'
  }
];

export const mockSettings = {
  site_name: 'Techno Sapiens',
  tagline: 'Where Innovation Meets Excellence',
  event_date: '2025-03-15',
  venue: 'Tech Campus, Innovation Hall',
  contact_email: 'info@technosapiens.com',
  contact_phone: '+91 1234567890',
  social_links: {
    facebook: 'https://facebook.com/technosapiens',
    twitter: 'https://twitter.com/technosapiens',
    instagram: 'https://instagram.com/technosapiens',
    linkedin: 'https://linkedin.com/company/technosapiens'
  },
  registration_open: true,
  theme_color: '#00E5FF'
};

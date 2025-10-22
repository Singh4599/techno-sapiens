// Site Configuration
export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'Techno Sapiens',
  tagline: 'Where Innovation Meets Imagination',
  description: 'The ultimate college tech fest featuring hackathons, workshops, competitions, and tech talks.',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  eventDate: import.meta.env.VITE_EVENT_DATE || '2025-03-15',
  venue: import.meta.env.VITE_EVENT_VENUE || 'Tech Campus',
  email: 'contact@technosapiens.com',
  phone: '+91 1234567890',
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/technosapiens',
  instagram: 'https://instagram.com/technosapiens',
  twitter: 'https://twitter.com/technosapiens',
  linkedin: 'https://linkedin.com/company/technosapiens',
  youtube: 'https://youtube.com/@technosapiens',
  github: 'https://github.com/technosapiens',
};

// Event Categories
export const EVENT_CATEGORIES = [
  { value: 'all', label: 'All Events' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'competition', label: 'Competitions' },
  { value: 'talk', label: 'Tech Talks' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'exhibition', label: 'Exhibitions' },
];

// Sponsor Tiers
export const SPONSOR_TIERS = [
  { value: 'platinum', label: 'Platinum', color: '#E5E4E2' },
  { value: 'gold', label: 'Gold', color: '#FFD700' },
  { value: 'silver', label: 'Silver', color: '#C0C0C0' },
  { value: 'bronze', label: 'Bronze', color: '#CD7F32' },
];

// FAQ Categories
export const FAQ_CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'registration', label: 'Registration' },
  { value: 'events', label: 'Events' },
  { value: 'workshops', label: 'Workshops' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'payment', label: 'Payment' },
];

// Schedule Days
export const SCHEDULE_DAYS = [
  { value: 'day1', label: 'Day 1' },
  { value: 'day2', label: 'Day 2' },
  { value: 'day3', label: 'Day 3' },
];

// Schedule Event Types
export const SCHEDULE_EVENT_TYPES = [
  { value: 'event', label: 'Event', color: '#00E5FF' },
  { value: 'workshop', label: 'Workshop', color: '#8A2BE2' },
  { value: 'break', label: 'Break', color: '#888888' },
  { value: 'ceremony', label: 'Ceremony', color: '#FF00FF' },
];

// Gallery Categories
export const GALLERY_CATEGORIES = [
  { value: 'all', label: 'All Photos' },
  { value: 'day1', label: 'Day 1' },
  { value: 'day2', label: 'Day 2' },
  { value: 'day3', label: 'Day 3' },
  { value: 'workshops', label: 'Workshops' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'awards', label: 'Awards' },
];

// Registration Status
export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInUp: {
    hidden: { y: '100%' },
    visible: { y: 0 },
  },
  slideInDown: {
    hidden: { y: '-100%' },
    visible: { y: 0 },
  },
  slideInLeft: {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  },
  slideInRight: {
    hidden: { x: '100%' },
    visible: { x: 0 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Transition Presets
export const TRANSITION_PRESETS = {
  default: { duration: 0.3, ease: 'easeInOut' },
  smooth: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  bounce: { type: 'spring', stiffness: 400, damping: 10 },
  slow: { duration: 0.8, ease: 'easeInOut' },
  fast: { duration: 0.2, ease: 'easeInOut' },
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
  wide: 1536,
};

// Colors
export const COLORS = {
  primary: '#00E5FF',
  primaryDark: '#00B8D4',
  primaryLight: '#6FF9FF',
  secondary: '#8A2BE2',
  secondaryDark: '#6A0DAD',
  secondaryLight: '#A855F7',
  accent: '#FF00FF',
  accentDark: '#C71585',
  accentLight: '#FF69B4',
  background: '#0A0A0A',
  surface: '#1A1A1A',
  card: '#252525',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#888888',
  success: '#00FF00',
  warning: '#FF6600',
  error: '#FF0055',
};

// API Endpoints (if using custom API)
export const API_ENDPOINTS = {
  events: '/api/events',
  speakers: '/api/speakers',
  workshops: '/api/workshops',
  sponsors: '/api/sponsors',
  gallery: '/api/gallery',
  faqs: '/api/faqs',
  schedule: '/api/schedule',
  registrations: '/api/registrations',
  announcements: '/api/announcements',
};

// File Upload Limits
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
};

// Pagination
export const PAGINATION = {
  itemsPerPage: 12,
  maxPageButtons: 5,
};

// Toast Messages
export const TOAST_MESSAGES = {
  success: {
    login: 'Successfully logged in!',
    logout: 'Successfully logged out!',
    register: 'Registration successful!',
    update: 'Updated successfully!',
    delete: 'Deleted successfully!',
    create: 'Created successfully!',
    save: 'Saved successfully!',
  },
  error: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    auth: 'Authentication failed. Please try again.',
    permission: 'You don\'t have permission to perform this action.',
    notFound: 'Resource not found.',
    validation: 'Please check your input and try again.',
  },
};

// Form Validation Rules
export const VALIDATION_RULES = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: 'Invalid phone number',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
};

// Meta Tags
export const META_TAGS = {
  title: 'Techno Sapiens - Ultimate College Tech Fest',
  description: 'Join the most innovative college tech fest featuring hackathons, workshops, competitions, and tech talks. Where innovation meets imagination.',
  keywords: 'tech fest, hackathon, workshop, college fest, technology, innovation, competition',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
};

// Navigation Links (Optimized for professional look - 6 items max)
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

// Removed items (moved to other sections):
// - Speakers → Now in About page
// - Schedule → Now in Events page
// - Gallery → Now in About page
// - Sponsors → Now in Footer

// Footer Links
export const FOOTER_LINKS = {
  quick: [
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Speakers', path: '/speakers' },
    { name: 'Schedule', path: '/schedule' },
  ],
  resources: [
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Register', path: '/register' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Refund Policy', path: '/refund' },
    { name: 'Code of Conduct', path: '/conduct' },
  ],
};

// Stats (can be fetched from API or settings)
export const STATS = {
  participants: 5000,
  events: 50,
  prizePool: 500000,
  sponsors: 25,
};

export default {
  SITE_CONFIG,
  SOCIAL_LINKS,
  EVENT_CATEGORIES,
  SPONSOR_TIERS,
  FAQ_CATEGORIES,
  SCHEDULE_DAYS,
  SCHEDULE_EVENT_TYPES,
  GALLERY_CATEGORIES,
  REGISTRATION_STATUS,
  PAYMENT_STATUS,
  USER_ROLES,
  ANIMATION_VARIANTS,
  TRANSITION_PRESETS,
  BREAKPOINTS,
  COLORS,
  API_ENDPOINTS,
  FILE_UPLOAD,
  PAGINATION,
  TOAST_MESSAGES,
  VALIDATION_RULES,
  META_TAGS,
  NAV_LINKS,
  FOOTER_LINKS,
  STATS,
};

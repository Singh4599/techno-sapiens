-- ========================================
-- TECHNO SAPIENS - COMPLETE DATABASE SETUP
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. EVENTS TABLE
-- ========================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Hackathon', 'Workshop', 'Competition', 'Gaming', 'Cultural')),
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue TEXT,
  prize_pool INTEGER DEFAULT 0,
  team_size_min INTEGER DEFAULT 1,
  team_size_max INTEGER DEFAULT 1,
  registration_fee INTEGER DEFAULT 0,
  image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 2. SPEAKERS TABLE
-- ========================================
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT,
  company TEXT,
  bio TEXT,
  expertise TEXT[],
  photo_url TEXT,
  linkedin TEXT,
  twitter TEXT,
  github TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 3. GALLERY TABLE
-- ========================================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Events', 'Workshops', 'Cultural', 'Awards')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 4. SCHEDULE TABLE
-- ========================================
CREATE TABLE schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day TEXT NOT NULL CHECK (day IN ('day1', 'day2', 'day3')),
  time_start TIME NOT NULL,
  time_end TIME,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  venue TEXT,
  speaker_ids UUID[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 5. FAQS TABLE
-- ========================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 6. SPONSORS TABLE
-- ========================================
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('Platinum', 'Gold', 'Silver', 'Bronze')),
  website TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 7. USERS TABLE
-- ========================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  college TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 8. REGISTRATIONS TABLE
-- ========================================
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  team_name TEXT,
  team_members JSONB,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 9. ANNOUNCEMENTS TABLE
-- ========================================
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 10. SITE SETTINGS TABLE
-- ========================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_speakers_featured ON speakers(featured);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_announcements_active ON announcements(active);

-- ========================================
-- INSERT SAMPLE DATA
-- ========================================

-- Sample Events
INSERT INTO events (name, slug, description, category, date, time, venue, prize_pool, team_size_min, team_size_max, registration_fee, image_url, status) VALUES
('Hackathon 2025', 'hackathon-2025', 'Build innovative solutions in 24 hours. Compete with the best minds and win exciting prizes.', 'Hackathon', '2025-03-15', '09:00:00', 'Main Auditorium', 100000, 2, 4, 500, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', 'published'),
('AI/ML Workshop', 'ai-ml-workshop', 'Learn AI and Machine Learning fundamentals from industry experts.', 'Workshop', '2025-03-16', '10:00:00', 'Lab 101', 0, 1, 1, 0, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 'published'),
('Code Combat', 'code-combat', 'Competitive programming challenge. Test your coding skills.', 'Competition', '2025-03-15', '14:00:00', 'Computer Lab', 50000, 1, 1, 200, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', 'published'),
('Gaming Tournament', 'gaming-tournament', 'Battle in popular esports titles and win amazing prizes.', 'Gaming', '2025-03-17', '12:00:00', 'Gaming Arena', 75000, 1, 5, 300, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'published');

-- Sample Speakers
INSERT INTO speakers (name, designation, company, bio, expertise, photo_url, linkedin, twitter, github, featured) VALUES
('Dr. Sarah Johnson', 'Chief AI Officer', 'TechCorp', 'Leading AI expert with 15+ years of experience in machine learning and deep learning.', ARRAY['AI', 'ML', 'Deep Learning'], 'https://i.pravatar.cc/300?img=1', 'https://linkedin.com', 'https://twitter.com', 'https://github.com', true),
('John Smith', 'Senior Engineer', 'Google', 'Full-stack developer passionate about building scalable applications.', ARRAY['Web Dev', 'Cloud', 'DevOps'], 'https://i.pravatar.cc/300?img=12', 'https://linkedin.com', 'https://twitter.com', 'https://github.com', true),
('Emily Chen', 'Cybersecurity Expert', 'CyberSafe', 'Specialist in ethical hacking and network security.', ARRAY['Security', 'Hacking', 'Networks'], 'https://i.pravatar.cc/300?img=5', 'https://linkedin.com', 'https://twitter.com', 'https://github.com', false),
('Michael Brown', 'Blockchain Developer', 'CryptoTech', 'Building decentralized applications and smart contracts.', ARRAY['Blockchain', 'Smart Contracts', 'Web3'], 'https://i.pravatar.cc/300?img=13', 'https://linkedin.com', 'https://twitter.com', 'https://github.com', false);

-- Sample FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
('What is Techno Sapiens?', 'Techno Sapiens is the ultimate college tech fest featuring hackathons, workshops, competitions, and cultural events.', 'General', 1),
('How do I register for events?', 'Click on the Register button, create an account, and select the events you want to participate in.', 'Registration', 2),
('What is the registration fee?', 'Registration fees vary by event. Some workshops are free, while competitions have nominal fees.', 'Registration', 3),
('Can I participate in multiple events?', 'Yes! You can register for multiple events as long as their timings don''t clash.', 'Events', 4);

-- Sample Announcements
INSERT INTO announcements (title, content, type, active) VALUES
('Early Bird Registration Open', 'Register now and get 20% discount on all events!', 'info', true),
('Workshop Schedule Updated', 'Check the latest schedule for workshop timings.', 'warning', true);

-- Sample Site Settings
INSERT INTO site_settings (key, value) VALUES
('site_config', '{
  "site_name": "Techno Sapiens",
  "tagline": "Where Innovation Meets Excellence",
  "event_date": "2025-03-15",
  "venue": "Tech Campus, Innovation Hall",
  "contact_email": "info@technosapiens.com",
  "contact_phone": "+91 1234567890",
  "social_links": {
    "facebook": "https://facebook.com/technosapiens",
    "twitter": "https://twitter.com/technosapiens",
    "instagram": "https://instagram.com/technosapiens",
    "linkedin": "https://linkedin.com/company/technosapiens"
  },
  "registration_open": true,
  "theme_color": "#00E5FF"
}');

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view published content)
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view speakers" ON speakers FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can view schedule" ON schedule FOR SELECT USING (true);
CREATE POLICY "Public can view faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public can view sponsors" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Public can view active announcements" ON announcements FOR SELECT USING (active = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Users can view their own data
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view their registrations" ON registrations FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (full access for authenticated admins)
CREATE POLICY "Admins can do everything on events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on speakers" ON speakers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on schedule" ON schedule FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on sponsors" ON sponsors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on users" ON users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on registrations" ON registrations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on announcements" ON announcements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ========================================
-- STORAGE BUCKETS (for images)
-- ========================================
-- Run this in Supabase Storage UI:
-- 1. Create bucket: 'events'
-- 2. Create bucket: 'speakers'
-- 3. Create bucket: 'gallery'
-- 4. Make all buckets public

-- ========================================
-- SETUP COMPLETE!
-- ========================================

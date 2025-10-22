-- TECHNO SAPIENS DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- 1. USERS TABLE (Extended from Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    college TEXT,
    year INTEGER,
    branch TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME,
    venue TEXT,
    image_url TEXT,
    prize_pool INTEGER DEFAULT 0,
    team_size_min INTEGER DEFAULT 1,
    team_size_max INTEGER DEFAULT 1,
    registration_fee INTEGER DEFAULT 0,
    max_participants INTEGER DEFAULT 100,
    registration_open BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'upcoming', -- upcoming, ongoing, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    team_name TEXT,
    team_size INTEGER DEFAULT 1,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
    amount INTEGER DEFAULT 0,
    transaction_id TEXT,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

-- 4. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    registration_id UUID REFERENCES public.registrations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    college TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SPEAKERS TABLE
CREATE TABLE IF NOT EXISTS public.speakers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT,
    company TEXT,
    bio TEXT,
    expertise TEXT[],
    photo_url TEXT,
    linkedin TEXT,
    twitter TEXT,
    github TEXT,
    email TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. SPONSORS TABLE
CREATE TABLE IF NOT EXISTS public.sponsors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    tier TEXT NOT NULL, -- platinum, gold, silver
    logo_url TEXT,
    website TEXT,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    certificate_type TEXT NOT NULL, -- participation, winner, runner_up
    certificate_url TEXT,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, event_id, certificate_type)
);

-- 8. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    category TEXT,
    uploaded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info', -- info, warning, success, error
    target TEXT DEFAULT 'all', -- all, specific_event, specific_user
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. ADMIN SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Profiles: Users can read all, insert their own, and update their own
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Events: Everyone can read, only admins can modify
CREATE POLICY "Events are viewable by everyone"
    ON public.events FOR SELECT
    USING (true);

-- Registrations: Users can read their own, insert their own
CREATE POLICY "Users can view own registrations"
    ON public.registrations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create registrations"
    ON public.registrations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Certificates: Users can read their own
CREATE POLICY "Users can view own certificates"
    ON public.certificates FOR SELECT
    USING (auth.uid() = user_id);

-- Gallery: Everyone can read
CREATE POLICY "Gallery is viewable by everyone"
    ON public.gallery FOR SELECT
    USING (true);

-- CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON public.registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events(category);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);

-- SAMPLE DATA (Optional - Remove in production)
INSERT INTO public.events (name, slug, description, category, date, time, venue, prize_pool, team_size_min, team_size_max, registration_fee, image_url)
VALUES 
('Hackathon 2025', 'hackathon-2025', 'Build innovative solutions in 24 hours', 'Hackathon', '2025-03-15', '09:00:00', 'Main Auditorium', 100000, 2, 4, 500, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'),
('AI/ML Workshop', 'ai-ml-workshop', 'Learn AI and Machine Learning fundamentals', 'Workshop', '2025-03-16', '10:00:00', 'Lab 101', 0, 1, 1, 0, 'https://images.unsplash.com/photo-1677442136019-21780ecad995'),
('Code Combat', 'code-combat', 'Competitive programming challenge', 'Competition', '2025-03-15', '14:00:00', 'Computer Lab', 50000, 1, 1, 200, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97');

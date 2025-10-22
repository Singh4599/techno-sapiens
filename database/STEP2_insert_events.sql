-- STEP 2: Insert or Update Events
-- Run this SECOND in Supabase SQL Editor

-- Delete existing events (if any)
DELETE FROM public.events WHERE slug IN ('hackathon-2025', 'ai-ml-workshop', 'code-combat');

-- Insert 3 fresh events
INSERT INTO public.events (
  name, 
  slug, 
  description, 
  category, 
  date, 
  time, 
  venue, 
  prize_pool, 
  team_size_min, 
  team_size_max, 
  registration_fee, 
  max_participants,
  registration_open,
  status,
  image_url
)
VALUES 
(
  'Hackathon 2025', 
  'hackathon-2025', 
  'Build innovative solutions in 24 hours. Compete with the best minds and win exciting prizes.', 
  'Hackathon', 
  '2025-03-15', 
  '09:00:00', 
  'Main Auditorium', 
  100000, 
  2, 
  4, 
  500, 
  100,
  true,
  'upcoming',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop'
),
(
  'AI/ML Workshop', 
  'ai-ml-workshop', 
  'Learn the fundamentals of Artificial Intelligence and Machine Learning from industry experts.', 
  'Workshop', 
  '2025-03-16', 
  '10:00:00', 
  'Lab 101', 
  0, 
  1, 
  1, 
  0, 
  50,
  true,
  'upcoming',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop'
),
(
  'Code Combat', 
  'code-combat', 
  'Test your coding skills in this intense competitive programming challenge.', 
  'Competition', 
  '2025-03-15', 
  '14:00:00', 
  'Computer Lab', 
  50000, 
  1, 
  1, 
  200, 
  80,
  true,
  'upcoming',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop'
);

-- Verify insertion
SELECT id, name, slug, max_participants, registration_open, status 
FROM public.events
ORDER BY date;

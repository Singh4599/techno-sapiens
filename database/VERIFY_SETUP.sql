-- ✅ VERIFY ADMIN SETUP (Realtime already enabled!)
-- Run this in Supabase SQL Editor

-- Step 1: Verify real-time is enabled (should show registrations)
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Step 2: Make sure RLS is disabled (for testing)
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Step 3: Count total registrations
SELECT COUNT(*) as total_registrations FROM public.registrations;

-- Step 4: Show all registrations with user and event details
SELECT 
  r.id,
  r.user_id,
  r.event_id,
  r.status,
  r.payment_status,
  r.amount,
  r.team_size,
  p.full_name as user_name,
  p.email as user_email,
  p.phone as user_phone,
  e.name as event_name
FROM public.registrations r
LEFT JOIN public.profiles p ON r.user_id = p.id
LEFT JOIN public.events e ON r.event_id = e.id
ORDER BY r.id DESC;

-- Step 5: Verify all tables are accessible
SELECT 'registrations' as table_name, COUNT(*) as count FROM public.registrations
UNION ALL
SELECT 'profiles' as table_name, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'events' as table_name, COUNT(*) as count FROM public.events;

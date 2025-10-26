-- Enable Real-Time for Registrations Table
-- Run this in Supabase SQL Editor

-- Step 1: Enable real-time for registrations table
ALTER PUBLICATION supabase_realtime ADD TABLE registrations;

-- Step 2: Verify real-time is enabled
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Step 3: Make sure RLS is disabled (for testing)
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Step 4: Verify all registrations are visible
SELECT COUNT(*) as total_registrations FROM public.registrations;

-- Step 5: Show sample data
SELECT 
  r.id,
  r.user_id,
  r.event_id,
  r.status,
  r.payment_status,
  p.full_name,
  p.email,
  e.name as event_name
FROM public.registrations r
LEFT JOIN public.profiles p ON r.user_id = p.id
LEFT JOIN public.events e ON r.event_id = e.id
ORDER BY r.id DESC
LIMIT 10;

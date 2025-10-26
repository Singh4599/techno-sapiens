-- ✅ ENABLE REALTIME FOR ADMIN UPDATES
-- Run this in Supabase SQL Editor

-- Step 1: Enable realtime for registrations table
ALTER PUBLICATION supabase_realtime ADD TABLE registrations;

-- Step 2: Verify realtime is enabled
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Step 3: Make sure RLS is disabled (for testing)
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Step 4: Verify all registrations are visible
SELECT COUNT(*) as total_registrations FROM public.registrations;
SELECT * FROM public.registrations ORDER BY id DESC LIMIT 5;

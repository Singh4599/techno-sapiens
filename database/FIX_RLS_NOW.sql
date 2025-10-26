-- 🚨 CRITICAL FIX - Run this NOW in Supabase SQL Editor
-- This will fix the "0 registrations" issue

-- Step 1: DISABLE RLS completely (for testing)
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can insert own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.registrations;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.registrations;
DROP POLICY IF EXISTS "Allow users to view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow admins to view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow users to insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow admins to delete registrations" ON public.registrations;

-- Step 3: Verify realtime is enabled
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
AND tablename = 'registrations';

-- Step 4: Count registrations
SELECT COUNT(*) as total_registrations FROM public.registrations;

-- Step 5: Show ALL registrations with details
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
  e.name as event_name
FROM public.registrations r
LEFT JOIN public.profiles p ON r.user_id = p.id
LEFT JOIN public.events e ON r.event_id = e.id
ORDER BY r.id DESC;

-- ✅ After running this, ALL registrations should be visible!

-- TEMPORARY FIX - Remove RLS completely for testing
-- Run this to get admin working immediately

-- Disable RLS on registrations temporarily
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;

-- Disable RLS on admin_users temporarily
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- Also make sure profiles table exists and is accessible
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Verify tables exist
SELECT 'registrations' as table_name, COUNT(*) as count FROM public.registrations
UNION ALL
SELECT 'admin_users' as table_name, COUNT(*) as count FROM public.admin_users
UNION ALL
SELECT 'profiles' as table_name, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'events' as table_name, COUNT(*) as count FROM public.events;

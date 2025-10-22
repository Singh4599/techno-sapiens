-- Fix RLS for Admin to View All Registrations
-- Run this in Supabase SQL Editor

-- STEP 1: Create admin_users table if not exists
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check if they're admin
CREATE POLICY "Anyone can check admin status"
ON public.admin_users
FOR SELECT
USING (true);

-- STEP 2: Drop existing restrictive policies on registrations
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can insert own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;

-- STEP 3: Create new policies

-- Allow users to view their own registrations
CREATE POLICY "Users can view own registrations"
ON public.registrations
FOR SELECT
USING (auth.uid() = user_id);

-- Allow admins to view ALL registrations
CREATE POLICY "Admins can view all registrations"
ON public.registrations
FOR SELECT
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- Allow users to insert their own registrations
CREATE POLICY "Users can insert own registrations"
ON public.registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow admins to delete any registration
CREATE POLICY "Admins can delete registrations"
ON public.registrations
FOR DELETE
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- STEP 4: Add yourself as admin (REPLACE WITH YOUR USER ID!)
-- First get your user ID by running:
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then insert (REPLACE the values):
-- INSERT INTO public.admin_users (user_id, email)
-- VALUES ('your-user-id-here', 'your-email@example.com');

-- Example for user with email 'rockstiker40@gmail.com':
-- Get user ID first, then:
-- INSERT INTO public.admin_users (user_id, email)
-- SELECT id, email FROM auth.users WHERE email = 'rockstiker40@gmail.com';

-- STEP 5: Verify
SELECT * FROM public.admin_users;

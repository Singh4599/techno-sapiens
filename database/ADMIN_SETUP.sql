-- Complete Admin Setup for techno-sapiens
-- Run this in Supabase SQL Editor

-- STEP 1: Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check if they're admin
CREATE POLICY "Anyone can check admin status"
ON public.admin_users
FOR SELECT
USING (true);

-- STEP 2: Fix RLS policies for registrations
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can insert own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;

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

-- STEP 3: Add yourself as admin (REPLACE WITH YOUR EMAIL!)
-- First get your user ID:
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then insert (REPLACE the values):
-- INSERT INTO public.admin_users (user_id, email)
-- VALUES ('your-user-id-here', 'your-email@example.com');

-- Example:
-- INSERT INTO public.admin_users (user_id, email)
-- VALUES ('123e4567-e89b-12d3-a456-426614174000', 'rockstiker40@gmail.com');

-- STEP 4: Verify
SELECT * FROM public.admin_users;
SELECT * FROM public.registrations LIMIT 5;

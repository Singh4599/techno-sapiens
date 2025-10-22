-- 🚀 COMPLETE FIX - Run this in Supabase SQL Editor
-- This will fix ALL admin and registration issues

-- STEP 1: Create admin_users table (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'admin_users') THEN
        CREATE TABLE public.admin_users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id)
        );
    END IF;
END $$;

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can check admin status" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admins" ON public.admin_users;

-- Create policy to allow checking admin status
CREATE POLICY "Anyone can check admin status"
ON public.admin_users
FOR SELECT
USING (true);

-- STEP 2: Fix registrations table policies
-- Drop ALL existing policies on registrations
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can insert own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.registrations;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.registrations;

-- Create NEW comprehensive policies
CREATE POLICY "Allow users to view own registrations"
ON public.registrations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Allow admins to view all registrations"
ON public.registrations
FOR SELECT
USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

CREATE POLICY "Allow users to insert registrations"
ON public.registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow admins to delete registrations"
ON public.registrations
FOR DELETE
USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

-- STEP 3: Make sure events table exists and is accessible
-- (Events should already exist from previous setup)

-- STEP 4: Add yourself as admin
-- Replace 'rockstiker40@gmail.com' with your actual email
INSERT INTO public.admin_users (user_id, email)
SELECT id, email
FROM auth.users
WHERE email = 'rockstiker40@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- STEP 5: Verify everything
SELECT 'Admin Users:' as table_name, COUNT(*) as count FROM public.admin_users
UNION ALL
SELECT 'Registrations:' as table_name, COUNT(*) as count FROM public.registrations
UNION ALL
SELECT 'Events:' as table_name, COUNT(*) as count FROM public.events;

-- Show current policies
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('admin_users', 'registrations')
ORDER BY tablename, policyname;

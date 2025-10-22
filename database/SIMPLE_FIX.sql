-- SIMPLE FIX: Allow logged-in users to see all registrations
-- Run this in Supabase SQL Editor

-- Drop all existing policies on registrations
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can insert own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.registrations;

-- Create simple policies

-- 1. Allow ALL logged-in users to VIEW all registrations
CREATE POLICY "Enable read access for all users"
ON public.registrations
FOR SELECT
USING (auth.role() = 'authenticated');

-- 2. Allow users to INSERT registrations
CREATE POLICY "Enable insert for authenticated users only"
ON public.registrations
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow users to DELETE (for admin functionality)
CREATE POLICY "Enable delete for authenticated users"
ON public.registrations
FOR DELETE
USING (auth.role() = 'authenticated');

-- Verify
SELECT * FROM public.registrations LIMIT 5;

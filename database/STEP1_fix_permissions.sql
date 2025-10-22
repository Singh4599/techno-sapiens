-- STEP 1: Fix RLS Policies for Admin Operations
-- Run this FIRST in Supabase SQL Editor

-- Drop ALL existing policies on events
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;

-- Drop ALL existing policies on registrations
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can create registrations" ON public.registrations;
DROP POLICY IF EXISTS "Anyone can view registrations" ON public.registrations;
DROP POLICY IF EXISTS "Authenticated users can insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can update own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can delete own registrations" ON public.registrations;

-- Create NEW policies for events

-- 1. Everyone can view events
CREATE POLICY "view_events_policy"
ON public.events
FOR SELECT
USING (true);

-- 2. Authenticated users can insert events (for admin)
CREATE POLICY "insert_events_policy"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. Authenticated users can update events (for admin)
CREATE POLICY "update_events_policy"
ON public.events
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Authenticated users can delete events (for admin)
CREATE POLICY "delete_events_policy"
ON public.events
FOR DELETE
TO authenticated
USING (true);

-- Create NEW policies for registrations

-- 1. Anyone can view registrations (for count)
CREATE POLICY "view_registrations_policy"
ON public.registrations
FOR SELECT
USING (true);

-- 2. Authenticated users can insert registrations
CREATE POLICY "insert_registrations_policy"
ON public.registrations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Users can update their own registrations
CREATE POLICY "update_registrations_policy"
ON public.registrations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 4. Users can delete their own registrations
CREATE POLICY "delete_registrations_policy"
ON public.registrations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Verify policies created
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('events', 'registrations')
ORDER BY tablename, policyname;

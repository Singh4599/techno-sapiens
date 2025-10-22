import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook to fetch events with real-time registration counts
 * Automatically updates when registrations change
 */
export const useRealtimeEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial events with registration counts
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Get events with registration count
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select(`
            *,
            registrations:registrations(count)
          `)
          .order('date', { ascending: true });

        if (eventsError) throw eventsError;

        // Transform data to include seats_filled
        const transformedEvents = eventsData.map(event => ({
          ...event,
          seats_total: event.max_participants,
          seats_filled: event.registrations[0]?.count || 0,
          difficulty: event.category === 'Hackathon' ? 'Advanced' : 
                     event.category === 'Workshop' ? 'Beginner' : 'Intermediate',
          tags: [event.category]
        }));

        setEvents(transformedEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    // Subscribe to real-time changes on registrations
    const registrationsSubscription = supabase
      .channel('registrations-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'registrations'
        },
        (payload) => {
          console.log('Registration change detected:', payload);
          // Refetch events to update counts
          fetchEvents();
        }
      )
      .subscribe();

    // Subscribe to real-time changes on events table
    const eventsSubscription = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Event change detected:', payload);
          // Refetch events
          fetchEvents();
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(registrationsSubscription);
      supabase.removeChannel(eventsSubscription);
    };
  }, []);

  return { events, loading, error };
};

/**
 * Hook to get a single event with real-time updates
 */
export const useRealtimeEvent = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        
        const { data, error: eventError } = await supabase
          .from('events')
          .select(`
            *,
            registrations:registrations(count)
          `)
          .eq('id', eventId)
          .single();

        if (eventError) throw eventError;

        const transformedEvent = {
          ...data,
          seats_total: data.max_participants,
          seats_filled: data.registrations[0]?.count || 0,
          difficulty: data.category === 'Hackathon' ? 'Advanced' : 
                     data.category === 'Workshop' ? 'Beginner' : 'Intermediate',
          tags: [data.category]
        };

        setEvent(transformedEvent);
        setError(null);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    // Subscribe to changes
    const subscription = supabase
      .channel(`event-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'registrations',
          filter: `event_id=eq.${eventId}`
        },
        () => {
          fetchEvent();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: `id=eq.${eventId}`
        },
        () => {
          fetchEvent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [eventId]);

  return { event, loading, error };
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Auth helpers
export const authHelpers = {
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },

  updatePassword: async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  },
};

// Database helpers
export const dbHelpers = {
  // Events
  getEvents: async (filters = {}) => {
    let query = supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getEventBySlug: async (slug) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .single();
    return { data, error };
  },

  // Speakers
  getSpeakers: async () => {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });
    return { data, error };
  },

  // Workshops
  getWorkshops: async () => {
    const { data, error } = await supabase
      .from('workshops')
      .select('*, instructor:speakers(*)')
      .eq('is_published', true);
    return { data, error };
  },

  // Sponsors
  getSponsors: async () => {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });
    return { data, error };
  },

  // Gallery
  getGallery: async (category = null) => {
    let query = supabase
      .from('gallery')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // FAQs
  getFAQs: async (category = null) => {
    let query = supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Schedule
  getSchedule: async (day = null) => {
    let query = supabase
      .from('schedule')
      .select('*, event:events(*)')
      .order('display_order', { ascending: true });

    if (day) {
      query = query.eq('day', day);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Announcements
  getActiveAnnouncements: async () => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .lte('start_date', now)
      .gte('end_date', now)
      .order('priority', { ascending: false });
    return { data, error };
  },

  // Registrations
  createRegistration: async (registrationData) => {
    const { data, error } = await supabase
      .from('registrations')
      .insert(registrationData)
      .select()
      .single();
    return { data, error };
  },

  getUserRegistrations: async (userId) => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*, event:events(*)')
      .eq('user_id', userId)
      .order('registered_at', { ascending: false });
    return { data, error };
  },

  // Site Settings
  getSiteSettings: async (key) => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();
    return { data: data?.value, error };
  },

  getAllSiteSettings: async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');
    return { data, error };
  },
};

// Storage helpers
export const storageHelpers = {
  uploadFile: async (bucket, path, file) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
    return { data, error };
  },

  getPublicUrl: (bucket, path) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  },

  deleteFile: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    return { data, error };
  },
};

// Admin helpers
export const adminHelpers = {
  isAdmin: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) return false;
    return data?.role === 'admin';
  },

  // CRUD operations for admin
  create: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    return { data: result, error };
  },

  update: async (table, id, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    return { data: result, error };
  },

  delete: async (table, id) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    return { error };
  },

  getAll: async (table, filters = {}) => {
    let query = supabase.from(table).select('*');
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query;
    return { data, error };
  },
};

export default supabase;

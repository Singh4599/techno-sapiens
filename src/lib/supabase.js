import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  // Sign up new user
  signUp: async ({ email, password, full_name, phone, college, year, branch }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone,
          college,
          year,
          branch,
        },
        emailRedirectTo: undefined, // Disable email confirmation for now
      }
    });
    
    if (error) throw error;
    
    // Create profile - wait a bit for auth user to be created
    if (data.user) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          full_name,
          phone,
          college,
          year,
          branch,
        });
      
      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't throw error, profile can be created later
      }
    }
    
    return data;
  },

  // Sign in
  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get current session
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Reset password
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  // Update password
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  }
};

// Database helpers
export const db = {
  // Events
  events: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      if (error) throw error;
      return data;
    },
    
    getBySlug: async (slug) => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
    
    create: async (event) => {
      const { data, error } = await supabase
        .from('events')
        .insert(event)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    delete: async (id) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  // Registrations
  registrations: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles:user_id (full_name, email, phone),
          events:event_id (name, date)
        `)
        .order('registered_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    
    getByUser: async (userId) => {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          events:event_id (*)
        `)
        .eq('user_id', userId)
        .order('registered_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    
    create: async (registration) => {
      const { data, error } = await supabase
        .from('registrations')
        .insert(registration)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    updateStatus: async (id, status, paymentStatus) => {
      const { data, error } = await supabase
        .from('registrations')
        .update({ status, payment_status: paymentStatus })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  // Profiles
  profiles: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    },
    
    update: async (userId, updates) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  // Certificates
  certificates: {
    getByUser: async (userId) => {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          events:event_id (name, date)
        `)
        .eq('user_id', userId);
      if (error) throw error;
      return data;
    },
    
    create: async (certificate) => {
      const { data, error } = await supabase
        .from('certificates')
        .insert(certificate)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  // Team Members
  teamMembers: {
    create: async (member) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert(member)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    getByRegistration: async (registrationId) => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('registration_id', registrationId);
      if (error) throw error;
      return data;
    }
  }
};

export default supabase;

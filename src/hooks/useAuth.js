import { useEffect } from 'react';
import { useAuthStore } from '@store/store';
import { auth, supabase } from '@/lib/supabase';

export const useAuth = () => {
  const { user, isAuthenticated, isAdmin, setUser, logout } = useAuthStore();

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        if (!auth || !supabase) {
          console.warn('Supabase not initialized');
          return;
        }
        
        const session = await auth.getSession();
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || '',
            phone: session.user.user_metadata?.phone || '',
            college: session.user.user_metadata?.college || '',
          };
          setUser(userData);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Session check failed:', error);
        logout();
      }
    };

    checkSession();

    // Listen for auth changes
    try {
      if (!supabase?.auth) {
        console.warn('Supabase auth not available');
        return;
      }
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || '',
            phone: session.user.user_metadata?.phone || '',
            college: session.user.user_metadata?.college || '',
          };
          setUser(userData);
        } else {
          logout();
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    } catch (error) {
      console.error('Auth state listener failed:', error);
    }
  }, [setUser, logout]);

  const signUp = async (userData) => {
    try {
      await auth.signUp(userData);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email, password) => {
    try {
      await auth.signIn(email, password);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      logout();
      // NOTE: Do NOT clear user_registrations - they should persist!
      // Only clear admin session if exists
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminEmail');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth.resetPassword(email);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      await auth.updatePassword(newPassword);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };
};

export default useAuth;

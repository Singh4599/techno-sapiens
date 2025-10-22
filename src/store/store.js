import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' 
      }),
      
      setLoading: (loading) => set({ loading }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        isAdmin: false 
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// UI Store
export const useUIStore = create((set) => ({
  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  // Modal
  isModalOpen: false,
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  
  // Toast
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { id: Date.now(), ...toast }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id)
  })),
  
  // Loading
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  
  // Scroll
  scrollY: 0,
  setScrollY: (scrollY) => set({ scrollY }),
  
  // Theme
  theme: 'dark',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),
  
  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  
  // Animations
  animationsEnabled: true,
  toggleAnimations: () => set((state) => ({ 
    animationsEnabled: !state.animationsEnabled 
  })),
}));

// Events Store
export const useEventsStore = create((set) => ({
  events: [],
  selectedEvent: null,
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
  
  setEvents: (events) => set({ events }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Filtered events
  getFilteredEvents: () => {
    const state = useEventsStore.getState();
    let filtered = state.events;
    
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === state.selectedCategory);
    }
    
    if (state.searchQuery) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  },
}));

// Speakers Store
export const useSpeakersStore = create((set) => ({
  speakers: [],
  selectedSpeaker: null,
  loading: false,
  error: null,
  
  setSpeakers: (speakers) => set({ speakers }),
  setSelectedSpeaker: (speaker) => set({ selectedSpeaker: speaker }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// Workshops Store
export const useWorkshopsStore = create((set) => ({
  workshops: [],
  selectedWorkshop: null,
  loading: false,
  error: null,
  
  setWorkshops: (workshops) => set({ workshops }),
  setSelectedWorkshop: (workshop) => set({ selectedWorkshop: workshop }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// Gallery Store
export const useGalleryStore = create((set) => ({
  images: [],
  selectedImage: null,
  selectedCategory: 'all',
  loading: false,
  error: null,
  
  setImages: (images) => set({ images }),
  setSelectedImage: (image) => set({ selectedImage: image }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Filtered images
  getFilteredImages: () => {
    const state = useGalleryStore.getState();
    if (state.selectedCategory === 'all') {
      return state.images;
    }
    return state.images.filter(image => image.category === state.selectedCategory);
  },
}));

// Admin Store
export const useAdminStore = create((set) => ({
  // Dashboard stats
  stats: {
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    totalRevenue: 0,
  },
  
  // Current editing item
  editingItem: null,
  editingType: null,
  
  // Filters
  filters: {},
  
  setStats: (stats) => set({ stats }),
  setEditingItem: (item, type) => set({ editingItem: item, editingType: type }),
  clearEditingItem: () => set({ editingItem: null, editingType: null }),
  setFilters: (filters) => set({ filters }),
}));

// Site Settings Store
export const useSiteSettingsStore = create((set) => ({
  settings: {},
  loading: false,
  error: null,
  
  setSettings: (settings) => set({ settings }),
  updateSetting: (key, value) => set((state) => ({
    settings: { ...state.settings, [key]: value }
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// Cart Store (for event registrations)
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const exists = state.items.find(i => i.id === item.id);
        if (exists) return state;
        return { items: [...state.items, item] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const state = useCartStore.getState();
        return state.items.reduce((total, item) => total + (item.registration_fee || 0), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Announcements Store
export const useAnnouncementsStore = create((set) => ({
  announcements: [],
  loading: false,
  error: null,
  
  setAnnouncements: (announcements) => set({ announcements }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default {
  useAuthStore,
  useUIStore,
  useEventsStore,
  useSpeakersStore,
  useWorkshopsStore,
  useGalleryStore,
  useAdminStore,
  useSiteSettingsStore,
  useCartStore,
  useAnnouncementsStore,
};

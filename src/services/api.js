// API Service Layer - Mock implementation (will be replaced with Supabase)
import {
  mockEvents,
  mockSpeakers,
  mockGallery,
  mockFAQs,
  mockSponsors,
  mockSchedule,
  mockAnnouncements,
  mockUsers,
  mockRegistrations,
  mockSettings
} from './mockData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEYS = {
  EVENTS: 'techno_events',
  SPEAKERS: 'techno_speakers',
  GALLERY: 'techno_gallery',
  FAQS: 'techno_faqs',
  SPONSORS: 'techno_sponsors',
  SCHEDULE: 'techno_schedule',
  ANNOUNCEMENTS: 'techno_announcements',
  USERS: 'techno_users',
  REGISTRATIONS: 'techno_registrations',
  SETTINGS: 'techno_settings'
};

// Initialize local storage with mock data
const initializeStorage = (key, data) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(key));
};

// Generic CRUD operations
class CRUDService {
  constructor(storageKey, mockData) {
    this.storageKey = storageKey;
    this.data = initializeStorage(storageKey, mockData);
  }

  async getAll() {
    await delay();
    this.data = JSON.parse(localStorage.getItem(this.storageKey));
    return { data: this.data, error: null };
  }

  async getById(id) {
    await delay();
    this.data = JSON.parse(localStorage.getItem(this.storageKey));
    const item = this.data.find(item => item.id === id);
    return { data: item, error: item ? null : 'Not found' };
  }

  async create(newItem) {
    await delay();
    this.data = JSON.parse(localStorage.getItem(this.storageKey));
    const item = {
      ...newItem,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    this.data.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    return { data: item, error: null };
  }

  async update(id, updates) {
    await delay();
    this.data = JSON.parse(localStorage.getItem(this.storageKey));
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      return { data: null, error: 'Not found' };
    }
    this.data[index] = { ...this.data[index], ...updates, updated_at: new Date().toISOString() };
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    return { data: this.data[index], error: null };
  }

  async delete(id) {
    await delay();
    this.data = JSON.parse(localStorage.getItem(this.storageKey));
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      return { data: null, error: 'Not found' };
    }
    const deleted = this.data.splice(index, 1)[0];
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    return { data: deleted, error: null };
  }
}

// Service instances
export const eventsService = new CRUDService(STORAGE_KEYS.EVENTS, mockEvents);
export const speakersService = new CRUDService(STORAGE_KEYS.SPEAKERS, mockSpeakers);
export const galleryService = new CRUDService(STORAGE_KEYS.GALLERY, mockGallery);
export const faqsService = new CRUDService(STORAGE_KEYS.FAQS, mockFAQs);
export const sponsorsService = new CRUDService(STORAGE_KEYS.SPONSORS, mockSponsors);
export const scheduleService = new CRUDService(STORAGE_KEYS.SCHEDULE, mockSchedule);
export const announcementsService = new CRUDService(STORAGE_KEYS.ANNOUNCEMENTS, mockAnnouncements);
export const usersService = new CRUDService(STORAGE_KEYS.USERS, mockUsers);
export const registrationsService = new CRUDService(STORAGE_KEYS.REGISTRATIONS, mockRegistrations);

// Settings service (single object)
export const settingsService = {
  async get() {
    await delay();
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return { data: settings ? JSON.parse(settings) : mockSettings, error: null };
  },
  
  async update(updates) {
    await delay();
    const current = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const settings = current ? JSON.parse(current) : mockSettings;
    const updated = { ...settings, ...updates };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return { data: updated, error: null };
  }
};

// Image upload simulation
export const uploadImage = async (file) => {
  await delay(1000);
  // In production, this will upload to Supabase Storage
  // For now, create a local URL
  return {
    data: {
      url: URL.createObjectURL(file),
      path: `uploads/${Date.now()}_${file.name}`
    },
    error: null
  };
};

// Export all services
export default {
  events: eventsService,
  speakers: speakersService,
  gallery: galleryService,
  faqs: faqsService,
  sponsors: sponsorsService,
  schedule: scheduleService,
  announcements: announcementsService,
  users: usersService,
  registrations: registrationsService,
  settings: settingsService,
  uploadImage
};

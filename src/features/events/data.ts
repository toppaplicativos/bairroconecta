import {
  eventCategories as legacyEventCategories,
  events as legacyEvents,
} from '@/lib/data';

/** Transitional event catalog boundary for the future Supabase repository. */
export const events = legacyEvents;
export const eventCategories = legacyEventCategories;

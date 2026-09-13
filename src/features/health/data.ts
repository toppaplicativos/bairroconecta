import {
  appointments as legacyAppointments,
  healthProfessionals as legacyHealthProfessionals,
  specialties as legacySpecialties,
} from '@/lib/data';

/**
 * Transitional data boundary for Health.
 * Supabase repositories can replace these exports without coupling route components
 * to the legacy data module.
 */
export const appointments = legacyAppointments;
export const healthProfessionals = legacyHealthProfessionals;
export const specialties = legacySpecialties;

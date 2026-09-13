import {
  serviceListByCategory as legacyServiceListByCategory,
  serviceProviders as legacyServiceProviders,
} from '@/lib/data';

/**
 * Transitional data boundary for Services.
 * Replace these legacy sources with Supabase repositories without changing route components.
 */
export const serviceListByCategory = legacyServiceListByCategory;
export const serviceProviders = legacyServiceProviders;

export function getRecommendedProviders(limit = 6) {
  return serviceProviders.slice(0, limit);
}

export function getServiceCount() {
  return serviceListByCategory.reduce((total, group) => total + group.services.length, 0);
}

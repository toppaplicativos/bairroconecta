import { properties as legacyProperties } from '@/lib/data';

export type { Property } from '@/lib/data';

/**
 * Transitional data boundary for the Properties feature.
 * Replace the legacy adapter here when Supabase repositories are introduced;
 * route components should not import the shared legacy data module directly.
 */
export const properties = legacyProperties;

export function getRecommendedProperties(limit = 2) {
  return properties.slice(0, limit);
}

export function getNearbyProperties(offset = 2, limit = 6) {
  return properties.slice(offset, offset + limit);
}

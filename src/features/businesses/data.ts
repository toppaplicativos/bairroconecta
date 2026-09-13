import { businesses as legacyBusinesses } from '@/lib/data';

export type { Business } from '@/lib/data';

/**
 * Transitional data boundary for Commerce.
 * Supabase repositories can replace this source without changing route components.
 */
export const businesses = legacyBusinesses.filter((business) => business.type === 'business');

export function getTopRatedBusinesses(limit = 4) {
  return [...businesses].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

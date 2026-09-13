export const featureFlags = {
  globalSearch: true,
  aiAssistant: true,
  neighborhoodMap: true,
  professionalArea: true,
  publishing: false,
  realtimeCommunity: false,
  verifiedProfiles: false,
  serviceScheduling: false,
  healthScheduling: false,
  pushNotifications: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(flag: FeatureFlag) {
  return featureFlags[flag];
}

import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1).optional(),
});

const serverEnvSchema = publicEnvSchema.extend({
  GOOGLE_GENAI_API_KEY: z.string().min(1).optional(),
  SUPABASE_DATABASE_URL: z.string().min(1).optional(),
});

export function getPublicEnv() {
  return publicEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  });
}

export function getServerEnv() {
  return serverEnvSchema.parse({
    ...getPublicEnv(),
    GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY,
    SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL,
  });
}

export function getIntegrationReadiness() {
  const env = getServerEnv();
  return {
    supabase: Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    database: Boolean(env.SUPABASE_DATABASE_URL),
    mapbox: Boolean(env.NEXT_PUBLIC_MAPBOX_TOKEN),
    googleAi: Boolean(env.GOOGLE_GENAI_API_KEY),
  };
}

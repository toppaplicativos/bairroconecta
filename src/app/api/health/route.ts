export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    ok: true,
    service: 'bairroconecta-web',
    runtime: 'nextjs',
    timestamp: new Date().toISOString(),
    integrations: {
      supabaseConfigured: Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ),
      databaseConfigured: Boolean(process.env.SUPABASE_DATABASE_URL),
      mapboxConfigured: Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN),
      googleAiConfigured: Boolean(process.env.GOOGLE_GENAI_API_KEY),
    },
  });
}

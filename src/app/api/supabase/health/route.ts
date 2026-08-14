export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabasePublishableKey) {
      return Response.json(
        {
          ok: false,
          backend: 'supabase',
          error: 'Missing Supabase environment variables.',
        },
        { status: 500 }
      );
    }

    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: {
        apikey: supabasePublishableKey,
        Authorization: `Bearer ${supabasePublishableKey}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();

      return Response.json(
        {
          ok: false,
          backend: 'supabase',
          status: response.status,
          error: errorText,
        },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      backend: 'supabase',
      projectUrl: supabaseUrl,
      auth: await response.json(),
      databaseUrlConfigured: Boolean(process.env.SUPABASE_DATABASE_URL),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Supabase health error.';

    return Response.json(
      { ok: false, backend: 'supabase', error: message },
      { status: 500 }
    );
  }
}

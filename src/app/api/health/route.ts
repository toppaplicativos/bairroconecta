import { getIntegrationReadiness } from '@/config/env';
import { product } from '@/config/product';

export const dynamic = 'force-dynamic';

export async function GET() {
  const integrations = getIntegrationReadiness();

  return Response.json(
    {
      ok: true,
      service: 'meu-bairro-web',
      product: product.name,
      runtime: 'nextjs',
      timestamp: new Date().toISOString(),
      integrations,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

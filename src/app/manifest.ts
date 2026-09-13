import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meu Bairro',
    short_name: 'Meu Bairro',
    description: 'A plataforma local para descobrir serviços, comércio, imóveis, comunidade, saúde e serviços públicos do seu bairro.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f8fb',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    categories: ['lifestyle', 'social', 'shopping', 'navigation'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}

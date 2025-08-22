export type Business = {
  id: number;
  imageUrl: string;
  hint: string;
  name: string;
  category: string;
  rating: number;
  latitude: number;
  longitude: number;
  type: 'business' | 'service';
};

export const businesses: Business[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8UmVzdGF1cmFudHxlbnwwfHx8fDE3NTU4NjMzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "cozy restaurant",
    name: "Cantina da Nona",
    category: "Restaurantes",
    rating: 4.8,
    latitude: -23.5513,
    longitude: -46.6625,
    type: 'business',
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "local pharmacy",
    name: "Farmácia Saúde",
    category: "Farmácias",
    rating: 4.5,
    latitude: -23.5612,
    longitude: -46.6563,
    type: 'business',
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "grocery store",
    name: "Mercado do Bairro",
    category: "Mercados",
    rating: 4.3,
    latitude: -23.5478,
    longitude: -46.6459,
    type: 'business',
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "modern salon",
    name: "Salão de Beleza Estilo",
    category: "Salões de Beleza",
    rating: 4.9,
    latitude: -23.558,
    longitude: -46.669,
    type: 'business',
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "pet shop",
    name: "Mundo Pet",
    category: "Pet Shops",
    rating: 4.7,
    latitude: -23.549,
    longitude: -46.638,
    type: 'business',
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "local gym",
    name: "Academia Corpo em Forma",
    category: "Academias",
    rating: 4.6,
    latitude: -23.563,
    longitude: -46.65,
    type: 'business',
  },
];

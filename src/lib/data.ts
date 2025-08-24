
export type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  hint: string;
}

export type Review = {
    id: string;
    author: string;
    avatarUrl: string;
    rating: number;
    comment: string;
}

export type Business = {
  id: number;
  imageUrl: string;
  hint: string;
  name: string;
  category: string;
  rating: number;
  latitude: number;
  longitude: number;
  type: 'business' | 'service' | 'food';
  reviewsCount: number;
  description: string;
  phone: string;
  address: string;
  hours: { day: string; time: string }[];
  gallery: { url: string; hint: string }[];
  products: Product[];
  reviews: Review[];
  deliveryTime?: string;
  deliveryFee?: string;
  promotion?: string;
};

export const businesses: Business[] = [
  {
    id: 1,
    name: "Cantina da Nona",
    category: "Restaurantes",
    type: 'business',
    imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8UmVzdGF1cmFudHxlbnwwfHx8fDE3NTU4NjMzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "cozy restaurant",
    rating: 4.8,
    reviewsCount: 125,
    latitude: -23.5513,
    longitude: -46.6625,
    description: "A autêntica culinária italiana da família para a sua. Massas frescas, molhos artesanais e um ambiente que te abraça. Perfeito para um almoço em família ou um jantar romântico.",
    phone: "(11) 98765-4321",
    address: "Rua das Massas, 123, Bela Vista",
    hours: [
        { day: "Segunda a Sexta", time: "12:00 - 22:00" },
        { day: "Sábado", time: "12:00 - 23:00" },
        { day: "Domingo", time: "12:00 - 16:00" },
    ],
    gallery: [
        { url: "https://placehold.co/600x400.png", hint: "restaurant interior" },
        { url: "https://placehold.co/600x400.png", hint: "plate of pasta" },
        { url: "https://placehold.co/600x400.png", hint: "pizza oven" },
    ],
    products: [
        { id: "p1", name: "Lasanha à Bolonhesa", price: "R$ 59,90", imageUrl: "https://placehold.co/400x400.png", hint: "lasagna" },
        { id: "p2", name: "Fettuccine Alfredo", price: "R$ 54,90", imageUrl: "https://placehold.co/400x400.png", hint: "fettuccine alfredo" },
        { id: "p3", name: "Pizza Margherita", price: "R$ 49,90", imageUrl: "https://placehold.co/400x400.png", hint: "margherita pizza" },
    ],
    reviews: [
        { id: "r1", author: "Carlos S.", avatarUrl: "https://placehold.co/40x40.png", rating: 5, comment: "Melhor massa que já comi em São Paulo! Atendimento impecável." },
        { id: "r2", author: "Ana P.", avatarUrl: "https://placehold.co/40x40.png", rating: 4, comment: "Lugar aconchegante, comida boa. Apenas um pouco demorado no sábado." },
    ],
  },
  {
    id: 2,
    name: "Farmácia Saúde",
    category: "Farmácias",
    type: 'business',
    imageUrl: "https://images.unsplash.com/photo-1597121870960-7b5391b88b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8RmFybWFjaWF8ZW58MHx8fHwxNzU1ODYzNTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "local pharmacy",
    rating: 4.5,
    reviewsCount: 88,
    latitude: -23.5612,
    longitude: -46.6563,
    description: "Sua saúde em primeiro lugar. Oferecemos uma vasta gama de medicamentos, produtos de higiene e perfumaria, além de um atendimento farmacêutico atencioso.",
    phone: "(11) 91234-5678",
    address: "Av. da Saúde, 456, Consolação",
    hours: [
        { day: "Segunda a Sábado", time: "08:00 - 22:00" },
        { day: "Domingo", time: "09:00 - 20:00" },
    ],
    gallery: [
        { url: "https://placehold.co/600x400.png", hint: "pharmacy aisle" },
        { url: "https://placehold.co/600x400.png", hint: "pharmacist portrait" },
    ],
    products: [],
    reviews: [],
  },
  {
    id: 7,
    name: "Roberto \"Alemão\" Silva",
    category: "Eletricista",
    type: 'service',
    imageUrl: "https://images.unsplash.com/photo-1682345262055-8f95f3c513ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxFbGV0cmljaXN0YXxlbnwwfHx8fDE3NTU4NjQyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "man electrician",
    rating: 4.9,
    reviewsCount: 72,
    latitude: -23.555,
    longitude: -46.66,
    description: "Serviços elétricos residenciais e comerciais com segurança e qualidade. Instalações, reparos, manutenção e consultoria. Atendimento rápido e orçamento sem compromisso.",
    phone: "(11) 99999-8888",
    address: "Atende em toda a região",
    hours: [
        { day: "Segunda a Sábado", time: "08:00 - 18:00" },
    ],
    gallery: [],
    products: [],
    reviews: [],
  },
  {
    id: 3,
    name: "Mercado do Bairro",
    category: "Mercados",
    type: 'business',
    imageUrl: "https://placehold.co/600x400.png",
    hint: "grocery store",
    rating: 4.3,
    reviewsCount: 210,
    latitude: -23.5478,
    longitude: -46.6459,
    description: "O seu mercado de confiança com produtos frescos, padaria e açougue.",
    phone: "(11) 92222-3333",
    address: "Rua das Compras, 789, Liberdade",
    hours: [{ day: "Todos os dias", time: "07:00 - 22:00" }],
    gallery: [],
    products: [],
    reviews: [],
  },
  {
    id: 4,
    name: "Salão de Beleza Estilo",
    category: "Salões de Beleza",
    type: 'business',
    imageUrl: "https://placehold.co/600x400.png",
    hint: "modern salon",
    rating: 4.9,
    reviewsCount: 95,
    latitude: -23.558,
    longitude: -46.669,
    description: "Realce sua beleza com nossos especialistas. Cabelo, unhas, maquiagem e tratamentos estéticos.",
    phone: "(11) 94444-5555",
    address: "Alameda da Beleza, 321, Jardins",
    hours: [{ day: "Terça a Sábado", time: "09:00 - 20:00" }],
    gallery: [],
    products: [],
    reviews: [],
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8UHJvZmVzc29yfGVufDB8fHx8MTc1NTg2NDI5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "woman tutor",
    name: "Cláudia Matos",
    category: "Aulas de Reforço (Matemática)",
    rating: 5.0,
    reviewsCount: 43,
    latitude: -23.552,
    longitude: -46.648,
    type: 'service',
    description: "Dificuldades em matemática? Aulas particulares e de reforço para ensino fundamental e médio. Metodologia focada em resultados.",
    phone: "(11) 96666-7777",
    address: "Aulas online ou na casa do aluno",
    hours: [{ day: "Segunda a Sexta", time: "14:00 - 19:00" }],
    gallery: [],
    products: [],
    reviews: [],
  },
];


export const foodBusinesses: Business[] = [
  {
    ...businesses[0],
    id: 101,
    type: 'food',
    deliveryTime: "30-45 min",
    deliveryFee: "R$ 5,99",
  },
  {
    id: 102,
    name: "Burger do Zé",
    category: "Lanches",
    type: 'food',
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxCdXJnZXJ8ZW58MHx8fHwxNzU1OTIzMjMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "delicious burger",
    rating: 4.9,
    reviewsCount: 250,
    latitude: -23.5525,
    longitude: -46.6630,
    description: "O hambúrguer artesanal que vai te surpreender. Ingredientes frescos e combinações incríveis. Pão selado na manteiga e carne no ponto certo.",
    phone: "(11) 95555-1234",
    address: "Praça da Matriz (Food Truck)",
    hours: [{ day: "Quarta a Domingo", time: "18:00 - 23:00" }],
    gallery: [],
    products: [],
    reviews: [],
    deliveryTime: "25-40 min",
    deliveryFee: "Grátis",
    promotion: "Combo X-Tudo + Batata + Refri por R$ 29,90",
  },
  {
    id: 103,
    name: "Dona Maria - Marmitas",
    category: "Marmitas",
    type: 'food',
    imageUrl: "https://placehold.co/600x400.png",
    hint: "brazilian lunch box",
    rating: 4.7,
    reviewsCount: 180,
    latitude: -23.5490,
    longitude: -46.6500,
    description: "Comida caseira de verdade, feita com amor e entregue na sua casa. Cardápio variado todos os dias, com opção vegetariana.",
    phone: "(11) 94444-5566",
    address: "Apenas Delivery",
    hours: [{ day: "Segunda a Sábado", time: "11:00 - 15:00" }],
    gallery: [],
    products: [],
    reviews: [],
    deliveryTime: "40-55 min",
    deliveryFee: "R$ 7,00",
  },
   {
    id: 104,
    name: "Açaí do Bairro",
    category: "Açaí",
    type: 'food',
    imageUrl: "https://placehold.co/600x400.png",
    hint: "acai bowl",
    rating: 4.8,
    reviewsCount: 150,
    latitude: -23.5595,
    longitude: -46.6580,
    description: "O melhor açaí da região, com os mais variados acompanhamentos. Monte do seu jeito!",
    phone: "(11) 93333-2211",
    address: "Rua das Palmeiras, 50, Loja 3",
    hours: [{ day: "Todos os dias", time: "14:00 - 22:00" }],
    gallery: [],
    products: [],
    reviews: [],
    deliveryTime: "20-30 min",
    deliveryFee: "R$ 4,50",
    promotion: "Açaí 500ml com 3 adicionais por R$ 20,00",
  },
];


export const classifiedAds = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxCaWtlfGVufDB8fHx8MTc1NTg2NjcxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "bicycle",
    title: "Bicicleta Caloi 10, seminova",
    price: "R$ 450,00",
    seller: "João Pereira",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxTb2YlQzMlQTElMjB8ZW58MHx8fHwxNzU1ODY2NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "sofa",
    title: "Sofá 3 lugares, bom estado",
    price: "R$ 300,00",
    seller: "Maria Oliveira",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "guitar",
    title: "Violão Giannini - Troco por teclado",
    price: "Troca",
    seller: "Pedro Martins",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "video game",
    title: "Videogame PS4 com 2 controles",
    price: "R$ 1.200,00",
    seller: "Fernanda Lima",
  },
   {
    id: 5,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "baby stroller",
    title: "Carrinho de bebê",
    price: "Doação",
    seller: "Família Silva",
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "books",
    title: "Coleção de livros de ficção científica",
    price: "R$ 150,00",
    seller: "Ricardo Alves",
  },
];

export const events = [
  {
    id: 1,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "local fair",
    title: "Feira de Artesanato Local",
    date: "25 de Julho, 2024",
    location: "Praça da Matriz",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "live music",
    title: "Show de Rock no Coreto",
    date: "27 de Julho, 2024",
    location: "Parque Central",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "outdoor cinema",
    title: "Cinema ao Ar Livre: Clássicos dos Anos 80",
    date: "28 de Julho, 2024",
    location: "Campo de Futebol do Bairro",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "food festival",
    title: "Festival Gastronômico de Inverno",
    date: "02 de Agosto, 2024",
    location: "Rua Gastronômica",
  },
];

export type Specialty = {
  name: string;
  icon: string;
};

export const specialties: Specialty[] = [
  { name: "Clínica Geral", icon: "Stethoscope" },
  { name: "Odontologia", icon: "Tooth" },
  { name: "Pediatria", icon: "Baby" },
  { name: "Psicologia", icon: "Brain" },
  { name: "Ortopedia", icon: "Bone" },
  { name: "Outros", icon: "PlusCircle" },
]

export const healthProfessionals = [
  {
    id: 201,
    name: "Dr. Carlos Andrade",
    specialty: "Clínico Geral",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkb2N0b3J8ZW58MHx8fHwxNzU2MjMzOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "male doctor",
    rating: 4.9,
  },
  {
    id: 202,
    name: "Dra. Lúcia Guimarães",
    specialty: "Odontologia",
    imageUrl: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxkb2N0b3J8ZW58MHx8fHwxNzU2MjMzOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "female doctor",
    rating: 5.0,
  },
  {
    id: 203,
    name: "Dr. Marcos Rocha",
    specialty: "Pediatria",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxkb2N0b3J8ZW58MHx8fHwxNzU2MjMzOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "male pediatrician",
    rating: 4.8,
  },
];

export const appointments = [
  {
    id: 1,
    doctor: "Dr. Carlos Andrade",
    specialty: "Clínico Geral",
    date: "15/08/2024",
    time: "10:30",
    status: "Confirmado",
  },
  {
    id: 2,
    doctor: "Dra. Lúcia Guimarães",
    specialty: "Odontologia",
    date: "22/08/2024",
    time: "14:00",
    status: "Confirmado",
  },
];

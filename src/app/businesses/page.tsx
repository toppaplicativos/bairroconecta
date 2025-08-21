import MainLayout from "@/components/main-layout";
import BusinessCard from "@/components/business-card";

const businesses = [
  {
    id: 1,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "cozy restaurant",
    name: "Cantina da Nona",
    category: "Restaurantes",
    rating: 4.8,
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "local pharmacy",
    name: "Farmácia Saúde",
    category: "Farmácias",
    rating: 4.5,
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "grocery store",
    name: "Mercado do Bairro",
    category: "Mercados",
    rating: 4.3,
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "modern salon",
    name: "Salão de Beleza Estilo",
    category: "Salões de Beleza",
    rating: 4.9,
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "pet shop",
    name: "Mundo Pet",
    category: "Pet Shops",
    rating: 4.7,
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "local gym",
    name: "Academia Corpo em Forma",
    category: "Academias",
    rating: 4.6,
  },
];

export default function BusinessesPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Comércio Local</h1>
        <p className="text-muted-foreground">Descubra e apoie os negócios do seu bairro.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

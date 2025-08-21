import MainLayout from "@/components/main-layout";
import PropertyCard from "@/components/property-card";

const properties = [
  {
    id: 1,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "modern apartment",
    price: "R$ 2.500/mês",
    address: "Rua das Flores, 123, Vila Madalena",
    bedrooms: 2,
    bathrooms: 2,
    area: "75m²",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "cozy house",
    price: "R$ 1.200.000",
    address: "Av. Paulista, 500, Bela Vista",
    bedrooms: 3,
    bathrooms: 3,
    area: "150m²",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "studio apartment",
    price: "R$ 1.800/mês",
    address: "Rua Augusta, 900, Consolação",
    bedrooms: 1,
    bathrooms: 1,
    area: "40m²",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "luxury penthouse",
    price: "R$ 5.000.000",
    address: "Rua Oscar Freire, 200, Jardins",
    bedrooms: 4,
    bathrooms: 5,
    area: "300m²",
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "suburban home",
    price: "R$ 850.000",
    address: "Alameda dos Pássaros, 45, Moema",
    bedrooms: 3,
    bathrooms: 2,
    area: "120m²",
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "commercial property",
    price: "R$ 7.000/mês",
    address: "Av. Faria Lima, 1500, Itaim Bibi",
    bedrooms: 0,
    bathrooms: 2,
    area: "200m²",
  },
];

export default function PropertiesPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Imóveis no Bairro</h1>
        <p className="text-muted-foreground">Encontre casas e apartamentos para alugar e comprar.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

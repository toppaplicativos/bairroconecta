import MainLayout from "@/components/main-layout";
import ServiceCard from "@/components/service-card";

const serviceProviders = [
  {
    id: 1,
    avatarUrl: "https://images.unsplash.com/photo-1682345262055-8f95f3c513ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxFbGV0cmljaXN0YXxlbnwwfHx8fDE3NTU4NjQyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "man electrician",
    name: "Roberto \"Alemão\" Silva",
    service: "Eletricista",
    rating: 4.9,
    reviews: 85,
  },
  {
    id: 2,
    avatarUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8UHJvZmVzc29yfGVufDB8fHx8MTc1NTg2NDI5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "woman tutor",
    name: "Cláudia Matos",
    service: "Aulas de Reforço (Matemática)",
    rating: 5.0,
    reviews: 42,
  },
  {
    id: 3,
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "woman cleaning",
    name: "Dona Maria da Limpeza",
    service: "Serviços de Limpeza",
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 4,
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "man dog walker",
    name: "Fernando Passeador",
    service: "Passeador de Cães",
    rating: 4.9,
    reviews: 67,
  },
    {
    id: 5,
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "man plumber",
    name: "José Encanador",
    service: "Encanador e Reparos Rápidos",
    rating: 4.7,
    reviews: 91,
  },
    {
    id: 6,
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "woman seamstress",
    name: "Ateliê da Vizinhança",
    service: "Costureira - Reparos e Ajustes",
    rating: 5.0,
    reviews: 75,
  },
];

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Serviços no Bairro</h1>
        <p className="text-muted-foreground">Encontre profissionais de confiança na sua vizinhança.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceProviders.map((provider) => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

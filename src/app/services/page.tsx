import MainLayout from "@/components/main-layout";
import ServiceCard from "@/components/service-card";
import { businesses } from "@/lib/data";


export default function ServicesPage() {
  const serviceProviders = businesses.filter(b => b.type === 'service');

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

import MainLayout from "@/components/main-layout";
import BusinessCard from "@/components/business-card";
import { businesses } from "@/lib/data";


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

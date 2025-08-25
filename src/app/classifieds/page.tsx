
import MainLayout from "@/components/main-layout";
import ClassifiedCard from "@/components/classified-card";
import { classifiedAds } from "@/lib/data";

export default function ClassifiedsPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Classificados do Bairro</h1>
        <p className="text-muted-foreground">Compre, venda e troque com seus vizinhos.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {classifiedAds.map((ad) => (
            <ClassifiedCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

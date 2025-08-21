import MainLayout from "@/components/main-layout";
import InteractiveMap from "@/components/interactive-map";
import { businesses } from "@/lib/data";

export default function MapPage() {
  return (
    <MainLayout>
        <div className="flex-1 flex flex-col">
             <div className="p-4 md:p-8 border-b">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Mapa Interativo</h1>
                <p className="text-muted-foreground">Explore os negócios e serviços no seu bairro.</p>
            </div>
            <div className="flex-1 relative">
               <InteractiveMap businesses={businesses} />
            </div>
        </div>
    </MainLayout>
  );
}

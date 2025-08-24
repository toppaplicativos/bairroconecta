
'use client';
import MainLayout from "@/components/main-layout";
import ServiceCard from "@/components/service-card";
import { businesses } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  const serviceProviders = businesses.filter(b => b.type === 'service');

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Serviços no Bairro</h1>
            <p className="text-muted-foreground">Encontre profissionais de confiança na sua vizinhança.</p>
        </div>

        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Qual serviço você precisa?" className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>
        
        <Card className="relative overflow-hidden bg-primary/10 border-primary/20">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left z-10">
                    <p className="text-sm font-bold text-primary uppercase">Popular</p>
                    <h2 className="text-2xl font-bold font-headline">Contrate um Profissional</h2>
                    <p className="text-muted-foreground">Precisa de ajuda com fiação, reparos ou instalações?</p>
                    <Button className="mt-2">Agende Agora</Button>
                </div>
                 <div className="relative h-32 w-48 md:h-full md:w-56 z-10">
                   <Image src="https://i.postimg.cc/QdGkYp6K/servicos-hero.png" alt="Homem de serviço" layout="fill" objectFit="contain" />
                </div>
            </CardContent>
        </Card>

        <div>
            <h3 className="text-xl font-bold font-headline mb-4">Nossos Serviços</h3>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {serviceProviders.map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
        </div>

      </div>
    </MainLayout>
  );
}

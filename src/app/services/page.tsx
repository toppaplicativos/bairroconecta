
'use client';
import MainLayout from "@/components/main-layout";
import { serviceListByCategory, serviceProviders } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import React, { useMemo } from "react";
import Link from "next/link";
import { normalizeString } from "@/lib/utils";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ServiceCard from "@/components/service-card";
import ProviderCard from "@/components/provider-card";

export default function ServicesPage() {
  const recommendedProviders = useMemo(() => serviceProviders.slice(0, 5), []);

  return (
    <MainLayout currentMode="services">
      <div className="flex-1 space-y-8 p-4 md:p-6 bg-orange-50/50" style={{'--primary': 'hsl(45, 100%, 50%)', '--primary-foreground': 'hsl(45, 100%, 10%)'} as React.CSSProperties}>
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Qual serviço você precisa?" className="pl-10 bg-white shadow-sm border-0" />
            </div>
            <Button variant="outline" size="icon" className="bg-white shadow-sm border-0">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>

        <Card className="relative w-full h-48 rounded-2xl overflow-hidden text-white p-6 flex flex-col justify-between bg-primary shadow-lg">
             <Image src="https://i.postimg.cc/tJdY0rKK/hire-banner.png" layout="fill" objectFit="cover" alt="Contrate um Profissional" />
             <div className="absolute inset-0 bg-black/20" />
             <div className="relative z-10">
                <p className="font-semibold bg-white/20 px-2 py-0.5 rounded-full inline-block text-xs">Popular</p>
                <h2 className="text-2xl font-bold font-headline mt-2">Contrate um Profissional</h2>
                <p className="text-sm max-w-xs">Precisa de ajuda com reparos ou instalações?</p>
             </div>
             <div className="relative z-10 self-start">
                <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">Agendar Serviço</Button>
             </div>
        </Card>
        
        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold font-headline">Profissionais Recomendados</h2>
            </div>
             <Carousel opts={{ align: "start" }} className="-mx-2">
                <CarouselContent>
                    {recommendedProviders.map((provider) => (
                        <CarouselItem key={provider.id} className="basis-4/5 md:basis-1/2 lg:basis-1/3 pl-4">
                            <ProviderCard provider={provider} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>


        <div className="space-y-8">
            {serviceListByCategory.map(({ category, icon, services }) => {
                const categorySlug = normalizeString(category);
                return (
                    <div key={category}>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold font-headline">{category}</h2>
                            <Link href={`/services/${categorySlug}`} className="text-sm font-semibold text-amber-600 flex items-center gap-1">
                                Ver todos <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <Carousel opts={{ align: "start" }}>
                            <CarouselContent>
                                {services.slice(0, 6).map((service) => (
                                <CarouselItem key={service} className="basis-2/3 md:basis-1/3 lg:basis-1/4">
                                     <ServiceCard service={service} categorySlug={categorySlug} />
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                             <CarouselPrevious className="hidden md:flex" />
                             <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    </div>
                );
            })}
        </div>
      </div>
    </MainLayout>
  );
}

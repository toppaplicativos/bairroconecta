
'use client';
import MainLayout from "@/components/main-layout";
import ServiceCard from "@/components/service-card";
import { serviceProviders, serviceListByCategory } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, Settings2, Wrench, Plug } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from "react";
import Link from "next/link";

const filterTags = ["All", "Booked", "Electricians", "Agents"];
const serviceTags = [
    { name: "Repairing", icon: Wrench },
    { name: "Installation", icon: Settings2 },
    { name: "Rewiring", icon: Plug },
]

export default function ServicesPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-6 bg-orange-50/50">
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="What service do you need?" className="pl-10 bg-white shadow-sm border-0" />
            </div>
            <Button variant="outline" size="icon" className="bg-white shadow-sm border-0">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>
        
         <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden">
                    <Image src="https://i.postimg.cc/QdGkYp6K/servicos-hero.png" alt="Homem de serviço" layout="fill" objectFit="cover" className="z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                         <p className="text-xs font-bold uppercase bg-white/30 text-white px-2 py-1 rounded-full inline-block">Popular</p>
                        <h2 className="text-2xl font-bold font-headline mt-2">Hire a Service Man</h2>
                        <p className="text-sm">Need help with wiring, repairs or installations?</p>
                        <Button className="mt-4 bg-orange-400 hover:bg-orange-500 text-white shadow-lg">Book Now</Button>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden">
                    <Image src="https://placehold.co/800x400.png" data-ai-hint="plumber working" alt="Encanador trabalhando" layout="fill" objectFit="cover" className="z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                     <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                         <p className="text-xs font-bold uppercase bg-white/30 text-white px-2 py-1 rounded-full inline-block">20% OFF</p>
                        <h2 className="text-2xl font-bold font-headline mt-2">Plumbing Services</h2>
                        <p className="text-sm">Leaking pipes? We fix it fast!</p>
                        <Button className="mt-4 bg-orange-400 hover:bg-orange-500 text-white shadow-lg">Get a Quote</Button>
                    </div>
                </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>


        <div>
            {serviceListByCategory.map(({ category, services }) => {
                const providersForCategory = serviceProviders.filter(p => p.category === category);
                if (providersForCategory.length === 0) return null;

                return (
                    <div key={category} className="mb-8">
                        <h3 className="text-xl font-bold font-headline mb-4">{category}</h3>
                        <Carousel opts={{ align: "start" }} className="w-full">
                            <CarouselContent className="-ml-2">
                                {providersForCategory.map((provider) => (
                                    <CarouselItem key={provider.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2">
                                        <ServiceCard provider={provider} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    </div>
                )
            })}
        </div>

        <Card className="text-center">
            <CardContent className="p-6">
                <h3 className="text-lg font-bold font-headline">Você é um prestador de serviço?</h3>
                <p className="text-muted-foreground text-sm mt-2">Junte-se à nossa plataforma e seja encontrado por milhares de clientes no seu bairro.</p>
                <Link href="/services/register">
                    <Button className="mt-4">Cadastre-se Agora</Button>
                </Link>
            </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}

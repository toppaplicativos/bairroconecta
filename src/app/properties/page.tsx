
'use client';
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowRight, Building, Home as HomeIcon, Building2, LandPlot } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import PropertyCard from "@/components/property-card";
import { properties } from "@/lib/data";
import { useMemo } from "react";

const propertyCategories = [
    { name: "Casa", icon: HomeIcon, href: "#" },
    { name: "Apartamento", icon: Building, href: "#" },
    { name: "Terreno", icon: LandPlot, href: "#" },
    { name: "Comercial", icon: Building2, href: "#" },
]

export default function PropertiesPage() {

  const recommendedProperties = useMemo(() => properties.slice(0, 2), []);
  const nearbyProperties = useMemo(() => properties.slice(2, 5), []);

  return (
    <MainLayout currentMode="properties">
      <div className="flex-1 space-y-6 p-4 md:p-6" style={{'--primary': 'hsl(221, 83%, 53%)'} as React.CSSProperties}>
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Pesquisar..." className="pl-10 shadow-sm bg-white border-gray-200" />
            </div>
            <Button size="icon" className="shadow-sm flex-shrink-0 bg-primary hover:bg-primary/90">
                <SlidersHorizontal className="h-5 w-5 text-white" />
            </Button>
        </div>

        <div>
             <div className="grid grid-cols-4 gap-3 text-center">
                {propertyCategories.map(category => (
                    <Link href={category.href} key={category.name}>
                        <div className="flex flex-col items-center justify-center gap-2">
                             <Card className="p-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border-0 shadow-sm hover:bg-blue-200 transition-colors">
                                <category.icon className="h-8 w-8 text-primary" />
                            </Card>
                            <p className="text-xs font-semibold text-muted-foreground">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Imóveis Recomendados</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <Carousel opts={{ align: "start" }} className="-mx-2">
                <CarouselContent className="">
                    {recommendedProperties.map((property) => (
                        <CarouselItem key={property.id} className="basis-4/5 md:basis-1/2 pl-4">
                            <PropertyCard property={property} variant="large" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        
        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Imóveis Próximos</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
             <div className="space-y-3">
                 {nearbyProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} variant="small" />
                ))}
             </div>
        </div>

      </div>
    </MainLayout>
  );
}

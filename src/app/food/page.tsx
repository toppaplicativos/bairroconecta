
'use client';
import MainLayout from "@/components/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, Pizza, Sandwich, Cake, IceCream, Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { foodBusinesses } from "@/lib/data";
import RestaurantCard from "@/components/restaurant-card";


const categories = [
    { name: "Restaurantes", icon: UtensilsCrossed, href: "#" },
    { name: "Lanches", icon: Sandwich, href: "#" },
    { name: "Pizza", icon: Pizza, href: "#" },
    { name: "Doces & Bolos", icon: Cake, href: "#" },
    { name: "Sorvetes", icon: IceCream, href: "#" },
    { name: "Cafeterias", icon: Coffee, href: "#" },
]

export default function FoodPage() {
  const promotions = foodBusinesses.filter(b => b.promotion);
  const famous = foodBusinesses.sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Alimentação</h1>
          <p className="text-muted-foreground">Peça dos melhores lugares do bairro, da lanchonete ao restaurante.</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {categories.map(category => (
                <Link href={category.href} key={category.name}>
                    <Card className="p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors h-full">
                        <category.icon className="h-8 w-8 text-primary" />
                        <p className="text-xs font-semibold">{category.name}</p>
                    </Card>
                </Link>
            ))}
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
                 <div className="relative h-40 md:h-48 w-full bg-primary/20 rounded-lg overflow-hidden flex items-center justify-center">
                    <Image src="https://i.postimg.cc/k47g2V1D/banner-food-1.png" alt="Banner de promoção 1" layout="fill" objectFit="cover" />
                </div>
            </CarouselItem>
             <CarouselItem>
                 <div className="relative h-40 md:h-48 w-full bg-secondary/20 rounded-lg overflow-hidden flex items-center justify-center">
                     <Image src="https://i.postimg.cc/tJ7c6Cq6/banner-food-2.png" alt="Banner de promoção 2" layout="fill" objectFit="cover" />
                </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>


        {promotions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Promoções no Bairro</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {promotions.map((business) => (
                    <CarouselItem key={business.id} className="basis-4/5 md:basis-1/3 lg:basis-1/4">
                        <RestaurantCard business={business} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                 <CarouselPrevious className="hidden md:flex" />
                 <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        )}

         <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Famosos no Bairro</h2>
             <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {famous.map((business) => (
                    <CarouselItem key={business.id} className="basis-4/5 md:basis-1/3 lg:basis-1/4">
                        <RestaurantCard business={business} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>

      </div>
    </MainLayout>
  );
}

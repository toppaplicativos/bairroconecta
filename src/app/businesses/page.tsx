
'use client';
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowRight, Tag, ShoppingBag, Shirt, Watch, Armchair, Pizza } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { classifiedAds, businesses } from "@/lib/data";
import ClassifiedCard from "@/components/classified-card";
import Link from "next/link";
import BusinessCard from "@/components/business-card";

const categories = [
    { name: "Moda", icon: Shirt, href: "#" },
    { name: "Restaurantes", icon: Pizza, href: "#" },
    { name: "Eletrônicos", icon: Watch, href: "#" },
    { name: "Móveis", icon: Armchair, href: "#" },
    { name: "Supermercados", icon: ShoppingBag, href: "#" },
    { name: "Outros", icon: Tag, href: "#" },
]

const PromotionCard = () => (
    <div className="relative w-full h-40 rounded-2xl overflow-hidden text-white p-6 flex flex-col justify-between bg-primary">
         <Image src="https://i.postimg.cc/mD7t8s4L/promo-banner.png" layout="fill" objectFit="cover" alt="Promoção" />
    </div>
);


export default function BusinessesPage() {
  const businessItems = businesses.filter(b => b.type === 'business').slice(0, 4);

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Buscar em Comércios..." className="pl-10 bg-card border-border" />
            </div>
            <Button variant="outline" size="icon" className="bg-card border-border flex-shrink-0">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>

        <div>
            <Carousel opts={{ loop: true }}>
                <CarouselContent>
                    <CarouselItem><PromotionCard /></CarouselItem>
                    <CarouselItem><PromotionCard /></CarouselItem>
                </CarouselContent>
                 <CarouselPrevious className="left-2 hidden md:flex" />
                 <CarouselNext className="right-2 hidden md:flex" />
            </Carousel>
        </div>

        <div>
             <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Categorias</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todas <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                {categories.map(category => (
                    <Link href={category.href} key={category.name}>
                        <Card className="p-3 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors h-full aspect-square">
                            <category.icon className="h-7 w-7 text-primary" />
                            <p className="text-xs font-semibold">{category.name}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Lojas em Destaque</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todas <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {businessItems.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                ))}
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Novos Classificados</h2>
                <Link href="/classifieds" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-2">
                    {classifiedAds.slice(0,5).map((ad) => (
                        <CarouselItem key={ad.id} className="basis-2/3 md:basis-1/3 lg:basis-1/4 pl-2">
                             <ClassifiedCard ad={ad} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

      </div>
    </MainLayout>
  );
}


'use client';
import MainLayout from "@/components/main-layout";
import ClassifiedCard from "@/components/classified-card";
import { classifiedAds, classifiedCategories } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function ClassifiedsPage() {
  const recommendations = classifiedAds.slice(0, 4);

  return (
    <MainLayout currentMode="classifieds">
      <div className="flex-1 flex flex-col" style={{'--primary': 'hsl(174, 100%, 29%)'} as React.CSSProperties}>
        {/* Header */}
        <div className="p-4 md:p-6 bg-muted">
           <div className="mt-4 flex gap-3 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Pesquise aqui..." className="pl-10 bg-card border-border" />
                </div>
                <Button variant="outline" className="bg-card border-border flex-shrink-0">
                    <SlidersHorizontal className="h-5 w-5" />
                </Button>
            </div>
        </div>
        
        <div className="p-4 md:p-6 space-y-6">
            {/* Categories */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold font-headline">Navegue pelas categorias</h2>
                </div>
                 <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="-ml-2">
                        {classifiedCategories.map(category => (
                            <CarouselItem key={category.name} className="basis-1/3 sm:basis-1/4 md:basis-1/5 pl-2">
                                <Link href={category.href} >
                                    <Card className="p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors h-full aspect-square shadow-sm">
                                        <category.icon className="h-8 w-8 text-primary" />
                                        <p className="text-xs font-semibold text-center">{category.name}</p>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Recommendations */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold font-headline">Recomendações recentes</h2>
                     <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                        Ver mais <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendations.map((ad) => (
                    <ClassifiedCard key={ad.id} ad={ad} />
                ))}
                </div>
            </div>
        </div>
      </div>
    </MainLayout>
  );
}

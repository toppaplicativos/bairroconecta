
'use client';
import MainLayout from "@/components/main-layout";
import EventCard from "@/components/event-card";
import { events, eventCategories } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function EventsPage() {
  return (
    <MainLayout currentMode="events">
      <div className="flex-1 space-y-6 p-4 md:p-6" style={{'--primary': 'hsl(25, 95%, 53%)'} as React.CSSProperties}>

        <div className="flex gap-3 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Buscar Eventos, Organizadores..." className="pl-10 shadow-sm border-0" />
            </div>
            <Button variant="default" size="icon" className="shadow-sm flex-shrink-0 bg-primary hover:bg-primary/90">
                <SlidersHorizontal className="h-5 w-5 text-white" />
            </Button>
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Categorias</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todas <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
                {eventCategories.map(category => (
                    <Link href="#" key={category.name}>
                        <div className="flex flex-col items-center justify-center gap-2">
                             <Card className="p-4 flex items-center justify-center w-full aspect-square rounded-2xl bg-orange-100 border-0 shadow-sm hover:bg-orange-200 transition-colors">
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
                <h2 className="text-xl font-bold font-headline">Próximos Eventos</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-4">
                    {events.map((event) => (
                        <CarouselItem key={event.id} className="basis-4/5 md:basis-1/3 pl-4">
                            <EventCard event={event} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        
        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold font-headline">Eventos Próximos</h2>
                 <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1">
                    Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
             <div className="space-y-3">
                 {events.slice(0, 2).map((event) => (
                    <EventCard key={event.id} event={event} variant="small" />
                ))}
             </div>
        </div>
      </div>
    </MainLayout>
  );
}

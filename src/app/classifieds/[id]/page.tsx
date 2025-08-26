
'use client';

import { useParams, useRouter } from 'next/navigation';
import { classifiedAds } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  MoreVertical,
  MessageSquare,
  Phone,
  MapPin,
  Star,
  Gauge,
  Calendar,
  User,
  Palette,
  GitCommitHorizontal,
  Fuel,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '@/components/main-layout';

const iconMap: { [key: string]: React.ElementType } = {
  combustivel: Fuel,
  cambio: GitCommitHorizontal,
  kmRodado: Gauge,
  anunciadoEm: Calendar,
  dono: User,
  cor: Palette,
};

export default function ClassifiedDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const ad = useMemo(() => classifiedAds.find((a) => a.id.toString() === id), [id]);

  if (!ad) {
    return (
      <MainLayout currentMode='classifieds' headerType='detail' headerTitle='Item não encontrado'>
        <div className="bg-background min-h-screen">
             <div className="relative h-64 w-full bg-muted">
                <Skeleton className="h-full w-full" />
             </div>
             <div className="p-4 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-10 w-1/2" />
                <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
             </div>
        </div>
      </MainLayout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  const characteristics = Object.entries(ad.caracteristicas || {});

  return (
     <MainLayout currentMode='classifieds' headerType='detail' headerTitle='Detalhes do Item'>
        <div className="relative min-h-screen bg-background" style={{'--primary': 'hsl(174, 100%, 29%)'} as React.CSSProperties}>
            <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50" onClick={() => router.back()}>
                    <ChevronLeft />
                </Button>
                <h1 className="text-lg font-bold text-white">Detalhes do Item</h1>
                <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50">
                    <MoreVertical />
                </Button>
            </header>

            <Carousel className="w-full">
                <CarouselContent>
                    {/* In a real app, you would map over multiple images */}
                    <CarouselItem>
                        <div className="relative h-72 w-full">
                            <Image src={ad.imagem} alt={ad.titulo} layout="fill" objectFit="cover" />
                        </div>
                    </CarouselItem>
                     <CarouselItem>
                        <div className="relative h-72 w-full">
                            <Image src={ad.imagem} alt={ad.titulo} layout="fill" objectFit="cover" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                {/* Indicators would go here */}
            </Carousel>

            <main className="p-4 space-y-6 pb-28">
                <Card className="shadow-none border-0 p-0 m-0 bg-transparent">
                    <CardContent className="p-0">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                 <Avatar className="w-12 h-12 border-2 border-primary">
                                    <AvatarFallback>{ad.nomeVendedor?.charAt(0)}</AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <h2 className="text-xl font-bold font-headline">{ad.titulo}</h2>
                                    <div className="flex items-center gap-1.5">
                                        <p className="font-semibold">{ad.nomeVendedor}</p>
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-bold">{ad.avaliacao}</span>
                                    </div>
                                 </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{ad.localizacao}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <div>
                    <p className="text-3xl font-bold">{formatPrice(ad.preco)}</p>
                </div>

                {characteristics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                        {characteristics.map(([key, value]) => {
                            const Icon = iconMap[key];
                            return (
                                <Card key={key} className="p-3 text-center bg-muted/50 border-0">
                                    <CardContent className="p-0 flex flex-col items-center gap-1">
                                        {Icon && <Icon className="h-6 w-6 text-primary" />}
                                        <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                        <p className="text-sm font-bold">{value}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
                
                <div>
                    <h3 className="text-lg font-bold font-headline mb-2">Descrição</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{ad.descricao}</p>
                </div>

            </main>
          
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t flex items-center gap-4 z-30">
                <Button size="lg" variant="outline" className="flex-1 h-14 text-base">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Conversar
                </Button>
                <Button size="lg" className="flex-1 h-14 text-base bg-primary hover:bg-primary/90">
                    <Phone className="mr-2 h-5 w-5" />
                    Ligar
                </Button>
            </footer>
        </div>
     </MainLayout>
  );
}

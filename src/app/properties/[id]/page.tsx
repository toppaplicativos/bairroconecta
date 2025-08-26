
'use client';
import { useParams, useRouter } from 'next/navigation';
import { properties } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  BedDouble,
  Bath,
  Combine,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/main-layout';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const property = properties.find((e) => e.id.toString() === id);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { toast } = useToast();

  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center">
        Imóvel não encontrado
      </div>
    );
  }

  const handleBookNow = () => {
    toast({
      title: 'Funcionalidade em Breve!',
      description: 'A reserva de imóveis estará disponível em breve.',
    });
  };

  const truncatedDescription =
    property.descricao.length > 150
      ? `${property.descricao.substring(0, 150)}...`
      : property.descricao;

  const galleryImages = [
    property.imagem,
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=400',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    'https://images.unsplash.com/photo-1605276374104-5de67d219b08?w=400',
  ];
  
  const [mainImage, setMainImage] = useState(galleryImages[0]);


  return (
     <MainLayout currentMode="properties" headerType='detail' headerTitle={property.titulo}>
      <div className="relative min-h-screen" style={{'--primary': 'hsl(221, 83%, 53%)'} as React.CSSProperties}>
        {/* PropertyHero */}
        <div className="relative h-[50vh] w-full bg-muted">
          <Image
            src={mainImage}
            alt={property.titulo}
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-12 left-4 z-10 hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 text-foreground hover:bg-white"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-12 right-4 z-10 hidden md:flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 text-foreground hover:bg-white"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 text-foreground hover:bg-white"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-0 right-0 px-4">
              <div className="flex justify-center gap-2">
                   {galleryImages.slice(0, 5).map((img, index) => (
                      <div 
                          key={index}
                          className={cn(
                              "relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2",
                              mainImage === img ? "border-primary" : "border-transparent"
                          )}
                          onClick={() => setMainImage(img)}
                      >
                           <Image src={img} alt={`Thumbnail ${index+1}`} layout="fill" objectFit="cover" />
                            {index === 4 && galleryImages.length > 5 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                                  + {galleryImages.length - 5}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
        </div>

        {/* PropertyDetailsCard */}
        <div className="relative -mt-8 rounded-t-3xl bg-background p-6 space-y-6 z-20 pb-28">
          <div className="flex justify-between items-center">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              {property.tipo}
            </Badge>
             <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-gray-800">{property.avaliacao}</span>
              <span className="text-xs text-muted-foreground">({property.numeroAvaliacoes} avaliações)</span>
            </div>
          </div>

          <div>
              <h1 className="text-2xl font-bold font-headline">{property.titulo}</h1>
              <p className="text-muted-foreground mt-1">{property.endereco}</p>
          </div>

          <Tabs defaultValue="sobre" className="w-full">
              <TabsList>
                  <TabsTrigger value="sobre">Sobre</TabsTrigger>
                  <TabsTrigger value="galeria">Galeria</TabsTrigger>
                  <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              </TabsList>
              <TabsContent value="sobre" className="pt-4 space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                          <BedDouble className="h-6 w-6 text-primary mx-auto"/>
                          <p className="text-sm font-semibold mt-1">{property.quarto} Quartos</p>
                      </div>
                       <div className="p-3 bg-muted rounded-lg">
                          <Bath className="h-6 w-6 text-primary mx-auto"/>
                          <p className="text-sm font-semibold mt-1">{property.banheiro} Banheiros</p>
                      </div>
                       <div className="p-3 bg-muted rounded-lg">
                          <Combine className="h-6 w-6 text-primary mx-auto"/>
                          <p className="text-sm font-semibold mt-1">{property.area} m²</p>
                      </div>
                  </div>

                  <div>
                      <h3 className="text-lg font-bold font-headline">Descrição</h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {showFullDescription ? property.descricao : truncatedDescription}
                          {property.descricao.length > 150 && (
                          <button
                              onClick={() => setShowFullDescription(!showFullDescription)}
                              className="text-primary font-semibold ml-1"
                          >
                              {showFullDescription ? 'Ler menos' : 'Ler mais'}
                          </button>
                          )}
                      </p>
                  </div>

                  <div>
                      <h3 className="text-lg font-bold font-headline">Corretor Responsável</h3>
                      <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                              <AvatarImage src={property.agente.foto} />
                              <AvatarFallback>
                              {property.agente.nome.charAt(0)}
                              </AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-bold">{property.agente.nome}</p>
                          </div>
                          </div>
                          <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="rounded-full">
                              <Phone className="h-5 w-5 text-primary" />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full">
                              <MessageSquare className="h-5 w-5 text-primary" />
                          </Button>
                          </div>
                      </div>
                  </div>
              </TabsContent>
          </Tabs>
        </div>

        {/* BookingFooter */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t flex items-center justify-between gap-4 z-30">
          <div>
            <p className="text-sm text-muted-foreground">Preço Total</p>
            <p className="text-xl font-bold font-headline text-primary">
              R${property.preco} <span className="font-normal text-sm text-muted-foreground">{property.periodo}</span>
            </p>
          </div>
          <Button
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 h-14 text-lg"
            onClick={handleBookNow}
          >
            Reservar Agora
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

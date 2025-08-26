
'use client';

import { useParams, useRouter } from 'next/navigation';
import { events } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Share2,
  Heart,
  PlayCircle,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const AttendeeAvatar = ({ src, index }: { src: string; index: number }) => (
  <div
    className="w-10 h-10 rounded-full overflow-hidden border-2 border-background bg-white"
    style={{ marginLeft: index > 0 ? '-12px' : '0px', zIndex: index }}
  >
    <Image
      src={src}
      alt={`Participante ${index + 1}`}
      width={40}
      height={40}
      className="object-cover"
    />
  </div>
);

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const event = events.find((e) => e.id === id);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { toast } = useToast();

  if (!event) {
    // Idealmente, isso seria uma página 404.
    return (
      <div className="flex h-screen items-center justify-center">
        Evento não encontrado
      </div>
    );
  }

  const handleBookNow = () => {
    toast({
      title: 'Funcionalidade em Breve!',
      description: 'A reserva de ingressos estará disponível em breve.',
    });
  };

  const truncatedDescription =
    event.sobreOEvento.length > 150
      ? `${event.sobreOEvento.substring(0, 150)}...`
      : event.sobreOEvento;

  return (
    <div className="relative min-h-screen bg-muted/20">
      {/* EventHero */}
      <div className="relative h-[45vh] w-full">
        <Image
          src={event.image}
          alt={event.titulo}
          layout="fill"
          objectFit="cover"
          className="object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-12 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute top-12 right-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
          <PlayCircle className="h-16 w-16 opacity-80" />
          <p className="mt-2 font-semibold">Ver Vídeo</p>
        </div>
      </div>

      {/* EventDetailsCard */}
      <div className="relative -mt-8 rounded-t-3xl bg-background p-6 space-y-6 z-20 pb-28">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-200">
              {event.categoria}
            </Badge>
            <h1 className="text-2xl font-bold font-headline mt-2">
              {event.titulo}
            </h1>
          </div>
        </div>

        <div className="space-y-3 text-muted-foreground">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-orange-500" />
            <span>{event.local}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-orange-500" />
            <span>{event.dataHora}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {event.avatarsParticipantes.slice(0, 3).map((avatar, index) => (
              <AttendeeAvatar key={index} src={avatar} index={index} />
            ))}
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold border-2 border-background -ml-3 z-10">
              <Plus className="h-5 w-5" />
            </div>
            <p className="ml-3 font-bold text-lg">
              {event.numeroParticipantes}
            </p>
          </div>
          <a href="#" className="text-sm font-semibold text-orange-500">
            Ver Todos / Convidar
          </a>
        </div>

        <hr />

        <div>
          <h3 className="text-lg font-bold font-headline">Sobre o Evento</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {showFullDescription ? event.sobreOEvento : truncatedDescription}
            {event.sobreOEvento.length > 150 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-orange-500 font-semibold ml-1"
              >
                {showFullDescription ? 'Ler menos' : 'Ler mais'}
              </button>
            )}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold font-headline">Organizador</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={event.organizador.avatar} />
                <AvatarFallback>
                  {event.organizador.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{event.organizador.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {event.organizador.equipe}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone className="h-5 w-5 text-orange-500" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <MessageSquare className="h-5 w-5 text-orange-500" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-bold font-headline">Endereço</h3>
             <a href="#" className="text-sm font-semibold text-orange-500">Ver no Mapa</a>
          </div>
          <p className="text-muted-foreground mt-2">{event.endereco}</p>
        </div>
      </div>

      {/* BookingFooter */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t flex items-center gap-4 z-30">
        <div>
          <p className="text-sm text-muted-foreground">Preço Total</p>
          <p className="text-xl font-bold font-headline">
            R${event.price} <span className="font-normal text-sm">/pessoa</span>
          </p>
        </div>
        <Button
          size="lg"
          className="flex-1 bg-orange-500 hover:bg-orange-600 h-14 text-lg"
          onClick={handleBookNow}
        >
          Reservar Agora
        </Button>
      </div>
    </div>
  );
}



import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Heart, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

type Attendee = string;

type Event = {
  id: string;
  title: string;
  image: string;
  hint: string;
  tag: string;
  location: string;
  dateTime: string;
  price: string;
  attendees: Attendee[];
  // Dados para a página de detalhes
  titulo: string;
  categoria: string;
  local: string;
  dataHora: string;
  numeroParticipantes: string;
  avatarsParticipantes: Attendee[];
  sobreOEvento: string;
  organizador: {
      nome: string;
      equipe: string;
      avatar: string;
  };
  endereco: string;
};

type EventCardProps = {
  event: Event;
  variant?: 'large' | 'small';
};

const AttendeeAvatar = ({ src, index }: { src: string, index: number }) => (
    <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-background" style={{ marginLeft: index > 0 ? '-8px' : '0px' }}>
        <Image src={src} alt="Attendee" width={24} height={24} className="object-cover" />
    </div>
);


export default function EventCard({ event, variant = 'large' }: EventCardProps) {

  if (variant === 'small') {
    return (
      <Link href={`/events/${event.id}`}>
        <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center p-3 gap-3">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
             <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={event.hint}
              />
              <Badge className="absolute top-2 left-2 bg-black/50 text-white border-0 text-xs">{event.tag}</Badge>
               <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md">
                  <Heart className="h-4 w-4 text-orange-500" />
              </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">{event.dateTime}</p>
            <h3 className="font-bold font-headline leading-tight mt-1">{event.title}</h3>
          </div>
        </Card>
      </Link>
    )
  }


  return (
    <Link href={`/events/${event.id}`}>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-0">
          <div className="relative h-40 w-full rounded-2xl overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={event.hint}
            />
            <Badge className="absolute top-3 left-3 bg-black/50 text-white border-0">{event.tag}</Badge>
            <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md">
              <Heart className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        <CardContent className="p-3">
          <h3 className="text-lg font-bold font-headline truncate">{event.title}</h3>
          <div className="text-sm text-muted-foreground space-y-1.5 mt-2">
              <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span>{event.dateTime}</span>
              </div>
               <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-orange-500 -rotate-45" />
                  <span className="font-bold text-orange-500">${event.price} <span className="text-muted-foreground font-normal">/Person</span></span>
                   <div className="flex items-center ml-auto">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                          <AttendeeAvatar key={index} src={attendee} index={index} />
                      ))}
                      {event.attendees.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold border-2 border-background" style={{ marginLeft: '-8px' }}>
                             +{event.attendees.length - 3}
                          </div>
                      )}
                  </div>
              </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

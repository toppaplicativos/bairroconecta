import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

type Event = {
  id: number;
  imageUrl: string;
  hint: string;
  title: string;
  date: string;
  location: string;
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={event.imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={event.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-bold font-headline">{event.title}</CardTitle>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex flex-col items-start gap-2 text-sm text-muted-foreground">
         <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
      </CardFooter>
    </Card>
  );
}

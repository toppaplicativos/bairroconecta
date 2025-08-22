import MainLayout from "@/components/main-layout";
import EventCard from "@/components/event-card";
import { events } from "@/lib/data";

export default function EventsPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Eventos no Bairro</h1>
        <p className="text-muted-foreground">Confira o que está acontecendo perto de você.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

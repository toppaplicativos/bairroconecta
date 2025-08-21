import MainLayout from "@/components/main-layout";
import EventCard from "@/components/event-card";

const events = [
  {
    id: 1,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "local fair",
    title: "Feira de Artesanato Local",
    date: "25 de Julho, 2024",
    location: "Praça da Matriz",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "live music",
    title: "Show de Rock no Coreto",
    date: "27 de Julho, 2024",
    location: "Parque Central",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "outdoor cinema",
    title: "Cinema ao Ar Livre: Clássicos dos Anos 80",
    date: "28 de Julho, 2024",
    location: "Campo de Futebol do Bairro",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "food festival",
    title: "Festival Gastronômico de Inverno",
    date: "02 de Agosto, 2024",
    location: "Rua Gastronômica",
  },
];

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

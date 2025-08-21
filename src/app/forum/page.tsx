import MainLayout from "@/components/main-layout";
import ForumPostCard from "@/components/forum-post-card";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    author: "Ana Silva",
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "woman portrait",
    title: "Problema com buraco na Rua Principal",
    timestamp: "2 horas atrás",
    replies: 12,
  },
  {
    id: 2,
    author: "Carlos Souza",
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "man portrait",
    title: "Ideias para a festa junina do bairro",
    timestamp: "5 horas atrás",
    replies: 25,
  },
  {
    id: 3,
    author: "Mariana Costa",
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "smiling person",
    title: "Grupo de corrida no parque aos domingos",
    timestamp: "1 dia atrás",
    replies: 8,
  },
  {
    id: 4,
    author: "Jorge Lima",
    avatarUrl: "https://placehold.co/40x40.png",
    hint: "man glasses",
    title: "Recomendações de internet banda larga",
    timestamp: "2 dias atrás",
    replies: 31,
  },
];

export default function ForumPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Fórum da Comunidade</h1>
            <p className="text-muted-foreground">Discuta, compartilhe e conecte-se com seus vizinhos.</p>
          </div>
          <Button>Criar Novo Tópico</Button>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

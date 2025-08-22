import MainLayout from "@/components/main-layout";
import ClassifiedCard from "@/components/classified-card";

const ads = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxCaWtlfGVufDB8fHx8MTc1NTg2NjcxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "bicycle",
    title: "Bicicleta Caloi 10, seminova",
    price: "R$ 450,00",
    seller: "João Pereira",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "sofa",
    title: "Sofá 3 lugares, bom estado",
    price: "R$ 300,00",
    seller: "Maria Oliveira",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "guitar",
    title: "Violão Giannini - Troco por teclado",
    price: "Troca",
    seller: "Pedro Martins",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "video game",
    title: "Videogame PS4 com 2 controles",
    price: "R$ 1.200,00",
    seller: "Fernanda Lima",
  },
   {
    id: 5,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "baby stroller",
    title: "Carrinho de bebê",
    price: "Doação",
    seller: "Família Silva",
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/600x400.png",
    hint: "books",
    title: "Coleção de livros de ficção científica",
    price: "R$ 150,00",
    seller: "Ricardo Alves",
  },
];

export default function ClassifiedsPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Classificados do Bairro</h1>
        <p className="text-muted-foreground">Compre, venda e troque com seus vizinhos.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ads.map((ad) => (
            <ClassifiedCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}


import MainLayout from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Search, HandHelping, Car, Users, Map } from "lucide-react";
import Link from "next/link";

const communityTools = [
  {
    title: "Fórum de Discussão",
    description: "Inicie e participe de discussões sobre o bairro.",
    icon: MessageSquare,
    href: "/community/forum",
    enabled: true,
  },
  {
    title: "Salas de Bate-Papo",
    description: "Converse em tempo real com grupos de interesse.",
    icon: Users,
    href: "#",
    enabled: false,
  },
  {
    title: "Achados e Perdidos",
    description: "Ajude a reunir itens perdidos com seus donos.",
    icon: Search,
    href: "#",
    enabled: false,
  },
  {
    title: "Vizinhança Solidária",
    description: "Peça ou ofereça ajuda para pequenas tarefas.",
    icon: HandHelping,
    href: "#",
    enabled: false,
  },
    {
    title: "Grupo de Caronas",
    description: "Organize caronas para eventos e economize.",
    icon: Car,
    href: "#",
    enabled: false,
  },
    {
    title: "Mapa de Amigos",
    description: "Veja amigos por perto e combine encontros.",
    icon: Map,
    href: "#",
    enabled: false,
  },
];


export default function CommunityHubPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Hub de Conexão Local</h1>
          <p className="text-muted-foreground">Sua central de interação e apoio mútuo no bairro.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityTools.map((tool) => {
            const cardContent = (
               <Card className={`flex flex-col h-full shadow-md hover:shadow-lg transition-shadow ${!tool.enabled ? 'bg-muted/50 opacity-60' : 'hover:border-primary/50'}`}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <div className="p-4 pt-0 text-sm font-semibold text-primary flex justify-end items-center gap-2">
                  {tool.enabled ? 'Acessar' : 'Em breve'}
                  {tool.enabled && <ArrowRight className="h-4 w-4" />}
                </div>
              </Card>
            );

            return tool.enabled ? (
              <Link href={tool.href} key={tool.title}>
                {cardContent}
              </Link>
            ) : (
               <div key={tool.title} className="cursor-not-allowed">
                {cardContent}
               </div>
            )
          })}
        </div>
      </div>
    </MainLayout>
  );
}

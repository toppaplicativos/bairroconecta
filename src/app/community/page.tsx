
'use client';
import MainLayout from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Search, HandHelping, Car, Users, Map, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import ForumPostCard from "@/components/forum-post-card";

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
    href: "/community/chat",
    enabled: true,
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
  const [postCount, setPostCount] = useState<number | null>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    getCountFromServer(collection(db, "posts")).then((snap) =>
      setPostCount(snap.data().count)
    ).catch(() => setPostCount(0));

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(3));
    const unsub = onSnapshot(q, (snap) => {
      setRecentPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoadingPosts(false);
    });
    return () => unsub();
  }, []);

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight font-headline">Hub de Conexão Local</h1>
              <p className="text-muted-foreground max-w-md">
                Sua central de interação e apoio mútuo no bairro. Discuta, ajude e conecte-se.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center p-4 bg-background rounded-xl border shadow-sm min-w-[80px]">
                {postCount === null ? (
                  <Skeleton className="h-7 w-10 mx-auto mb-1" />
                ) : (
                  <p className="text-2xl font-bold text-primary">{postCount}</p>
                )}
                <p className="text-xs text-muted-foreground">Tópicos</p>
              </div>
              <div className="text-center p-4 bg-background rounded-xl border shadow-sm min-w-[80px]">
                <p className="text-2xl font-bold text-primary">∞</p>
                <p className="text-xs text-muted-foreground">Vizinhos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <section>
          <h2 className="text-xl font-semibold font-headline mb-4">Ferramentas da Comunidade</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {communityTools.map((tool) => {
              const cardContent = (
                <Card className={`flex flex-col h-full shadow-sm transition-all ${
                  tool.enabled
                    ? 'hover:shadow-md hover:border-primary/50 cursor-pointer'
                    : 'bg-muted/40 opacity-60 cursor-not-allowed'
                }`}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className={`p-2.5 rounded-lg ${tool.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                      <tool.icon className={`h-5 w-5 ${tool.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <CardTitle className="font-headline text-base">{tool.title}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">{tool.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow" />
                  <div className="px-4 pb-4 text-xs font-semibold flex justify-end items-center gap-1.5">
                    {tool.enabled ? (
                      <span className="text-primary flex items-center gap-1">Acessar <ArrowRight className="h-3.5 w-3.5" /></span>
                    ) : (
                      <span className="text-muted-foreground">Em breve</span>
                    )}
                  </div>
                </Card>
              );

              return tool.enabled ? (
                <Link href={tool.href} key={tool.title}>{cardContent}</Link>
              ) : (
                <div key={tool.title}>{cardContent}</div>
              );
            })}
          </div>
        </section>

        {/* Recent posts preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-headline flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Discussões Recentes
            </h2>
            <Link href="/community/forum" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {loadingPosts ? (
              <>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </>
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => <ForumPostCard key={post.id} post={post} />)
            ) : (
              <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                <p className="text-sm">Nenhuma discussão ainda.</p>
                <Link href="/community/forum" className="text-primary text-sm underline mt-1 inline-block">
                  Seja o primeiro a criar um tópico!
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}


'use client';

import MainLayout from "@/components/main-layout";
import ForumPostCard from "@/components/forum-post-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewPostForm from "@/components/new-post-form";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Search, MessageSquareOff } from "lucide-react";
import { forumCategories } from "@/lib/forum-categories";
import { cn } from "@/lib/utils";

type SortOption = "recentes" | "comentados";

export default function ForumPage() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [sort, setSort] = useState<SortOption>("recentes");

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePostCreated = () => setOpenNewPost(false);

  const filtered = useMemo(() => {
    let list = [...posts];

    if (activeCategory !== "Todos") {
      list = list.filter((p) => (p.category || "Geral") === activeCategory);
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.content?.toLowerCase().includes(s)
      );
    }

    if (sort === "comentados") {
      list.sort((a, b) => (b.repliesCount || 0) - (a.repliesCount || 0));
    }

    // pinned posts always on top
    list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return list;
  }, [posts, activeCategory, search, sort]);

  const allCategories = ["Todos", ...forumCategories.map((c) => c.name)];

  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Fórum da Comunidade</h1>
            <p className="text-muted-foreground">Discuta, compartilhe e conecte-se com seus vizinhos.</p>
          </div>
          <Dialog open={openNewPost} onOpenChange={setOpenNewPost}>
            <DialogTrigger asChild>
              <Button
                className="w-full md:w-auto"
                onClick={() => {
                  if (!user) {
                    signInWithPopup(auth, new GoogleAuthProvider());
                    return;
                  }
                  setOpenNewPost(true);
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Novo Tópico
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Tópico</DialogTitle>
                <DialogDescription>
                  Inicie uma nova discussão sobre um assunto relevante para o bairro.
                </DialogDescription>
              </DialogHeader>
              <NewPostForm onPostCreated={handlePostCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search + sort */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tópicos..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-44 shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="comentados">Mais comentados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {allCategories.map((cat) => {
            const style = cat === "Todos" ? null : forumCategories.find((c) => c.name === cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded-full border transition-all",
                  isActive
                    ? style
                      ? cn(style.color, style.border, "ring-2 ring-offset-1 ring-primary")
                      : "bg-primary text-primary-foreground border-primary"
                    : style
                    ? cn(style.color, style.border, "opacity-60 hover:opacity-100")
                    : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                )}
              >
                {style && <span className="mr-1">{style.emoji}</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Posts list */}
        <div className="space-y-3">
          {loading ? (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          ) : filtered.length > 0 ? (
            filtered.map((post) => <ForumPostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center text-muted-foreground p-10 border-dashed border-2 rounded-xl flex flex-col items-center gap-3">
              <MessageSquareOff className="h-10 w-10 opacity-30" />
              <div>
                <h3 className="text-base font-semibold">
                  {search || activeCategory !== "Todos" ? "Nenhum tópico encontrado." : "Nenhum tópico por aqui ainda."}
                </h3>
                <p className="text-sm mt-1">
                  {search || activeCategory !== "Todos"
                    ? "Tente outro filtro ou busca."
                    : "Seja o primeiro a iniciar uma conversa!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

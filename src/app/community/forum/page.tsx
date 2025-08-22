
'use client';

import MainLayout from "@/components/main-layout";
import ForumPostCard from "@/components/forum-post-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewPostForm from "@/components/new-post-form";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";

export default function ForumPage() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openNewPost, setOpenNewPost] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePostCreated = () => {
    setOpenNewPost(false);
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Fórum da Comunidade</h1>
            <p className="text-muted-foreground">Discuta, compartilhe e conecte-se com seus vizinhos.</p>
          </div>
          <Dialog open={openNewPost} onOpenChange={setOpenNewPost}>
            <DialogTrigger asChild>
              <Button disabled={!user} className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Novo Tópico
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
        <div className="space-y-4">
          {loading ? (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          ) : (
            posts.map((post) => (
              <ForumPostCard key={post.id} post={post} />
            ))
          )}
           {!loading && posts.length === 0 && (
              <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                  <h3 className="text-lg font-semibold">Nenhum tópico por aqui ainda.</h3>
                  <p>Seja o primeiro a iniciar uma conversa!</p>
              </div>
            )}
        </div>
      </div>
    </MainLayout>
  );
}

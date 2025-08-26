
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MainLayout from '@/components/main-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Comment = {
  id: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt: { toDate: () => Date };
}

type Post = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: { toDate: () => Date };
  comments: Comment[];
};

export default function ForumPostDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setPost({ id: doc.id, ...doc.data() } as Post);
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="mt-6 space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-24 w-full" />
             <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="flex-1 p-4 md:p-8 pt-6 text-center">
          <h1 className="text-2xl font-bold">Tópico não encontrado</h1>
          <p className="text-muted-foreground">O tópico que você está procurando não existe ou foi removido.</p>
        </div>
      </MainLayout>
    );
  }

  const timeAgo = post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: ptBR }) : 'agora';

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{post.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={post.authorAvatar || undefined} alt={post.authorName} />
                        <AvatarFallback>{post.authorName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>Postado por <strong>{post.authorName}</strong> • {timeAgo}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
                    {post.content}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Comentários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* NewCommentForm will be added here in a future step */}
                <p className="text-muted-foreground text-sm text-center">A seção de comentários será adicionada em breve.</p>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

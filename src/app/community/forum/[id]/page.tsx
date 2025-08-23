
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import MainLayout from '@/components/main-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import NewCommentForm from '@/components/new-comment-form';
import Poll from '@/components/poll';

type Comment = {
  id: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt: { toDate: () => Date };
}

type PollOption = {
  id: number;
  text: string;
  votes: number;
};

type PollData = {
  question: string;
  options: PollOption[];
  voters: { [userId: string]: number };
}

type Post = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: { toDate: () => Date };
  comments: Comment[];
  poll?: PollData;
};

export default function ForumPostDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

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

        {post.poll && (
            <Poll postId={post.id} pollData={post.poll} />
        )}

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
                <NewCommentForm postId={post.id} />
                
                <div className="space-y-4">
                    {post.comments?.slice().sort((a,b) => a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime()).map(comment => (
                        <div key={comment.id} className="flex items-start gap-3">
                             <Avatar className="h-9 w-9 border">
                                <AvatarImage src={comment.authorAvatar} />
                                <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div className="flex-1 bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm">{comment.authorName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        • {formatDistanceToNow(comment.createdAt.toDate(), { locale: ptBR, addSuffix: true })}
                                    </p>
                                </div>
                                <p className="text-sm text-foreground mt-1">{comment.text}</p>
                             </div>
                        </div>
                    ))}
                     {(!post.comments || post.comments.length === 0) && (
                        <p className="text-muted-foreground text-sm text-center pt-4">Nenhum comentário ainda. Seja o primeiro a responder!</p>
                     )}
                </div>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

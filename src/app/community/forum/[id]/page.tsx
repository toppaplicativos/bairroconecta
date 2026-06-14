
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import MainLayout from '@/components/main-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import NewCommentForm from '@/components/new-comment-form';
import Poll from '@/components/poll';
import { togglePostLike } from '@/app/actions';
import { getCategoryStyle } from '@/lib/forum-categories';
import { Heart, Share2, ArrowLeft, MessageSquare, Pin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type PollOption = { id: number; text: string; votes: number };
type PollData = { question: string; options: PollOption[]; voters: { [userId: string]: number } };
type Comment = {
  id: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt: { toDate: () => Date };
};
type Post = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  category?: string;
  createdAt: { toDate: () => Date };
  comments: Comment[];
  likes?: string[];
  pinned?: boolean;
  poll?: PollData;
};

export default function ForumPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params?.id as string;
  const [user] = useAuthState(auth);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setPost({ id: snap.id, ...snap.data() } as Post);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const isLiked = user ? (post?.likes ?? []).includes(user.uid) : false;
  const likeCount = post?.likes?.length ?? 0;

  const handleLike = async () => {
    if (!user) {
      signInWithPopup(auth, new GoogleAuthProvider());
      return;
    }
    if (!post) return;
    setLikeLoading(true);
    try {
      await togglePostLike(post.id, user.uid, isLiked);
    } catch {
      toast({ variant: 'destructive', title: 'Erro ao curtir o tópico.' });
    } finally {
      setLikeLoading(false);
    }
  };

  const handleShare = async () => {
    if (!post) return;
    try {
      await navigator.share({
        title: post.title,
        text: post.content.slice(0, 100),
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copiado!', description: 'URL copiada para a área de transferência.' });
    }
  };

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-3xl mx-auto w-full">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-24 w-full" />
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
          <Link href="/community/forum">
            <Button variant="outline" className="mt-4">Voltar ao Fórum</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const timeAgo = post.createdAt
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: ptBR })
    : 'agora';
  const cat = getCategoryStyle(post.category);
  const sortedComments = [...(post.comments ?? [])].sort(
    (a, b) => (a.createdAt?.toDate?.()?.getTime() ?? 0) - (b.createdAt?.toDate?.()?.getTime() ?? 0)
  );

  return (
    <MainLayout>
      <div className="flex-1 space-y-5 p-4 md:p-8 pt-6 max-w-3xl mx-auto w-full">
        {/* Breadcrumb / back */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/community/forum" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Fórum
          </Link>
          <span>/</span>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border",
              cat.color, cat.border
            )}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </span>
        </div>

        {/* Post card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex-1 min-w-0">
                {post.pinned && (
                  <p className="text-xs font-semibold text-primary flex items-center gap-1 mb-2">
                    <Pin className="h-3.5 w-3.5" /> Tópico Fixado
                  </p>
                )}
                <CardTitle className="text-2xl md:text-3xl font-bold font-headline leading-snug">
                  {post.title}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Avatar className="h-7 w-7 border">
                <AvatarImage src={post.authorAvatar || undefined} alt={post.authorName} />
                <AvatarFallback className="text-xs">{post.authorName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>
                Postado por <strong className="text-foreground">{post.authorName}</strong> • {timeAgo}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
            {post.poll && <Poll postId={post.id} pollData={post.poll} />}

            {/* Action row */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={likeLoading}
                className={cn("gap-1.5", isLiked && "text-rose-500 hover:text-rose-500")}
              >
                <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500")} />
                {likeCount > 0 && <span>{likeCount}</span>}
                Curtir
              </Button>
              <Button variant="ghost" size="sm" onClick={scrollToComments} className="gap-1.5">
                <MessageSquare className="h-4 w-4" />
                {sortedComments.length > 0 && <span>{sortedComments.length}</span>}
                Comentários
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare} className="gap-1.5 ml-auto">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card ref={commentsRef as any} id="comments">
          <CardHeader>
            <CardTitle className="text-lg">
              Comentários
              {sortedComments.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-sm font-semibold">
                  {sortedComments.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <NewCommentForm postId={id} />
            {sortedComments.length > 0 && (
              <div className="space-y-4">
                {sortedComments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 border-t pt-4">
                    <Avatar className="h-8 w-8 border shrink-0">
                      <AvatarImage src={comment.authorAvatar} />
                      <AvatarFallback className="text-xs">{comment.authorName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">{comment.authorName}</p>
                        <p className="text-xs text-muted-foreground">
                          {comment.createdAt?.toDate
                            ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true, locale: ptBR })
                            : 'agora'}
                        </p>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {sortedComments.length === 0 && (
              <p className="text-muted-foreground text-center text-sm py-4">
                Nenhum comentário ainda. Seja o primeiro!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

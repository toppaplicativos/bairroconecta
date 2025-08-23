
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import MainLayout from '@/components/main-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReportTimeline from '@/components/report-timeline';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Heart, Bell, Send } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { addComment } from '@/app/actions';

type ReportUpdate = {
  status: string;
  date: string;
  comment: string;
};

type Comment = {
  id: string;
  author: string;
  avatarUrl?: string;
  text: string;
  createdAt: { toDate: () => Date };
}

type Report = {
  id: string;
  category: string;
  status: "Aberta" | "Em andamento" | "Resolvido";
  analysis: {
      urgency: "Baixa" | "Média" | "Alta" | "Crítica";
  };
  createdAt: { toDate: () => Date };
  description: string;
  address: string;
  imageUrl?: string;
  updates: ReportUpdate[];
  supporters?: string[];
  followers?: string[];
  comments?: Comment[];
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
        case "Resolvido": return "default";
        case "Em andamento": return "secondary";
        case "Aberta": return "destructive";
        default: return "default";
    }
}

const getUrgencyClass = (urgency: string): string => {
    switch (urgency) {
        case "Crítica": return "border-red-500 bg-red-50";
        case "Alta": return "border-orange-500 bg-orange-50";
        case "Média": return "border-yellow-500 bg-yellow-50";
        default: return "";
    }
}

const getUrgencyTextClass = (urgency: string): string => {
     switch (urgency) {
        case "Crítica": return "text-red-600";
        case "Alta": return "text-orange-600";
        case "Média": return "text-yellow-600";
        default: return "text-gray-600";
    }
}

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, 'reports', id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setReport({ id: doc.id, ...doc.data() } as Report);
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const handleToggleSupport = async () => {
    if (!user || !report) return;
    const docRef = doc(db, 'reports', id);
    const isSupporting = report.supporters?.includes(user.uid);
    await updateDoc(docRef, {
      supporters: isSupporting ? arrayRemove(user.uid) : arrayUnion(user.uid)
    });
  };
  
  const handleToggleFollow = async () => {
    if (!user || !report) return;
    const docRef = doc(db, 'reports', id);
    const isFollowing = report.followers?.includes(user.uid);
    await updateDoc(docRef, {
      followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    
    setIsSubmittingComment(true);
    try {
        await addComment(id, commentText, {
            uid: user.uid,
            displayName: user.displayName || "Anônimo",
            photoURL: user.photoURL
        });
        setCommentText('');
    } catch (error) {
        console.error("Error adding comment:", error);
    } finally {
        setIsSubmittingComment(false);
    }
  }


  if (loading) {
    return (
      <MainLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="mt-6 space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!report) {
    return (
      <MainLayout>
        <div className="flex-1 p-4 md:p-8 pt-6">
          <h1 className="text-2xl font-bold">Manifestação não encontrada</h1>
          <p className="text-muted-foreground">O protocolo solicitado não foi encontrado ou foi removido.</p>
        </div>
      </MainLayout>
    );
  }

  const urgency = report.analysis?.urgency || "Baixa";
  const isSupporting = user ? report.supporters?.includes(user.uid) : false;
  const isFollowing = user ? report.followers?.includes(user.uid) : false;

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <Card className={cn("shadow-lg border-l-4", getUrgencyClass(urgency))}>
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <CardDescription>Protocolo: {report.id}</CardDescription>
                        <CardTitle className="text-2xl font-bold font-headline mt-1">{report.category}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{report.address}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                        <span className={cn("text-sm font-bold", getUrgencyTextClass(urgency))}>
                            URGÊNCIA: {urgency.toUpperCase()}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {report.imageUrl && (
                    <div className="mb-4 relative h-64 w-full">
                        <Image src={report.imageUrl} alt="Foto da manifestação" layout="fill" objectFit="cover" className="rounded-md" />
                    </div>
                )}
                <p className="text-muted-foreground whitespace-pre-wrap">{report.description}</p>
            </CardContent>
             <CardFooter className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-muted/30">
                <div className="flex items-center gap-4">
                     <Button variant={isSupporting ? "default" : "outline"} onClick={handleToggleSupport} disabled={!user}>
                        <Heart className={cn("mr-2 h-4 w-4", isSupporting && "fill-current")} />
                        Apoiar ({report.supporters?.length || 0})
                    </Button>
                    <Button variant={isFollowing ? "secondary" : "outline"} onClick={handleToggleFollow} disabled={!user}>
                        <Bell className={cn("mr-2 h-4 w-4", isFollowing && "fill-current")}/>
                        {isFollowing ? 'Seguindo' : 'Seguir'}
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Aberto em: {new Date(report.createdAt.toDate()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Histórico de Atualizações</CardTitle>
            </CardHeader>
            <CardContent>
                <ReportTimeline updates={report.updates} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Comentários da Comunidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {user ? (
                    <form onSubmit={handleCommentSubmit} className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={user.photoURL || undefined} />
                          <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                             <Textarea 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Adicione seu comentário..."
                                className="w-full"
                                rows={2}
                             />
                             <Button type="submit" size="sm" disabled={isSubmittingComment || !commentText.trim()}>
                                <Send className="mr-2 h-4 w-4" />
                                {isSubmittingComment ? "Enviando..." : "Enviar Comentário"}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <p className="text-muted-foreground text-sm text-center">
                        <a href="#" onClick={() => auth.signInWithRedirect(new (require('firebase/auth').GoogleAuthProvider)())} className="text-primary underline">Faça login</a> para comentar.
                    </p>
                )}

                <div className="space-y-4">
                    {report.comments?.slice().sort((a,b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()).map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                             <Avatar className="h-10 w-10 border">
                                <AvatarImage src={comment.avatarUrl} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(comment.createdAt.toDate()).toLocaleString('pt-BR')}
                                    </p>
                                </div>
                                <p className="text-muted-foreground mt-1">{comment.text}</p>
                             </div>
                        </div>
                    ))}
                     {(!report.comments || report.comments.length === 0) && (
                        <p className="text-muted-foreground text-sm text-center pt-4">Nenhum comentário ainda. Seja o primeiro!</p>
                     )}
                </div>
            </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}

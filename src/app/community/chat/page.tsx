
'use client';

import MainLayout from '@/components/main-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { predefinedRooms } from '@/lib/chat-rooms';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageSquare, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ChatRoomsPage() {
  const [user] = useAuthState(auth);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Seed rooms on mount, then subscribe
  useEffect(() => {
    const seedAndSubscribe = async () => {
      for (const room of predefinedRooms) {
        const ref = doc(db, 'chatRooms', room.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, {
            name: room.name,
            emoji: room.emoji,
            description: room.description,
            color: room.color,
            border: room.border,
            gradient: room.gradient,
            messageCount: 0,
            lastMessage: null,
            createdAt: serverTimestamp(),
          });
        }
      }

      const unsub = onSnapshot(collection(db, 'chatRooms'), (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Sort by predefined order
        const ordered = predefinedRooms
          .map((r) => data.find((d) => d.id === r.id) ?? { id: r.id, ...r })
          .filter(Boolean);
        setRooms(ordered);
        setLoading(false);
      });
      return unsub;
    };

    let cleanup: (() => void) | undefined;
    seedAndSubscribe().then((unsub) => {
      cleanup = unsub;
    });
    return () => cleanup?.();
  }, []);

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Salas de Bate-Papo
          </h1>
          <p className="text-muted-foreground">
            Converse em tempo real com seus vizinhos por tema.
          </p>
        </div>

        {/* Login CTA */}
        {!user && (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex-1">
              <p className="font-semibold text-sm">Entre para participar das conversas</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Você pode ler as mensagens sem login, mas precisa de conta para enviar.
              </p>
            </div>
            <Button size="sm" onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
              Entrar
            </Button>
          </div>
        )}

        {/* Room grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-36 w-full rounded-2xl" />
              ))
            : rooms.map((room) => {
                const config = predefinedRooms.find((r) => r.id === room.id);
                const lastMsg = room.lastMessage;
                const lastMsgTime = lastMsg?.createdAt?.toDate
                  ? formatDistanceToNow(lastMsg.createdAt.toDate(), {
                      addSuffix: true,
                      locale: ptBR,
                    })
                  : null;

                return (
                  <Link key={room.id} href={`/community/chat/${room.id}`}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/40 transition-all duration-200 cursor-pointer overflow-hidden group">
                      {/* Color band */}
                      <div
                        className={cn(
                          'h-1.5 w-full bg-gradient-to-r',
                          config?.gradient ?? 'from-primary to-primary/60'
                        )}
                      />
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl leading-none">{room.emoji}</span>
                            <div>
                              <h3 className="font-bold text-base leading-tight">{room.name}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {room.description}
                              </p>
                            </div>
                          </div>
                          {room.messageCount > 0 && (
                            <Badge variant="secondary" className="shrink-0 text-xs">
                              {room.messageCount}
                            </Badge>
                          )}
                        </div>

                        {/* Last message preview */}
                        <div className="min-h-[36px]">
                          {lastMsg ? (
                            <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="font-medium text-foreground/70">
                                  {lastMsg.authorName}:{' '}
                                </span>
                                <span className="line-clamp-1">{lastMsg.text}</span>
                                {lastMsgTime && (
                                  <span className="block text-[10px] mt-0.5">{lastMsgTime}</span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">
                              Nenhuma mensagem ainda. Comece a conversa!
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-end">
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Entrar na sala <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
        </div>
      </div>
    </MainLayout>
  );
}

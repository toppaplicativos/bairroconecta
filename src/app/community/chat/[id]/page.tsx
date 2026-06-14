
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  collection,
  deleteField,
  doc,
  onSnapshot,
  orderBy,
  query,
  limit,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import ChatMessage, { ChatMessageData } from '@/components/chat-message';
import { sendChatMessage } from '@/app/actions';
import { getRoomConfig } from '@/lib/chat-rooms';
import { ArrowLeft, ChevronDown, Loader2, Send, X } from 'lucide-react';
import Link from 'next/link';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type ReplyTo = { messageId: string; text: string; authorName: string };

type MsgWithMeta = ChatMessageData & { showDateSep?: string };

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params?.id as string;
  const [user] = useAuthState(auth);
  const room = getRoomConfig(roomId);

  const [messages, setMessages] = useState<MsgWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);
  const [typingUsers, setTypingUsers] = useState<{ [uid: string]: string }>({});
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newMsgCount, setNewMsgCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const prevCountRef = useRef(0);
  const isAtBottomRef = useRef(true);

  // Messages subscription
  useEffect(() => {
    if (!roomId) return;
    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(100)
    );
    return onSnapshot(q, (snap) => {
      const raw = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ChatMessageData[];

      // Add grouping & date separators
      const processed: MsgWithMeta[] = raw.map((msg, i) => {
        const prev = raw[i - 1];
        const sameAuthor = prev?.authorId === msg.authorId;
        const closeInTime =
          sameAuthor &&
          msg.createdAt?.toDate &&
          prev?.createdAt?.toDate &&
          msg.createdAt.toDate().getTime() - prev.createdAt.toDate().getTime() < 5 * 60 * 1000;

        let showDateSep: string | undefined;
        if (msg.createdAt?.toDate) {
          const d = msg.createdAt.toDate();
          const prevD = prev?.createdAt?.toDate?.();
          if (!prevD || !isSameDay(d, prevD)) {
            showDateSep = isToday(d)
              ? 'Hoje'
              : isYesterday(d)
              ? 'Ontem'
              : format(d, "dd 'de' MMMM", { locale: ptBR });
          }
        }

        return {
          ...msg,
          isGrouped: !!(sameAuthor && closeInTime && !showDateSep),
          showDateSep,
        };
      });

      setMessages(processed);
      setLoading(false);

      if (!isAtBottomRef.current && processed.length > prevCountRef.current) {
        setNewMsgCount((n) => n + (processed.length - prevCountRef.current));
      }
      prevCountRef.current = processed.length;
    });
  }, [roomId]);

  // Typing subscription
  useEffect(() => {
    if (!roomId) return;
    return onSnapshot(doc(db, 'chatTyping', roomId), (snap) => {
      if (!snap.exists()) { setTypingUsers({}); return; }
      const data = snap.data();
      const now = Date.now();
      const active: { [uid: string]: string } = {};
      for (const [uid, info] of Object.entries(data)) {
        if (uid !== user?.uid && (info as any).timestamp > now - 5000) {
          active[uid] = (info as any).name;
        }
      }
      setTypingUsers(active);
    });
  }, [roomId, user?.uid]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: loading ? 'instant' : 'smooth' });
      setNewMsgCount(0);
    }
  }, [messages, isAtBottom, loading]);

  const handleScroll = useCallback(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setIsAtBottom(atBottom);
    isAtBottomRef.current = atBottom;
    if (atBottom) setNewMsgCount(0);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsAtBottom(true);
    isAtBottomRef.current = true;
    setNewMsgCount(0);
  };

  const updateTyping = useCallback(async () => {
    if (!user || !roomId) return;
    await setDoc(
      doc(db, 'chatTyping', roomId),
      { [user.uid]: { name: user.displayName || 'Anônimo', timestamp: Date.now() } },
      { merge: true }
    );
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(async () => {
      await setDoc(doc(db, 'chatTyping', roomId), { [user.uid]: deleteField() }, { merge: true });
    }, 4000);
  }, [user, roomId]);

  const clearTyping = useCallback(async () => {
    if (!user || !roomId) return;
    clearTimeout(typingTimeoutRef.current);
    await setDoc(doc(db, 'chatTyping', roomId), { [user.uid]: deleteField() }, { merge: true });
  }, [user, roomId]);

  const handleSend = async () => {
    const msg = text.trim();
    if (!msg || !user || isSending) return;
    setText('');
    setReplyTo(null);
    setIsSending(true);
    setIsAtBottom(true);
    isAtBottomRef.current = true;
    await clearTyping();
    try {
      await sendChatMessage(
        roomId,
        msg,
        { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL },
        replyTo ?? undefined
      );
    } catch {
      setText(msg);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const typingNames = Object.values(typingUsers);
  const typingText =
    typingNames.length === 1
      ? `${typingNames[0]} está digitando...`
      : typingNames.length > 1
      ? `${typingNames.slice(0, -1).join(', ')} e ${typingNames.at(-1)} estão digitando...`
      : null;

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 min-h-0">
        {/* Room header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b bg-background shrink-0 sticky top-0 z-10">
          <Link href="/community/chat">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-2xl leading-none">{room.emoji}</span>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-sm leading-tight">{room.name}</h1>
            <p className="text-xs text-muted-foreground truncate">{room.description}</p>
          </div>
        </div>

        {/* Messages area */}
        <div className="relative flex-1 min-h-0">
          <div
            ref={scrollAreaRef}
            onScroll={handleScroll}
            className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-2"
          >
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={cn('flex gap-2', i % 3 === 2 && 'flex-row-reverse')}>
                    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                    <Skeleton className={cn('h-10 rounded-2xl', i % 3 === 2 ? 'w-44' : 'w-56')} />
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-2 text-muted-foreground py-16">
                <span className="text-5xl">{room.emoji}</span>
                <p className="font-medium text-sm">Nenhuma mensagem ainda.</p>
                <p className="text-xs">Seja o primeiro a dizer olá! 👋</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.showDateSep && (
                      <div className="flex items-center gap-2 my-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground font-medium px-2 shrink-0">
                          {msg.showDateSep}
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                    )}
                    <ChatMessage
                      message={msg}
                      isOwn={msg.authorId === (user?.uid ?? '')}
                      currentUserId={user?.uid ?? ''}
                      roomId={roomId}
                      onReply={(m) =>
                        setReplyTo({ messageId: m.id, text: m.text, authorName: m.authorName })
                      }
                    />
                  </div>
                ))}
              </>
            )}

            {/* Typing indicator */}
            {typingText && (
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground pl-10">
                <span className="inline-flex gap-0.5 items-end pb-0.5">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
                <span>{typingText}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* New messages / scroll to bottom button */}
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-primary/90 transition-all"
            >
              {newMsgCount > 0 && (
                <span>
                  {newMsgCount} nova{newMsgCount > 1 ? 's' : ''}
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t bg-background px-4 py-3">
          {/* Reply indicator */}
          {replyTo && (
            <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-muted rounded-xl text-sm">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-primary leading-tight">{replyTo.authorName}</p>
                <p className="text-xs text-muted-foreground truncate">{replyTo.text}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => setReplyTo(null)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          {user ? (
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8 border shrink-0 mb-0.5">
                <AvatarImage src={user.photoURL ?? undefined} />
                <AvatarFallback className="text-xs">{user.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Textarea
                value={text}
                onChange={(e) => { setText(e.target.value); updateTyping(); }}
                onKeyDown={handleKeyDown}
                placeholder="Mensagem..."
                className="min-h-[40px] max-h-32 resize-none py-2 text-sm flex-1"
                rows={1}
                disabled={isSending}
              />
              <Button
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={handleSend}
                disabled={!text.trim() || isSending}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-1">
              <p className="text-sm text-muted-foreground flex-1">
                Faça login para enviar mensagens.
              </p>
              <Button
                size="sm"
                onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
              >
                Entrar
              </Button>
            </div>
          )}
          {user && (
            <p className="text-[10px] text-muted-foreground text-center mt-1.5">
              Enter para enviar · Shift+Enter para nova linha
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

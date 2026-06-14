
'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Reply, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toggleMessageReaction } from '@/app/actions';
import { QUICK_REACTIONS } from '@/lib/chat-rooms';
import { format } from 'date-fns';

export type ChatMessageData = {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  createdAt: { toDate: () => Date } | null;
  reactions: { [emoji: string]: string[] };
  replyTo?: { messageId: string; text: string; authorName: string };
  type: 'text' | 'system';
  isGrouped: boolean;
};

interface ChatMessageProps {
  message: ChatMessageData;
  isOwn: boolean;
  currentUserId: string;
  roomId: string;
  onReply: (msg: ChatMessageData) => void;
}

export default function ChatMessage({ message, isOwn, currentUserId, roomId, onReply }: ChatMessageProps) {
  const [reacting, setReacting] = useState(false);

  if (message.type === 'system') {
    return (
      <div className="text-center text-xs text-muted-foreground py-2 px-4">
        {message.text}
      </div>
    );
  }

  const time = message.createdAt?.toDate ? format(message.createdAt.toDate(), 'HH:mm') : '';
  const activeReactions = Object.entries(message.reactions || {}).filter(([, users]) => users.length > 0);

  const handleReaction = async (emoji: string) => {
    setReacting(false);
    const hasReacted = (message.reactions?.[emoji] || []).includes(currentUserId);
    await toggleMessageReaction(roomId, message.id, emoji, currentUserId, hasReacted);
  };

  return (
    <div
      className={cn(
        'flex items-end gap-2 group',
        isOwn ? 'flex-row-reverse' : 'flex-row',
        message.isGrouped ? 'mt-0.5' : 'mt-3'
      )}
    >
      {/* Avatar — only for others, only first in group */}
      {!isOwn && (
        <div className="w-8 shrink-0">
          {!message.isGrouped ? (
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={message.authorAvatar ?? undefined} />
              <AvatarFallback className="text-xs">{message.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : null}
        </div>
      )}

      <div className={cn('flex flex-col max-w-[75%] min-w-0', isOwn ? 'items-end' : 'items-start')}>
        {/* Author label */}
        {!isOwn && !message.isGrouped && (
          <span className="text-xs font-semibold text-muted-foreground mb-1 ml-1">
            {message.authorName}
          </span>
        )}

        {/* Reply quote */}
        {message.replyTo && (
          <div
            className={cn(
              'text-xs px-2.5 py-1.5 rounded-lg mb-1 border-l-2 max-w-full',
              isOwn
                ? 'bg-primary/15 border-primary/60 text-primary/80'
                : 'bg-muted border-muted-foreground/40 text-muted-foreground'
            )}
          >
            <span className="font-semibold block">{message.replyTo.authorName}</span>
            <span className="truncate block">{message.replyTo.text}</span>
          </div>
        )}

        {/* Bubble + actions row */}
        <div className={cn('flex items-end gap-1.5', isOwn ? 'flex-row-reverse' : 'flex-row')}>
          {/* Bubble */}
          <div
            className={cn(
              'px-3 py-2 rounded-2xl text-sm break-words leading-relaxed',
              isOwn
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : 'bg-card border rounded-bl-sm text-foreground',
              message.isGrouped && isOwn && 'rounded-br-2xl',
              message.isGrouped && !isOwn && 'rounded-bl-2xl'
            )}
          >
            <span>{message.text}</span>
            <span
              className={cn(
                'text-[10px] ml-2 float-right translate-y-0.5',
                isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground'
              )}
            >
              {time}
            </span>
          </div>

          {/* Hover action buttons */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mb-1">
            <Popover open={reacting} onOpenChange={setReacting}>
              <PopoverTrigger asChild>
                <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground">
                  <Smile className="h-3.5 w-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-1.5" side={isOwn ? 'left' : 'right'}>
                <div className="flex gap-0.5">
                  {QUICK_REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="text-base w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <button
              onClick={() => onReply(message)}
              className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              <Reply className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Reactions */}
        {activeReactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {activeReactions.map(([emoji, users]) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={cn(
                  'inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full border transition-colors',
                  users.includes(currentUserId)
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'bg-muted border-border hover:bg-muted/80 text-muted-foreground'
                )}
              >
                {emoji}
                <span className="text-[10px] font-medium">{users.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

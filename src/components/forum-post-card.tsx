
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Pin } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getCategoryStyle } from "@/lib/forum-categories";
import { cn } from "@/lib/utils";

type Post = {
  id: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content?: string;
  category?: string;
  createdAt: { toDate: () => Date };
  repliesCount: number;
  likes?: string[];
  pinned?: boolean;
};

type ForumPostCardProps = {
  post: Post;
};

export default function ForumPostCard({ post }: ForumPostCardProps) {
  const timeAgo = post.createdAt
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: ptBR })
    : 'agora';
  const cat = getCategoryStyle(post.category);
  const likeCount = post.likes?.length ?? 0;
  const preview = post.content ? post.content.slice(0, 120) + (post.content.length > 120 ? '…' : '') : '';

  return (
    <Link href={`/community/forum/${post.id}`}>
      <Card className={cn(
        "shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/40",
        post.pinned && "border-l-4 border-l-primary"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Avatar className="h-9 w-9 border shrink-0 mt-0.5">
                <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                <AvatarFallback className="text-xs">{post.authorName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {post.pinned && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      <Pin className="h-3 w-3" /> Fixado
                    </span>
                  )}
                  <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border", cat.color, cat.border)}>
                    <span className="text-[10px]">{cat.emoji}</span>
                    {cat.name}
                  </span>
                </div>
                <h3 className="text-base font-semibold font-headline leading-snug line-clamp-2">{post.title}</h3>
                {preview && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{preview}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1.5">
                  por <span className="font-medium text-foreground/70">{post.authorName}</span> • {timeAgo}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0 text-muted-foreground">
              <div className="flex items-center gap-1 text-sm">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">{post.repliesCount || 0}</span>
              </div>
              {likeCount > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
                  <span className="font-medium">{likeCount}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';


type Post = {
  id: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  createdAt: { toDate: () => Date };
  repliesCount: number;
};

type ForumPostCardProps = {
  post: Post;
};

export default function ForumPostCard({ post }: ForumPostCardProps) {

  const timeAgo = post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: ptBR }) : 'agora';

  return (
    <Link href={`/community/forum/${post.id}`}>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <Avatar>
                <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                <AvatarFallback>{post.authorName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-lg font-medium font-headline">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                por {post.authorName} • {timeAgo}
                </p>
            </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">{post.repliesCount || 0}</span>
            </div>
        </CardContent>
        </Card>
    </Link>
  );
}

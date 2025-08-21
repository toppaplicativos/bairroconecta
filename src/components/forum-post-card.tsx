import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

type Post = {
  id: number;
  author: string;
  avatarUrl: string;
  hint: string;
  title: string;
  timestamp: string;
  replies: number;
};

type ForumPostCardProps = {
  post: Post;
};

export default function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.avatarUrl} alt={post.author} data-ai-hint={post.hint}/>
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-medium font-headline">{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              por {post.author} • {post.timestamp}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">{post.replies}</span>
        </div>
      </CardContent>
    </Card>
  );
}

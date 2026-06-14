
'use client';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { voteOnPoll } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type PollOption = {
  id: number;
  text: string;
  votes: number;
};

type PollData = {
  question: string;
  options: PollOption[];
  voters: { [userId: string]: number };
};

interface PollProps {
  postId: string;
  pollData: PollData;
}

export default function Poll({ postId, pollData }: PollProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);

  const userVote = user ? pollData.voters?.[user.uid] : undefined;
  const totalVotes = pollData.options.reduce((acc, option) => acc + option.votes, 0);

  const handleVote = async (optionId: number) => {
    if (!user) {
        toast({ title: "Faça login para votar.", variant: "destructive" });
        return;
    }
    if (userVote !== undefined) {
        toast({ title: "Você já votou nesta enquete.", variant: "destructive" });
        return;
    }
    setIsVoting(true);
    try {
      await voteOnPoll(postId, optionId, user.uid);
      toast({ title: "Voto computado com sucesso!", variant: "default" });
    } catch (error: any) {
      toast({ title: "Erro ao votar", description: error.message, variant: "destructive" });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>{pollData.question}</CardTitle>
        <CardDescription>
            {totalVotes} voto{totalVotes === 1 ? '' : 's'} no total.
            {userVote !== undefined && " Você já votou."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pollData.options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const hasVotedForThis = userVote === option.id;

          return (
            <div key={option.id}>
              {userVote !== undefined ? (
                // Voted view
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm mb-1">
                     <p className={cn("font-medium", hasVotedForThis && "text-primary")}>
                       {hasVotedForThis && <CheckCircle className="inline-block mr-2 h-4 w-4" />}
                       {option.text}
                    </p>
                    <span className="font-bold">{percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} />
                </div>
              ) : (
                // Not voted view
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto"
                  onClick={() => handleVote(option.id)}
                  disabled={isVoting}
                >
                  {isVoting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {option.text}
                </Button>
              )}
            </div>
          );
        })}
         {!user && (
            <p className="text-muted-foreground text-sm text-center pt-2">
                 <a href="#" onClick={(e) => { e.preventDefault(); signInWithPopup(auth, new GoogleAuthProvider()); }} className="text-primary underline">Faça login</a> para participar da votação.
            </p>
        )}
      </CardContent>
    </Card>
  );
}

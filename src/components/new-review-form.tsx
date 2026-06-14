'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, Loader2, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { cn } from "@/lib/utils";
import { addBusinessReview } from "@/app/actions";

const reviewSchema = z.object({
  rating: z.number().min(1, "Selecione pelo menos uma estrela."),
  comment: z
    .string()
    .min(10, "O comentário deve ter pelo menos 10 caracteres.")
    .max(500, "O comentário é muito longo."),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface NewReviewFormProps {
  businessId: string;
}

export default function NewReviewForm({ businessId }: NewReviewFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user] = useAuthState(auth);
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const handleLogin = () => signInWithPopup(auth, googleProvider).catch(console.error);

  const onSubmit = async (data: ReviewFormValues) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await addBusinessReview(businessId, data, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      toast({
        title: "Avaliação enviada!",
        description: "Obrigado pelo seu feedback.",
      });
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Não foi possível registrar sua avaliação. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <p className="text-sm text-muted-foreground">
          Faça login para deixar sua avaliação
        </p>
        <Button variant="outline" onClick={handleLogin} className="gap-2">
          <LogIn className="h-4 w-4" />
          Entrar com Google
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-center block">Sua nota</FormLabel>
              <FormControl>
                <div
                  className="flex justify-center gap-2"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={cn(
                        "w-9 h-9 cursor-pointer transition-all duration-150 hover:scale-110",
                        star <= (hoverRating || field.value)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => field.onChange(star)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu comentário</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte como foi sua experiência..."
                  rows={3}
                  disabled={isSubmitting}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
            ) : (
              <><Send className="h-4 w-4" /> Enviar avaliação</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

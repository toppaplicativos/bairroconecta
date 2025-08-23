
'use client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { addReviewToBusiness } from "@/app/actions";

const reviewSchema = z.object({
  rating: z.number().min(1, "Por favor, selecione pelo menos uma estrela."),
  comment: z.string().min(10, "Seu comentário deve ter pelo menos 10 caracteres.").max(500, "O comentário é muito longo."),
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
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Usuário não autenticado",
        description: "Você precisa fazer login para deixar uma avaliação.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
        await addReviewToBusiness(businessId, data, {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
        toast({
            title: "Avaliação Enviada!",
            description: "Obrigado pelo seu feedback. Ele é muito importante para nós.",
        });
        form.reset();
    } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
        toast({
            variant: "destructive",
            title: "Erro ao Enviar",
            description: "Não foi possível registrar sua avaliação. Tente novamente.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
        <p className="text-muted-foreground text-sm text-center p-4 border rounded-lg">
            <a href="#" onClick={() => auth.signInWithRedirect(new (require('firebase/auth').GoogleAuthProvider)())} className="text-primary underline">Faça login</a> para deixar sua avaliação.
        </p>
    )
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
                <div className="flex justify-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-8 h-8 cursor-pointer transition-colors",
                        star <= (hoverRating || field.value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
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
                  placeholder="Conte como foi sua experiência com este estabelecimento..."
                  rows={4}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
             {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Avaliação
                </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

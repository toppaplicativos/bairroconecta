
'use client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { addCommentToPost } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const commentSchema = z.object({
    text: z.string().min(1, "O comentário não pode estar vazio.").max(2000, "O comentário é muito longo."),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface NewCommentFormProps {
    postId: string;
}

export default function NewCommentForm({ postId }: NewCommentFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user] = useAuthState(auth);
    
    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            text: "",
        },
    });

    const onSubmit = async (data: CommentFormValues) => {
        if (!user) {
             toast({
                variant: "destructive",
                title: "Usuário não autenticado",
                description: "Você precisa fazer login para comentar.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await addCommentToPost(postId, data.text, {
                uid: user.uid,
                displayName: user.displayName || "Anônimo",
                photoURL: user.photoURL,
            });
            
            form.reset();
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Erro ao Comentar",
                description: "Não foi possível enviar seu comentário. Tente novamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <p className="text-muted-foreground text-sm text-center p-4 border rounded-lg">
                <a href="#" onClick={() => auth.signInWithRedirect(new (require('firebase/auth').GoogleAuthProvider)())} className="text-primary underline">Faça login</a> para participar da discussão.
            </p>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-3">
                 <Avatar className="h-9 w-9 border mt-1">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Textarea
                                    placeholder="Adicione seu comentário..."
                                    rows={2}
                                    {...field}
                                    disabled={isSubmitting}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" size="sm" disabled={isSubmitting || !form.formState.isValid}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Comentar
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

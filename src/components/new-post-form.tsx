
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { createPost } from "@/app/actions";
import { forumCategories } from "@/lib/forum-categories";
import { cn } from "@/lib/utils";

const postSchema = z.object({
    title: z.string().min(10, "O título deve ter pelo menos 10 caracteres.").max(100, "O título não pode exceder 100 caracteres."),
    content: z.string().min(20, "O conteúdo deve ter pelo menos 20 caracteres."),
    category: z.string().min(1, "Selecione uma categoria."),
});

type PostFormValues = z.infer<typeof postSchema>;

interface NewPostFormProps {
    onPostCreated: () => void;
}

export default function NewPostForm({ onPostCreated }: NewPostFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user] = useAuthState(auth);

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "Geral",
        },
    });

    const onSubmit = async (data: PostFormValues) => {
        if (!user) {
             toast({
                variant: "destructive",
                title: "Usuário não autenticado",
                description: "Você precisa fazer login para criar um tópico.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await createPost(data, {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });

            toast({
                title: "Tópico Criado!",
                description: "Sua discussão já está visível para toda a comunidade.",
            });
            form.reset();
            onPostCreated();
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Erro ao Criar Tópico",
                description: "Não foi possível criar o tópico. Tente novamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedCategory = form.watch("category");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                                <div className="flex flex-wrap gap-2">
                                    {forumCategories.map((cat) => (
                                        <button
                                            key={cat.name}
                                            type="button"
                                            onClick={() => field.onChange(cat.name)}
                                            className={cn(
                                                "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all",
                                                cat.color, cat.border,
                                                field.value === cat.name
                                                    ? "ring-2 ring-offset-1 ring-primary scale-105"
                                                    : "opacity-60 hover:opacity-100"
                                            )}
                                        >
                                            <span>{cat.emoji}</span>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título do Tópico</FormLabel>
                            <FormControl>
                               <Input
                                    placeholder="Qual o assunto principal da sua discussão?"
                                    {...field}
                                    disabled={isSubmitting}
                               />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conteúdo</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva com mais detalhes o que você gostaria de discutir..."
                                    rows={5}
                                    {...field}
                                    disabled={isSubmitting}
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
                                Publicando...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Publicar Tópico
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

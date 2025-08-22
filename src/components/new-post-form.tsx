
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Vote, PlusCircle, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { createPost } from "@/app/actions";
import { Separator } from "./ui/separator";

const postSchema = z.object({
    title: z.string().min(10, "O título deve ter pelo menos 10 caracteres.").max(100, "O título não pode exceder 100 caracteres."),
    content: z.string().min(20, "O conteúdo deve ter pelo menos 20 caracteres."),
    poll: z.object({
        question: z.string().max(200, "A pergunta da enquete é muito longa.").optional(),
        options: z.array(z.object({
            text: z.string().min(1, "A opção não pode estar vazia.").max(100, "A opção é muito longa.")
        })).optional()
    }).optional()
}).refine(data => {
    if (data.poll?.question) {
        return data.poll.options && data.poll.options.length >= 2;
    }
    return true;
}, {
    message: "Uma enquete precisa de uma pergunta e pelo menos duas opções.",
    path: ["poll.question"],
});


type PostFormValues = z.infer<typeof postSchema>;

interface NewPostFormProps {
    onPostCreated: () => void;
}

export default function NewPostForm({ onPostCreated }: NewPostFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user] = useAuthState(auth);
    const [showPoll, setShowPoll] = useState(false);
    
    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            poll: {
                question: "",
                options: [{ text: "" }, { text: "" }]
            }
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "poll.options"
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

        const submissionData = {
            title: data.title,
            content: data.content,
            poll: showPoll && data.poll?.question ? {
                question: data.poll.question,
                options: data.poll.options!.map(o => o.text)
            } : undefined
        }

        try {
            await createPost(submissionData, {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });
            
            toast({
                title: "Tópico Criado!",
                description: "Sua discussão já está visível para toda a comunidade.",
            });
            form.reset();
            setShowPoll(false);
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[75vh] overflow-y-auto pr-2">
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

                {showPoll && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                        <h4 className="font-semibold text-center">Criar Enquete</h4>
                        <FormField
                            control={form.control}
                            name="poll.question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pergunta da Enquete</FormLabel>
                                    <FormControl>
                                       <Input placeholder="Ex: Qual a melhor opção?" {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                             <FormLabel>Opções de Resposta</FormLabel>
                             <div className="space-y-2 mt-2">
                                {fields.map((field, index) => (
                                    <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`poll.options.${index}.text`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input placeholder={`Opção ${index + 1}`} {...field} disabled={isSubmitting} />
                                                    </FormControl>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={isSubmitting || fields.length <= 2}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                 <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                             </div>
                             <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({ text: "" })}
                                disabled={isSubmitting || fields.length >= 5}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Adicionar Opção
                            </Button>
                        </div>
                    </div>
                )}
                
                <Separator />
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowPoll(!showPoll)} disabled={isSubmitting}>
                        <Vote className="mr-2 h-4 w-4" />
                        {showPoll ? "Remover Enquete" : "Adicionar Enquete"}
                    </Button>

                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
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

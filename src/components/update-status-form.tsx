
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { updateReportStatus } from "@/app/actions";

const statusSchema = z.object({
  status: z.string({ required_error: "Selecione um novo status." }),
  comment: z.string().min(10, "O comentário deve ter pelo menos 10 caracteres.").max(500, "O comentário não pode exceder 500 caracteres."),
});

type StatusFormValues = z.infer<typeof statusSchema>;

interface UpdateStatusFormProps {
    reportId: string;
    currentStatus: string;
}

export default function UpdateStatusForm({ reportId, currentStatus }: UpdateStatusFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<StatusFormValues>({
        resolver: zodResolver(statusSchema),
        defaultValues: {
          status: currentStatus,
          comment: "",
        },
    });

    async function onSubmit(data: StatusFormValues) {
        setIsSubmitting(true);
        try {
            await updateReportStatus(reportId, data.status, data.comment);
            toast({
                title: "Status Atualizado!",
                description: "A manifestação foi atualizada com sucesso.",
            });
            form.reset({ status: data.status, comment: "" });
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Não foi possível atualizar o status. Tente novamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Novo Status</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Aberta">Aberta</SelectItem>
                                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                                    <SelectItem value="Resolvido">Resolvido</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comentário da Atualização</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex: Equipe de iluminação foi acionada e a troca da lâmpada está programada para amanhã."
                                    {...field}
                                    rows={4}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormDescription>
                                Este comentário será público e visível no histórico da manifestação.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Atualizar Status
                </Button>
            </form>
        </Form>
    );
}


'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitReport } from "@/app/actions";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const reportSchema = z.object({
    category: z.string({ required_error: "Selecione uma categoria." }),
    description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres."),
    address: z.string().min(10, "Por favor, informe um endereço."),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface NewReportFormProps {
    onReportSubmitted: () => void;
}

export default function NewReportForm({ onReportSubmitted }: NewReportFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user] = useAuthState(auth);

    const form = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            description: "",
            address: "",
        },
    });

    const onSubmit = async (data: ReportFormValues) => {
        if (!user) {
             toast({
                variant: "destructive",
                title: "Usuário não autenticado",
                description: "Você precisa fazer login para enviar uma manifestação.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitReport(data, user.uid);
            toast({
                title: "Manifestação Enviada!",
                description: `Sua solicitação foi registrada com o protocolo ${result.id.substring(0, 10)}... e classificada com urgência: ${result.urgency}.`,
            });
            form.reset();
            onReportSubmitted();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao Enviar",
                description: "Não foi possível processar sua manifestação. Tente novamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Buraco na rua">Buraco na rua</SelectItem>
                                    <SelectItem value="Iluminação pública">Iluminação pública</SelectItem>
                                    <SelectItem value="Lixo acumulado">Lixo acumulado</SelectItem>
                                    <SelectItem value="Sinalização de trânsito">Sinalização de trânsito</SelectItem>
                                    <SelectItem value="Segurança">Segurança</SelectItem>
                                    <SelectItem value="Outros">Outros</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex: Há um poste com a lâmpada queimada em frente ao número 100."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço da Ocorrência</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Rua, Número, Bairro"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2">
                    <Label htmlFor="photo">Foto</Label>
                     <Button type="button" variant="outline" className="w-full justify-start font-normal text-muted-foreground" disabled>
                        <Camera className="mr-2 h-4 w-4" />
                        Anexar uma foto (em breve)
                    </Button>
                </div>


                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analisando e Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Manifestação
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
}

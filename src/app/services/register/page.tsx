
'use client';
import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { serviceProviders } from "@/lib/data";

const serviceCategories = [...new Set(serviceProviders.map(s => s.category))];

const registerSchema = z.object({
  name: z.string().min(3, "Seu nome completo é obrigatório."),
  phone: z.string().min(10, "Um telefone válido é obrigatório."),
  category: z.string({ required_error: "Selecione a categoria do seu serviço." }),
  description: z.string().min(20, "Descreva seu serviço em pelo menos 20 caracteres."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function ServiceRegisterPage() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            phone: "",
            description: "",
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsSubmitting(true);
        console.log("Submitting:", data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        // TODO: Show success message
    }

    return (
        <MainLayout>
            <div className="flex-1 space-y-6 p-4 md:p-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Cadastre seu Serviço</h1>
                    <p className="text-muted-foreground">Faça parte da nossa rede de profissionais e seja encontrado por clientes no seu bairro.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Profissional</CardTitle>
                        <CardDescription>Preencha o formulário abaixo para iniciar seu cadastro.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: João da Silva" {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone (WhatsApp)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="(11) 99999-9999" {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Principal Categoria de Serviço</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione uma categoria" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {serviceCategories.map(cat => (
                                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                    ))}
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
                                            <FormLabel>Descreva seu serviço</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Fale um pouco sobre sua experiência e o que você oferece." {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Enviar Cadastro
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}

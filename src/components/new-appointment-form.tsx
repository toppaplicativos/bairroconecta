'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Send, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface NewAppointmentFormProps {
  onAppointmentSubmitted: () => void;
}

const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade." }),
  patientName: z.string().min(3, "O nome do paciente é obrigatório."),
  dob: z.date({ required_error: "A data de nascimento é obrigatória." }),
  reason: z.string().min(10, "Descreva brevemente o motivo da consulta."),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function NewAppointmentForm({ onAppointmentSubmitted }: NewAppointmentFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            patientName: "",
            reason: "",
        },
    });

    const onSubmit = async (data: AppointmentFormValues) => {
        setIsSubmitting(true);
        console.log(data);
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
            title: "Solicitação Enviada!",
            description: "Sua solicitação de agendamento foi enviada. Você receberá uma confirmação em breve.",
        });
        setIsSubmitting(false);
        form.reset();
        onAppointmentSubmitted();
    }

    return (
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Especialidade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="clinico-geral">Clínico Geral</SelectItem>
                                <SelectItem value="pediatria">Pediatria</SelectItem>
                                <SelectItem value="ginecologia">Ginecologia</SelectItem>
                                <SelectItem value="odontologia">Odontologia</SelectItem>
                                <SelectItem value="psicologia">Psicologia</SelectItem>
                                <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome do Paciente</FormLabel>
                        <FormControl>
                           <Input placeholder="Nome completo do paciente" {...field} />
                        </FormControl>
                         <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "dd/MM/yyyy")
                                    ) : (
                                        <span>Selecione a data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                         <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Motivo da Consulta</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Descreva brevemente o motivo da consulta" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Solicitar Agendamento
            </Button>
        </form>
        </Form>
    )
}

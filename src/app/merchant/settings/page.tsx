
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const settingsSchema = z.object({
  deliveryTime: z.string().min(1, "O tempo de entrega é obrigatório."),
  deliveryFee: z.coerce.number().min(0, "A taxa de entrega não pode ser negativa."),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function MerchantSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // TODO: Fetch existing settings for the merchant
  const existingSettings = {
    deliveryTime: "30-45 min",
    deliveryFee: 5.99
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: existingSettings,
  });

  async function onSubmit(data: SettingsFormValues) {
    setIsSubmitting(true);
    console.log("Saving settings:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Configurações Salvas!",
      description: "Suas informações de entrega foram atualizadas.",
    });

    setIsSubmitting(false);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as configurações da sua loja.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery</CardTitle>
              <CardDescription>
                Configure as informações de entrega da sua loja.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo de Entrega Estimado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 30-45 min" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxa de Entrega (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="Ex: 5.90" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Alterações
          </Button>
        </form>
      </Form>
    </div>
  );
}

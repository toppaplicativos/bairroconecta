import AIAssistant from "@/components/ai-assistant";
import MainLayout from "@/components/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Home() {
  const userName = "Visitante";
  const neighborhoodName = "seu bairro";

  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Olá, {userName}!
            </h1>
             <p className="text-muted-foreground">
              Bem-vindo ao {neighborhoodName}.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Seu assistente de bairro. Faça uma pergunta sobre o bairro abaixo.
        </p>
        <Card className="col-span-1 lg:col-span-2 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium font-headline">Assistente do Bairro</CardTitle>
            <Sparkles className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <AIAssistant />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
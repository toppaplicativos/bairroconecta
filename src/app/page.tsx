'use client';

import Link from 'next/link';
import {
  Bell,
  Bot,
  MessageSquare,
  Send,
  LifeBuoy,
  Users,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function GuiaLocalPage() {
  const suggestionPrompts = [
    'Preciso de um eletricista',
    'Qual farmácia está aberta agora?',
    'Onde é a feira hoje?',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background p-4 flex justify-between items-center shadow-sm">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-bold font-headline">Bem-vindo ao Meu Bairro!</h1>
          <p className="text-sm text-muted-foreground">Seu hub central da comunidade.</p>
        </div>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* AI Assistant Card */}
        <Card className="bg-card shadow-lg">
          <CardContent className="p-6 space-y-4 text-center">
            <Bot className="h-10 w-10 mx-auto text-primary" />
            <h2 className="text-2xl font-bold font-headline">Assistente Local de IA</h2>
            <p className="text-muted-foreground">Pergunte qualquer coisa sobre o seu bairro!</p>
            
            <div className="space-y-2">
                {suggestionPrompts.map(prompt => (
                    <Button key={prompt} variant="outline" className="w-full justify-start text-muted-foreground">
                        {prompt}
                    </Button>
                ))}
            </div>

            <form className="flex items-center gap-2 pt-4">
              <Input
                type="text"
                placeholder="Escreva sua pergunta aqui..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Access Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 font-headline">Acesso Rápido</h3>
          <div className="space-y-4">
             <Link href="/services">
                <Card className="bg-card hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <LifeBuoy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold font-headline">Serviços</h4>
                      <p className="text-sm text-muted-foreground">Encontre profissionais locais.</p>
                    </div>
                  </CardContent>
                </Card>
             </Link>
             <Link href="/forum">
                 <Card className="bg-card hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold font-headline">Comunidade</h4>
                      <p className="text-sm text-muted-foreground">Participe de discussões.</p>
                    </div>
                  </CardContent>
                </Card>
             </Link>
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation Placeholder */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}

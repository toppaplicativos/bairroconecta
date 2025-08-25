'use client';

import { getHealthTriage } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Bot, Send, UserCircle, Loader, Sparkles } from 'lucide-react';
import React, { useRef, useState, useTransition } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

const suggestions = [
    "Estou com dor de cabeça e febre.",
    "Meu filho caiu e está com dor no braço.",
    "Estou me sentindo muito ansioso(a).",
];

export default function HealthTriageAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => formRef.current?.requestSubmit(), 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    
    startTransition(async () => {
      try {
        const { analysis, suggestedSpecialty } = await getHealthTriage(currentInput);
        const assistantMessage: Message = {
            role: 'assistant',
            content: (
                <div className="space-y-2">
                    <p>{analysis}</p>
                    <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                        <p className="font-semibold text-sm">Especialidade Sugerida:</p>
                        <p className="text-primary font-bold">{suggestedSpecialty}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Atenção: Esta é uma sugestão e não substitui uma consulta médica.
                        </p>
                    </div>
                </div>
            )
        };
        setMessages(prev => [...prev, assistantMessage]);

      } catch (error) {
        const errorMessage: Message = {
            role: 'assistant',
            content: "Desculpe, não consegui processar sua solicitação. Por favor, tente novamente ou procure um profissional diretamente."
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      
      setTimeout(() => {
        if(scrollAreaRef.current) {
           const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
              viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
            }
        }
      }, 100);
    });
  };
  
  const isChatting = messages.length > 0;

  return (
    <div className={cn("flex flex-col", isChatting && "h-[60vh] md:h-auto")}>
        {!isChatting ? (
            <div className="space-y-4 text-center">
                 <div className="p-3 bg-primary/10 rounded-lg inline-block">
                    <Bot className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold font-headline">Como você está se sentindo hoje?</h2>
                    <p className="text-muted-foreground">Descreva seus sintomas para uma pré-triagem com nossa IA.</p>
                </div>
                <div className="space-y-2 pt-2">
                    {suggestions.map((suggestion) => (
                        <Button key={suggestion} variant="outline" size="sm" className="w-full h-auto py-2 leading-snug" onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </Button>
                    ))}
                </div>
            </div>
        ) : (
            <ScrollArea className="flex-1 p-4 -mx-6" ref={scrollAreaRef}>
                <div className="space-y-6 px-6">
                {messages.map((message, index) => (
                    <div
                    key={index}
                    className={cn(
                        'flex items-start gap-3 w-full',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    >
                    {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 bg-primary/10 border border-primary/20">
                           <AvatarFallback><Bot className="text-primary" /></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'rounded-lg px-4 py-3 max-w-[90%] md:max-w-[80%] whitespace-pre-wrap text-sm',
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                    >
                        {message.content}
                    </div>
                    {message.role === 'user' && (
                        <Avatar className="h-8 w-8">
                           <AvatarFallback><UserCircle /></AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isPending && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="h-8 w-8 bg-primary/10 border border-primary/20">
                            <AvatarFallback><Bot className="text-primary" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-4 py-3 max-w-[80%] flex items-center">
                           <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                    )}
                </div>
            </ScrollArea>
        )}
      <div className={cn("pt-4", !isChatting && "mt-4 border-t")}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <Input
            type="text"
            placeholder="Descreva seus sintomas aqui..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}

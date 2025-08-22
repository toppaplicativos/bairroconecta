'use client';

import { askQuestion } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Bot, Send, UserCircle, Loader } from 'lucide-react';
import React, { useRef, useState, useTransition } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const suggestions = [
    "Preciso de um eletricista",
    "Qual farmácia está aberta agora?",
    "Onde é a feira hoje?"
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    formRef.current?.requestSubmit();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    
    startTransition(async () => {
      const { answer } = await askQuestion(currentInput);
      setMessages([...newMessages, { role: 'assistant', content: answer }]);
      
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
    <div className={cn("flex flex-col", isChatting && "h-[60vh]")}>
        {!isChatting ? (
            <div className="space-y-4 text-center">
                 <div className="p-3 bg-primary/10 rounded-lg inline-block">
                    <Bot className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold font-headline">Assistente Local de IA</h2>
                    <p className="text-muted-foreground">Pergunte qualquer coisa sobre o seu bairro!</p>
                </div>
                <div className="space-y-2">
                    {suggestions.map((suggestion) => (
                        <Button key={suggestion} variant="outline" className="w-full" onClick={() => handleSuggestionClick(suggestion)}>
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
                        'flex items-start gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    >
                    {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot className="text-primary" /></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap',
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
                        <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot className="text-primary" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] flex items-center">
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
            placeholder="Escreva sua pergunta aqui..."
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

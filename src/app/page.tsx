'use client';

import Link from 'next/link';
import {
  LifeBuoy,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/main-layout';
import AIAssistant from '@/components/ai-assistant';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

export default function GuiaLocalPage() {

  return (
    <MainLayout>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="bg-card shadow-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                             <div className="p-3 bg-primary/10 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold font-headline">Assistente de IA</h2>
                                <p className="text-muted-foreground">Tire suas dúvidas sobre o bairro e receba ajuda.</p>
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-xl">
                    <DialogHeader>
                    <DialogTitle>Assistente Local de IA</DialogTitle>
                    </DialogHeader>
                    <AIAssistant />
                </DialogContent>
            </Dialog>

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
        </div>
    </MainLayout>
  );
}

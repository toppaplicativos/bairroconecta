
'use client';

import Link from 'next/link';
import {
  LifeBuoy,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/main-layout';
import AIAssistant from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';

export default function GuiaLocalPage() {

  return (
    <MainLayout>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                 <AIAssistant />
              </CardContent>
            </Card>

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
                <Link href="/community">
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

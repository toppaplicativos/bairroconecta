'use client';

import Link from 'next/link';
import {
  LifeBuoy,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Map as MapIcon,
  Store,
  Building2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/main-layout';
import AIAssistant from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';

export default function GuiaLocalPage() {
  const quickLinks = [
    { href: "/properties", label: "Imobiliária", icon: Building2, color: "bg-blue-500", desc: "Casas e apartamentos" },
    { href: "/businesses", label: "Comércio", icon: Store, color: "bg-purple-500", desc: "Lojas e alimentação" },
    { href: "/services", label: "Serviços", icon: LifeBuoy, color: "bg-amber-500", desc: "Profissionais locais" },
    { href: "/community", label: "Comunidade", icon: Users, color: "bg-emerald-500", desc: "Fórum e grupos" },
  ];

  return (
    <MainLayout>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10">
            {/* Seção Hero com IA */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[2rem] -z-10" />
                <Card className="bg-white/40 backdrop-blur-md border-white/50 shadow-2xl overflow-hidden rounded-[2rem]">
                  <CardContent className="p-8">
                     <AIAssistant />
                  </CardContent>
                </Card>
            </div>

            {/* Acesso Rápido Estilizado */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold font-headline flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        Explore o Bairro
                    </h3>
                    <Link href="/map" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                        Abrir Mapa <MapIcon className="h-4 w-4" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((item) => (
                        <Link href={item.href} key={item.label} className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 rounded-[2rem] border-0 bg-card overflow-hidden">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className={cn("p-4 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110", item.color)}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{item.label}</h4>
                                        <p className="text-xs text-muted-foreground leading-tight">{item.desc}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Banner Informativo */}
            <Card className="bg-slate-900 text-white rounded-[2rem] border-0 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold">Problemas no bairro?</h3>
                        <p className="text-slate-400 max-w-md">Use nossa Ouvidoria Inteligente para relatar buracos, falta de luz ou outras demandas. A prefeitura responde mais rápido aqui.</p>
                    </div>
                    <Link href="/ouvidoria">
                        <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-transform px-8 rounded-full font-bold">
                            Abrir Chamado <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </MainLayout>
  );
}

import { cn } from "@/lib/utils";
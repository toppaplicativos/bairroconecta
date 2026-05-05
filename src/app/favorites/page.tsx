'use client';

import MainLayout from "@/components/main-layout";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FavoritesPage() {
    return (
        <MainLayout headerTitle="Favoritos">
            <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Meus Favoritos</h1>
                    <p className="text-muted-foreground">Tudo o que você amou no bairro em um só lugar.</p>
                </div>

                <Tabs defaultValue="properties" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-muted p-1">
                        <TabsTrigger value="properties" className="rounded-xl">Imóveis</TabsTrigger>
                        <TabsTrigger value="businesses" className="rounded-xl">Lojas</TabsTrigger>
                        <TabsTrigger value="services" className="rounded-xl">Serviços</TabsTrigger>
                    </TabsList>
                    
                    {['properties', 'businesses', 'services'].map((tab) => (
                        <TabsContent key={tab} value={tab} className="mt-6">
                            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl text-center space-y-4 bg-card/50">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <Heart className="h-10 w-10 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg">Nada por aqui ainda</h3>
                                    <p className="text-sm text-muted-foreground">Explore o bairro e clique no coração para salvar seus itens preferidos.</p>
                                </div>
                                <Link href={tab === 'properties' ? '/properties' : tab === 'businesses' ? '/businesses' : '/services'}>
                                    <Button className="rounded-full">
                                        <Search className="mr-2 h-4 w-4" />
                                        Explorar agora
                                    </Button>
                                </Link>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </MainLayout>
    );
}
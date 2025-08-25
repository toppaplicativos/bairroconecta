
'use client';
import MainLayout from "@/components/main-layout";
import { serviceListByCategory } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, SlidersHorizontal, Wrench, ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { normalizeString } from "@/lib/utils";

export default function ServicesPage() {

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-6 bg-orange-50/50">
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Qual serviço você precisa?" className="pl-10 bg-white shadow-sm border-0" />
            </div>
            <Button variant="outline" size="icon" className="bg-white shadow-sm border-0">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>

        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Categorias de Serviço</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceListByCategory.map(({ category, icon, services }) => {
                    const categorySlug = normalizeString(category);
                    return (
                        <Link href={`/services/${categorySlug}`} key={category}>
                             <Card className="shadow-sm hover:shadow-lg transition-all flex items-center">
                                <CardContent className="p-4 flex-1 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Wrench className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{category}</CardTitle>
                                            <CardDescription>{services.length} tipos de serviço</CardDescription>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>

        <Card className="text-center">
            <CardContent className="p-6">
                <h3 className="text-lg font-bold font-headline">Você é um prestador de serviço?</h3>
                <p className="text-muted-foreground text-sm mt-2">Junte-se à nossa plataforma e seja encontrado por milhares de clientes no seu bairro.</p>
                <Link href="/services/register">
                    <Button className="mt-4">Cadastre-se Agora</Button>
                </Link>
            </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}

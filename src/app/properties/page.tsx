'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Building,
  Building2,
  Home as HomeIcon,
  LandPlot,
  Map,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import MainLayout from '@/components/main-layout';
import PropertyCard from '@/components/property-card';
import { PropertyFilters } from '@/components/property-filters';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { properties } from '@/lib/data';

const propertyCategories = [
  { name: 'Casas', icon: HomeIcon },
  { name: 'Apartamentos', icon: Building },
  { name: 'Terrenos', icon: LandPlot },
  { name: 'Comerciais', icon: Building2 },
];

export default function PropertiesPage() {
  const [openFilters, setOpenFilters] = useState(false);
  const recommendedProperties = useMemo(() => properties.slice(0, 2), []);
  const nearbyProperties = useMemo(() => properties.slice(2, 8), []);

  return (
    <MainLayout currentMode="properties">
      <PageContainer>
        <SectionHeading
          eyebrow="Imóveis"
          title="Encontre um lugar que faça sentido para a sua rotina"
          description="Busca local, contexto de bairro e opções organizadas para comparar sem ruído."
          action={{ label: 'Explorar no mapa', href: '/map' }}
        />

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border/80 bg-card p-3 shadow-panel sm:flex-row sm:items-center sm:p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rua, condomínio, tipo de imóvel..."
              className="h-11 border-0 bg-slate-50 pl-10 shadow-none focus-visible:bg-white"
            />
          </div>

          <Dialog open={openFilters} onOpenChange={setOpenFilters}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-11 gap-2 px-4">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filtros de busca</DialogTitle>
              </DialogHeader>
              <PropertyFilters onApply={() => setOpenFilters(false)} />
            </DialogContent>
          </Dialog>

          <Button asChild className="h-11 gap-2 px-4">
            <Link href="/map">
              <Map className="h-4 w-4" />
              Mapa
            </Link>
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {propertyCategories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-3 text-left shadow-panel transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float sm:p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-950">{name}</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">Explorar</span>
              </span>
            </button>
          ))}
        </div>

        <section className="mt-10">
          <SectionHeading
            title="Recomendados para você"
            description="Uma seleção curta para começar a explorar sem sobrecarregar a decisão."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {recommendedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} variant="large" />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading
            title="Perto de você"
            description="Imóveis próximos organizados para leitura rápida e comparação."
            action={{ label: 'Abrir mapa', href: '/map' }}
          />
          <div className="mt-5 grid gap-3 xl:grid-cols-2">
            {nearbyProperties.map((property) => (
              <PropertyCard key={property.id} property={property} variant="small" />
            ))}
          </div>
        </section>
      </PageContainer>
    </MainLayout>
  );
}

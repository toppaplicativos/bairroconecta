'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Armchair,
  ArrowRight,
  Bike,
  Map,
  Pill,
  Pizza,
  Scissors,
  Search,
  Shirt,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  Tag,
  Watch,
  X,
} from 'lucide-react';

import BusinessCard from '@/components/business-card';
import MainLayout from '@/components/main-layout';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { getOpenStatus } from '@/lib/business-utils';
import { businesses } from '@/lib/data';

const categories = [
  { name: 'Restaurantes', icon: Pizza, tone: 'bg-orange-50 text-orange-700' },
  { name: 'Moda', icon: Shirt, tone: 'bg-pink-50 text-pink-700' },
  { name: 'Farmácias', icon: Pill, tone: 'bg-blue-50 text-blue-700' },
  { name: 'Eletrônicos', icon: Watch, tone: 'bg-violet-50 text-violet-700' },
  { name: 'Mercados', icon: ShoppingBag, tone: 'bg-emerald-50 text-emerald-700' },
  { name: 'Salões de Beleza', icon: Scissors, tone: 'bg-rose-50 text-rose-700' },
  { name: 'Móveis', icon: Armchair, tone: 'bg-amber-50 text-amber-700' },
  { name: 'Outros', icon: Tag, tone: 'bg-slate-100 text-slate-700' },
];

function BusinessesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('categoria');

  const [searchText, setSearchText] = useState('');
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const activeFiltersCount =
    (openNowOnly ? 1 : 0) + (minRating > 0 ? 1 : 0) + (selectedCategory ? 1 : 0);

  const businessItems = useMemo(() => businesses.filter((business) => business.type === 'business'), []);

  const filtered = useMemo(() => {
    return businessItems.filter((business) => {
      const matchText =
        searchText === '' ||
        business.name.toLowerCase().includes(searchText.toLowerCase()) ||
        business.category.toLowerCase().includes(searchText.toLowerCase());
      const matchCategory = !selectedCategory || business.category === selectedCategory;
      const matchOpen = !openNowOnly || getOpenStatus(business).isOpen;
      const matchRating = business.rating >= minRating;

      return matchText && matchCategory && matchOpen && matchRating;
    });
  }, [businessItems, minRating, openNowOnly, searchText, selectedCategory]);

  const openNow = useMemo(
    () => businessItems.filter((business) => getOpenStatus(business).isOpen).slice(0, 6),
    [businessItems]
  );

  const topRated = useMemo(
    () => [...businessItems].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [businessItems]
  );

  const isFiltering = Boolean(searchText || selectedCategory || openNowOnly || minRating > 0);

  const clearFilters = () => {
    setSearchText('');
    setOpenNowOnly(false);
    setMinRating(0);
    router.push('/businesses');
  };

  return (
    <MainLayout>
      <PageContainer>
        <SectionHeading
          eyebrow="Comércio local"
          title="Descubra negócios que fazem parte da rotina do bairro"
          description="Busca por categoria, disponibilidade e reputação com foco no que está perto de você."
          action={{ label: 'Explorar no mapa', href: '/map' }}
        />

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border/80 bg-card p-3 shadow-panel sm:flex-row sm:items-center sm:p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Nome, categoria ou tipo de comércio..."
              className="h-11 border-0 bg-slate-50 pl-10 shadow-none focus-visible:bg-white"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative h-11 gap-2 px-4">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {activeFiltersCount > 0 ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {activeFiltersCount}
                  </span>
                ) : null}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle>Filtrar comércios</SheetTitle>
              </SheetHeader>

              <div className="space-y-7">
                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <Label htmlFor="open-now" className="font-semibold">Abertos agora</Label>
                    <p className="mt-1 text-xs text-muted-foreground">Mostrar apenas quem está atendendo.</p>
                  </div>
                  <Switch id="open-now" checked={openNowOnly} onCheckedChange={setOpenNowOnly} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Avaliação mínima</Label>
                    <span className="text-xs font-bold text-primary">{minRating > 0 ? `${minRating}★` : 'Qualquer'}</span>
                  </div>
                  <Slider min={0} max={5} step={0.5} value={[minRating]} onValueChange={([value]) => setMinRating(value)} />
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">Categoria</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.name}
                        variant={selectedCategory === category.name ? 'default' : 'outline'}
                        className="cursor-pointer rounded-lg px-3 py-1.5"
                        onClick={() => {
                          router.push(
                            selectedCategory === category.name
                              ? '/businesses'
                              : `/businesses?categoria=${encodeURIComponent(category.name)}`
                          );
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 border-t pt-5">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Limpar
                  </Button>
                  <Button className="flex-1" onClick={() => setFilterOpen(false)}>
                    Aplicar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button asChild className="h-11 gap-2 px-4">
            <a href="/map">
              <Map className="h-4 w-4" />
              Mapa
            </a>
          </Button>
        </div>

        {isFiltering ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {selectedCategory ? (
              <Badge variant="secondary" className="gap-1 rounded-lg px-2.5 py-1.5">
                {selectedCategory}
                <button onClick={() => router.push('/businesses')} aria-label="Remover categoria">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null}
            {openNowOnly ? (
              <Badge variant="secondary" className="gap-1 rounded-lg px-2.5 py-1.5">
                Aberto agora
                <button onClick={() => setOpenNowOnly(false)} aria-label="Remover filtro abertos agora">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null}
            {minRating > 0 ? (
              <Badge variant="secondary" className="gap-1 rounded-lg px-2.5 py-1.5">
                {minRating}★+
                <button onClick={() => setMinRating(0)} aria-label="Remover avaliação mínima">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null}
            <button onClick={clearFilters} className="text-xs font-semibold text-slate-500 hover:text-slate-900">
              Limpar tudo
            </button>
          </div>
        ) : null}

        {!isFiltering ? (
          <>
            <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-panel sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                    <Store className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Descoberta local</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">Compre perto. Fortaleça perto.</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                      Uma vitrine organizada do comércio da região, sem misturar anúncio genérico com o que realmente existe no bairro.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                  <Bike className="h-4 w-4" />
                  Delivery local
                </Button>
              </div>
            </section>

            <section className="mt-8">
              <SectionHeading title="Categorias" description="Comece pelo que você precisa resolver agora." />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
                {categories.map(({ name, icon: Icon, tone }) => (
                  <button
                    key={name}
                    onClick={() => router.push(`/businesses?categoria=${encodeURIComponent(name)}`)}
                    className="group rounded-2xl border border-border/80 bg-card p-3 text-left shadow-panel transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="mt-3 block text-xs font-semibold leading-4 text-slate-800">{name}</span>
                  </button>
                ))}
              </div>
            </section>

            {openNow.length > 0 ? (
              <section className="mt-10">
                <SectionHeading
                  title="Abertos agora"
                  description="Opções que já podem te atender."
                  action={{ label: 'Filtrar todos', href: '/businesses' }}
                />
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                  {openNow.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-10">
              <SectionHeading title="Mais bem avaliados" description="Reputação em destaque para facilitar a escolha." />
              <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {topRated.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </section>

            <section className="mt-10">
              <SectionHeading title="Todos os comércios" description="Explore o catálogo local completo." />
              <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:grid-cols-5">
                {businessItems.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-500">
                {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
              </p>
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-semibold text-primary">
                Limpar busca
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:grid-cols-5">
                {filtered.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-300" />
                <h3 className="mt-4 text-base font-semibold text-slate-900">Nenhum comércio encontrado</h3>
                <p className="mt-1 text-sm text-slate-500">Tente remover algum filtro ou buscar outro termo.</p>
                <Button variant="outline" className="mt-5" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </section>
        )}
      </PageContainer>
    </MainLayout>
  );
}

export default function BusinessesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Carregando comércio local...</div>}>
      <BusinessesContent />
    </Suspense>
  );
}

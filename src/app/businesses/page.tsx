'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search, SlidersHorizontal, ArrowRight, Shirt, Pizza,
  Watch, Armchair, ShoppingBag, Tag, Scissors, Pill, X, Bike
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { businesses } from "@/lib/data";
import { getOpenStatus } from "@/lib/business-utils";
import BusinessCard from "@/components/business-card";
import Autoplay from "embla-carousel-autoplay";

const categories = [
  { name: "Restaurantes", icon: Pizza,     color: "bg-orange-100 text-orange-600" },
  { name: "Moda",         icon: Shirt,     color: "bg-pink-100 text-pink-600" },
  { name: "Farmácias",    icon: Pill,      color: "bg-blue-100 text-blue-600" },
  { name: "Eletrônicos",  icon: Watch,     color: "bg-purple-100 text-purple-600" },
  { name: "Mercados",     icon: ShoppingBag, color: "bg-green-100 text-green-600" },
  { name: "Salões de Beleza", icon: Scissors, color: "bg-rose-100 text-rose-600" },
  { name: "Móveis",       icon: Armchair,  color: "bg-amber-100 text-amber-600" },
  { name: "Outros",       icon: Tag,       color: "bg-gray-100 text-gray-600" },
];

const promoSlides = [
  {
    title: "Semana do Bairro",
    subtitle: "Até 30% de desconto nos restaurantes locais",
    cta: "Ver ofertas",
    gradient: "from-violet-600 to-primary",
  },
  {
    title: "Novos no Bairro",
    subtitle: "Conheça os comércios que acabaram de abrir",
    cta: "Explorar",
    gradient: "from-emerald-600 to-teal-400",
  },
  {
    title: "Delivery Rápido",
    subtitle: "Peça agora e receba em até 45 minutos",
    cta: "Pedir agora",
    gradient: "from-orange-500 to-red-500",
  },
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

  const businessItems = businesses.filter(b => b.type === 'business');

  const filtered = useMemo(() => {
    return businessItems.filter(b => {
      const matchText =
        searchText === '' ||
        b.name.toLowerCase().includes(searchText.toLowerCase()) ||
        b.category.toLowerCase().includes(searchText.toLowerCase());
      const matchCat = !selectedCategory || b.category === selectedCategory;
      const matchOpen = !openNowOnly || getOpenStatus(b).isOpen;
      const matchRating = b.rating >= minRating;
      return matchText && matchCat && matchOpen && matchRating;
    });
  }, [businessItems, searchText, selectedCategory, openNowOnly, minRating]);

  const openNow = useMemo(
    () => businessItems.filter(b => getOpenStatus(b).isOpen),
    [businessItems]
  );
  const topRated = useMemo(
    () => [...businessItems].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [businessItems]
  );

  const isFiltering = !!(searchText || selectedCategory || openNowOnly || minRating > 0);

  const clearFilters = () => {
    setSearchText('');
    setOpenNowOnly(false);
    setMinRating(0);
    router.push('/businesses');
  };

  return (
    <MainLayout currentMode="default">
      <div className="flex-1 space-y-5 p-4 md:p-6 pb-24">

        {/* Search + Filter */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comércios..."
              className="pl-9 bg-card border-border rounded-xl"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative bg-card border-border rounded-xl flex-shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl pb-8">
              <SheetHeader className="mb-4">
                <SheetTitle>Filtrar comércios</SheetTitle>
              </SheetHeader>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="open-now" className="font-semibold text-base">Abertos agora</Label>
                  <Switch id="open-now" checked={openNowOnly} onCheckedChange={setOpenNowOnly} />
                </div>
                <div className="space-y-3">
                  <Label className="font-semibold text-base">
                    Avaliação mínima: {minRating > 0 ? `${minRating}★` : 'Qualquer'}
                  </Label>
                  <Slider
                    min={0} max={5} step={0.5}
                    value={[minRating]}
                    onValueChange={([v]) => setMinRating(v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-base">Categoria</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <Badge
                        key={cat.name}
                        variant={selectedCategory === cat.name ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(
                            selectedCategory === cat.name
                              ? '/businesses'
                              : `/businesses?categoria=${encodeURIComponent(cat.name)}`
                          );
                          setFilterOpen(false);
                        }}
                      >
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => { clearFilters(); setFilterOpen(false); }}
                >
                  Limpar filtros
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filter pills */}
        {isFiltering && (
          <div className="flex items-center gap-2 flex-wrap -mt-2">
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1 pl-2 pr-1">
                {selectedCategory}
                <button onClick={() => router.push('/businesses')} className="ml-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {openNowOnly && (
              <Badge variant="secondary" className="gap-1 pl-2 pr-1">
                Aberto agora
                <button onClick={() => setOpenNowOnly(false)} className="ml-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {minRating > 0 && (
              <Badge variant="secondary" className="gap-1 pl-2 pr-1">
                {minRating}★+
                <button onClick={() => setMinRating(0)} className="ml-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <button onClick={clearFilters} className="text-xs text-muted-foreground underline">
              Limpar tudo
            </button>
          </div>
        )}

        {/* Filtered results */}
        {isFiltering ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filtered.map(b => <BusinessCard key={b.id} business={b} />)}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-semibold">Nenhum comércio encontrado</p>
                <p className="text-sm mt-1">Tente ajustar os filtros</p>
                <Button variant="ghost" className="mt-4" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Promo Carousel */}
            <Carousel
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
            >
              <CarouselContent>
                {promoSlides.map((slide, i) => (
                  <CarouselItem key={i}>
                    <div className={`w-full h-36 rounded-2xl bg-gradient-to-r ${slide.gradient} p-5 flex flex-col justify-between text-white`}>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-75">Destaque</p>
                        <h3 className="text-xl font-bold mt-0.5 leading-tight">{slide.title}</h3>
                        <p className="text-sm opacity-90 mt-0.5">{slide.subtitle}</p>
                      </div>
                      <button className="self-start bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                        {slide.cta} →
                      </button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Categories */}
            <div>
              <h2 className="text-lg font-bold mb-3">Categorias</h2>
              <div className="grid grid-cols-4 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => router.push(`/businesses?categoria=${encodeURIComponent(cat.name)}`)}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-muted/70 transition-colors"
                  >
                    <div className={`p-2.5 rounded-xl ${cat.color}`}>
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <p className="text-[10px] font-semibold leading-tight text-center">{cat.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Open Now */}
            {openNow.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                    <h2 className="text-lg font-bold">Abertos Agora</h2>
                  </div>
                  <button
                    onClick={() => setOpenNowOnly(true)}
                    className="text-sm text-primary font-semibold flex items-center gap-1"
                  >
                    Ver todos <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <Carousel opts={{ align: 'start' }}>
                  <CarouselContent className="-ml-3">
                    {openNow.map(b => (
                      <CarouselItem key={b.id} className="pl-3 basis-3/5 sm:basis-2/5 md:basis-1/4">
                        <BusinessCard business={b} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}

            {/* Top Rated */}
            <div>
              <h2 className="text-lg font-bold mb-3">⭐ Mais Avaliados</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topRated.map(b => <BusinessCard key={b.id} business={b} />)}
              </div>
            </div>

            {/* All */}
            <div>
              <h2 className="text-lg font-bold mb-3">Todos os Comércios</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {businessItems.map(b => <BusinessCard key={b.id} business={b} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default function BusinessesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-muted-foreground">Carregando...</div>}>
      <BusinessesContent />
    </Suspense>
  );
}

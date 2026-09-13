'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, MapPin, Search, SlidersHorizontal, Sparkles, Users } from 'lucide-react';

import EventCard from '@/components/event-card';
import MainLayout from '@/components/main-layout';
import { MetricCard } from '@/components/system/metric-card';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { eventCategories, events } from '@/lib/data';

export default function EventsPage() {
  const [query, setQuery] = useState('');

  const visibleEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return events;

    return events.filter((event) => JSON.stringify(event).toLowerCase().includes(normalized));
  }, [query]);

  return (
    <MainLayout currentMode="events">
      <PageContainer>
        <SectionHeading
          eyebrow="Eventos"
          title="O que acontece no bairro, organizado em uma agenda local"
          description="Feiras, encontros, cultura, esporte e ações comunitárias em uma experiência conectada ao restante da plataforma."
          action={{ label: 'Explorar no mapa', href: '/map' }}
        />

        <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-float">
          <div className="brand-grid grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-orange-300" />
                Agenda hiperlocal
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                Descubra o que vale sair de casa para viver perto de você.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                A agenda local pode combinar eventos públicos, iniciativas comunitárias e atividades de negócios do bairro em uma única camada de descoberta.
              </p>

              <div className="mt-7 flex max-w-2xl gap-3">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar evento, categoria ou organizador..."
                    className="h-12 border-white/10 bg-white/10 pl-11 text-white placeholder:text-slate-500 focus-visible:border-white/20 focus-visible:bg-white/[0.14]"
                  />
                </div>
                <Button variant="outline" className="h-12 w-12 rounded-xl border-white/10 bg-white/10 p-0 text-white hover:bg-white/15 hover:text-white">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 self-end">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <CalendarDays className="h-4 w-4 text-orange-300" />
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{events.length}</p>
                <p className="mt-1 text-xs text-slate-500">eventos cadastrados</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <Users className="h-4 w-4 text-blue-300" />
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Local</p>
                <p className="mt-1 text-xs text-slate-500">comunidade primeiro</p>
              </div>
              <div className="col-span-2 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/10 p-4">
                <MapPin className="h-5 w-5 text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold text-emerald-100">Eventos conectados ao território</p>
                  <p className="mt-0.5 text-xs text-emerald-200/60">Mapa, distância e contexto do bairro entram na mesma jornada.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Agenda" value={String(events.length)} helper="Eventos disponíveis" icon={CalendarDays} trend="local" trendTone="positive" />
          <MetricCard label="Categorias" value={String(eventCategories.length)} helper="Formas de explorar" icon={Sparkles} />
          <MetricCard label="Descoberta" value="Mapa + lista" helper="Duas formas de navegar" icon={MapPin} />
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Categorias"
            title="Explore pelo tipo de experiência"
            description="As categorias orientam a descoberta sem transformar a página em um mural de banners."
          />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {eventCategories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className="group flex min-h-28 flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-panel transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700 ring-1 ring-orange-100">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 text-xs font-semibold text-slate-800">{name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow={query ? 'Resultado da busca' : 'Próximos eventos'}
            title={query ? `${visibleEvents.length} resultado${visibleEvents.length === 1 ? '' : 's'}` : 'Uma agenda para acompanhar o bairro'}
            description={query ? 'A busca acontece sobre o catálogo atual de eventos.' : 'Eventos organizados para leitura rápida em diferentes tamanhos de tela.'}
          />

          {visibleEvents.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <CalendarDays className="mx-auto h-8 w-8 text-slate-300" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">Nenhum evento encontrado</h3>
              <p className="mt-1 text-sm text-slate-500">Tente um termo diferente ou limpe a busca.</p>
              <Button variant="outline" className="mt-5" onClick={() => setQuery('')}>Limpar busca</Button>
            </div>
          )}
        </section>
      </PageContainer>
    </MainLayout>
  );
}

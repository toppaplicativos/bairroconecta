import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CircleDot,
  Clock3,
  HeartPulse,
  Map,
  Megaphone,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Wrench,
} from 'lucide-react';

import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/system/metric-card';
import { ModuleCard } from '@/components/system/module-card';
import { SectionHeading } from '@/components/system/section-heading';

const modules = [
  {
    href: '/properties',
    title: 'Imóveis',
    description: 'Descubra casas, apartamentos e oportunidades próximas com contexto realmente local.',
    eyebrow: 'Morar',
    icon: Building2,
    tone: 'blue' as const,
    meta: 'Venda · aluguel · favoritos',
  },
  {
    href: '/businesses',
    title: 'Comércio local',
    description: 'Encontre negócios do bairro por categoria, distância e disponibilidade.',
    eyebrow: 'Comprar',
    icon: Store,
    tone: 'violet' as const,
    meta: 'Lojas · alimentação · ofertas',
  },
  {
    href: '/services',
    title: 'Serviços',
    description: 'Profissionais locais para resolver necessidades do dia a dia sem sair da região.',
    eyebrow: 'Resolver',
    icon: Wrench,
    tone: 'amber' as const,
    meta: 'Prestadores · agenda · contato',
  },
  {
    href: '/community',
    title: 'Comunidade',
    description: 'Conversas, grupos e decisões que conectam moradores em torno do que importa.',
    eyebrow: 'Participar',
    icon: MessagesSquare,
    tone: 'teal' as const,
    meta: 'Fórum · grupos · enquetes',
  },
  {
    href: '/health-clinic',
    title: 'Saúde',
    description: 'Acesso simples a unidades, orientações e recursos de saúde da região.',
    eyebrow: 'Cuidar',
    icon: HeartPulse,
    tone: 'rose' as const,
    meta: 'Unidades · orientação · agenda',
  },
  {
    href: '/ouvidoria',
    title: 'Ouvidoria',
    description: 'Registre demandas públicas, acompanhe atualizações e mobilize apoio local.',
    eyebrow: 'Melhorar',
    icon: Megaphone,
    tone: 'slate' as const,
    meta: 'Ocorrências · protocolo · apoio',
  },
];

const activity = [
  {
    icon: ShieldCheck,
    title: 'Ouvidoria conectada à comunidade',
    description: 'Demandas podem ganhar apoio e acompanhamento público.',
    time: 'Fluxo do produto',
  },
  {
    icon: Users,
    title: 'Perfis diferentes, mesma plataforma',
    description: 'Morador, comerciante e prestador compartilham uma experiência coerente.',
    time: 'Arquitetura modular',
  },
  {
    icon: Sparkles,
    title: 'IA como camada transversal',
    description: 'Busca, orientação e análise podem aparecer onde realmente ajudam.',
    time: 'Assistente integrado',
  },
];

export default function HomePage() {
  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8 xl:py-8">
        <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-float">
          <div className="brand-grid absolute inset-0 opacity-30" />
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)] lg:px-10 lg:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur">
                <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
                Plataforma local unificada
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
                Tudo que acontece perto de você, organizado em um só lugar.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Comércio, imóveis, serviços, comunidade, saúde e demandas públicas com uma experiência única e preparada para crescer bairro por bairro.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-12 w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 backdrop-blur-xl transition focus-within:border-white/20 focus-within:bg-white/[0.14]">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" />
                  <input
                    aria-label="Buscar no bairro"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                    placeholder="O que você precisa encontrar hoje?"
                  />
                </div>
                <Button asChild className="h-12 shrink-0 rounded-2xl bg-white px-5 font-bold text-slate-950 hover:bg-slate-100">
                  <Link href="/map">
                    Explorar mapa
                    <Map className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="self-end rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Visão local</p>
                  <p className="mt-1 text-lg font-semibold text-white">Seu bairro em tempo real</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <Map className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em]">9</p>
                  <p className="mt-1 text-xs text-slate-400">módulos conectados</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em]">1</p>
                  <p className="mt-1 text-xs text-slate-400">identidade única</p>
                </div>
                <div className="col-span-2 flex items-center gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/10 p-4">
                  <Sparkles className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">IA integrada ao produto</p>
                    <p className="mt-0.5 text-xs text-emerald-200/70">Busca, orientação e análise contextual.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Ecossistema" value="9 módulos" helper="Uma navegação única" icon={CircleDot} trend="modular" />
          <MetricCard label="Experiência" value="3 perfis" helper="Morador, comércio e serviços" icon={Users} trend="unificada" trendTone="positive" />
          <MetricCard label="Território" value="Hiperlocal" helper="Busca guiada pela região" icon={Map} trend="contextual" />
          <MetricCard label="Operação" value="24/7" helper="Base preparada para automações" icon={Clock3} trend="escalável" trendTone="positive" />
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Ecossistema"
              title="Resolva a vida no bairro sem trocar de plataforma"
              description="Cada módulo tem sua própria profundidade, mas todos compartilham identidade, navegação e contexto local."
              action={{ label: 'Ver no mapa', href: '/map' }}
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {modules.map((module) => (
                <ModuleCard key={module.href} {...module} />
              ))}
            </div>

            <section className="mt-10 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">Participação local</p>
                  <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
                    Um problema do bairro pode virar uma demanda acompanhável, não só uma reclamação perdida.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    A Ouvidoria conecta registro, análise, apoio da comunidade e atualização de status em uma jornada simples.
                  </p>
                </div>
                <Button asChild className="h-11 rounded-xl px-5 font-bold">
                  <Link href="/ouvidoria">
                    Abrir Ouvidoria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-panel sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="app-kicker">Produto conectado</p>
                  <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em]">Como as peças se encaixam</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 space-y-5">
                {activity.map(({ icon: Icon, title, description, time }, index) => (
                  <div key={title} className="relative flex gap-3 pl-1">
                    {index < activity.length - 1 ? <span className="absolute left-[17px] top-9 h-[calc(100%+4px)] w-px bg-slate-200" /> : null}
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 ring-4 ring-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 pb-1">
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white shadow-panel sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                <CalendarDays className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">Agenda do bairro</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Eventos comunitários, ações locais, feiras e atividades entram na mesma camada de descoberta.
              </p>
              <Link href="/events" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-300 hover:text-blue-200">
                Explorar eventos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}

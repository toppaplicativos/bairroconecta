import Link from 'next/link';
import { ArrowRight, MessageSquare, Sparkles, Users } from 'lucide-react';

import MainLayout from '@/components/main-layout';
import { MetricCard } from '@/components/system/metric-card';
import { ModuleCard } from '@/components/system/module-card';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Button } from '@/components/ui/button';
import {
  communityHighlights,
  communityMetrics,
  communityModules,
} from '@/features/community/data';

export default function CommunityHubPage() {
  return (
    <MainLayout>
      <PageContainer>
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-panel">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="app-kicker">Comunidade</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
                Informação local ganha valor quando as pessoas conseguem agir juntas.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Fórum, grupos, enquetes e mobilizações no mesmo ambiente, com contexto do bairro e integração com serviços públicos.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5 font-bold">
                  <Link href="/community/forum">
                    Abrir fórum
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5 font-bold">
                  <Link href="/community/chat">Entrar nas conversas</Link>
                </Button>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0 lg:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Contexto local</p>
                  <p className="text-sm font-semibold text-white">Comunidade + serviços públicos</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-400">
                Uma conversa pode virar enquete, evento, alerta ou demanda na Ouvidoria sem perder o histórico e o contexto do bairro.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <Users className="h-4 w-4 text-emerald-300" />
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">326</p>
                  <p className="mt-1 text-xs text-slate-500">interações na semana</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <MessageSquare className="h-4 w-4 text-blue-300" />
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">18</p>
                  <p className="mt-1 text-xs text-slate-500">conversas ativas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {communityMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
              icon={Users}
            />
          ))}
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Ferramentas"
            title="Participe do jeito certo para cada assunto"
            description="A plataforma separa conversa, decisão, ajuda e mobilização sem fragmentar a experiência."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {communityModules.map((module) => (
              <div key={module.title} className={module.status === 'planned' ? 'opacity-55' : ''}>
                <ModuleCard
                  href={module.href}
                  title={module.title}
                  description={module.description}
                  eyebrow={module.status === 'active' ? 'Disponível' : 'Em evolução'}
                  icon={module.icon}
                  tone={module.tone}
                  meta={module.status === 'active' ? 'Abrir módulo' : 'Planejado para próxima fase'}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <SectionHeading
              eyebrow="Agora no bairro"
              title="Conversas que podem virar ação"
              description="Uma leitura rápida do que está mobilizando moradores neste momento."
              action={{ label: 'Ver todo o fórum', href: '/community/forum' }}
            />

            <div className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
              {communityHighlights.map(({ id, title, excerpt, meta, category, icon: Icon }) => (
                <Link
                  href="/community/forum"
                  key={id}
                  className="group flex gap-4 p-5 transition hover:bg-slate-50 sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-blue-50 group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{category}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{meta}</span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-slate-950">{title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{excerpt}</p>
                  </div>
                  <ArrowRight className="mt-1 hidden h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
            <p className="app-kicker text-blue-700">Próximo passo</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">Da conversa para a Ouvidoria</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Quando um assunto exige atuação pública, a jornada continua em uma manifestação rastreável, com status e apoio da comunidade.
            </p>
            <Button asChild variant="outline" className="mt-5 h-11 w-full rounded-xl border-blue-200 bg-white font-bold text-blue-700 hover:bg-blue-100">
              <Link href="/ouvidoria">Abrir Ouvidoria</Link>
            </Button>
          </aside>
        </section>
      </PageContainer>
    </MainLayout>
  );
}

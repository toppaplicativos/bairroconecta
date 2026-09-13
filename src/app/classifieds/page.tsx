'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search, ShieldCheck, SlidersHorizontal, Tags } from 'lucide-react';

import ClassifiedCard from '@/components/classified-card';
import MainLayout from '@/components/main-layout';
import { MetricCard } from '@/components/system/metric-card';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { classifiedAds, classifiedCategories } from '@/features/classifieds/data';

export default function ClassifiedsPage() {
  const [query, setQuery] = useState('');

  const visibleAds = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return classifiedAds;
    return classifiedAds.filter((ad) => JSON.stringify(ad).toLowerCase().includes(normalized));
  }, [query]);

  return (
    <MainLayout currentMode="classifieds">
      <PageContainer>
        <SectionHeading
          eyebrow="Classificados"
          title="Compra e venda entre pessoas do próprio bairro"
          description="Uma experiência local para anunciar, descobrir oportunidades e conversar com mais contexto e menos ruído."
        />

        <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-panel">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                <Tags className="h-5 w-5" />
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
                Um marketplace de bairro precisa parecer confiável antes de parecer movimentado.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                O foco aqui é contexto local, categorias claras e leitura rápida do anúncio — sem transformar a tela em um feed caótico.
              </p>

              <div className="mt-7 flex max-w-2xl gap-3">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar item, categoria ou localização..."
                    className="h-12 bg-slate-50 pl-11 shadow-none focus-visible:bg-white"
                  />
                </div>
                <Button variant="outline" className="h-12 w-12 rounded-xl p-0">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0 lg:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Confiança local</p>
                  <p className="text-sm font-semibold text-white">Base preparada para identidade e reputação</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-400">
                Com o Supabase, anúncios poderão se ligar a perfis verificados, favoritos, conversas e histórico sem acoplar tudo à página.
              </p>
              <Button disabled className="mt-6 h-11 w-full rounded-xl bg-white font-bold text-slate-950 opacity-70">
                Publicar anúncio
              </Button>
              <p className="mt-2 text-center text-[10px] text-slate-600">Publicação será habilitada com Auth e banco.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Anúncios" value={String(classifiedAds.length)} helper="Itens no catálogo atual" icon={Tags} trend="local" trendTone="positive" />
          <MetricCard label="Categorias" value={String(classifiedCategories.length)} helper="Navegação organizada" icon={SlidersHorizontal} />
          <MetricCard label="Segurança" value="Perfis" helper="Camada prevista no backend" icon={ShieldCheck} trend="próxima fase" trendTone="warning" />
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Categorias"
            title="Comece pelo que você está procurando"
            description="Categorias como entrada principal reduzem o peso de um feed infinito."
          />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {classifiedCategories.map(({ name, icon: Icon, href }) => (
              <a
                href={href}
                key={name}
                className="group flex min-h-28 flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-panel transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 flex w-full items-center justify-between gap-2 text-xs font-semibold text-slate-800">
                  {name}
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-700" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow={query ? 'Resultado da busca' : 'Novidades'}
            title={query ? `${visibleAds.length} anúncio${visibleAds.length === 1 ? '' : 's'} encontrado${visibleAds.length === 1 ? '' : 's'}` : 'Anúncios recentes'}
            description={query ? 'Resultados filtrados sobre o catálogo atual.' : 'Uma grade limpa para comparar anúncios sem excesso de elementos.'}
          />

          {visibleAds.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {visibleAds.map((ad) => (
                <ClassifiedCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-300" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">Nenhum anúncio encontrado</h3>
              <p className="mt-1 text-sm text-slate-500">Tente outro termo ou limpe a busca.</p>
              <Button variant="outline" className="mt-5" onClick={() => setQuery('')}>Limpar busca</Button>
            </div>
          )}
        </section>
      </PageContainer>
    </MainLayout>
  );
}

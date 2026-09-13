'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import MainLayout from '@/components/main-layout';
import ProviderCard from '@/components/provider-card';
import ServiceCard from '@/components/service-card';
import { MetricCard } from '@/components/system/metric-card';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { serviceListByCategory, serviceProviders } from '@/lib/data';
import { normalizeString } from '@/lib/utils';

export default function ServicesPage() {
  const [query, setQuery] = useState('');
  const recommendedProviders = useMemo(() => serviceProviders.slice(0, 6), []);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = normalizeString(query.trim());
    if (!normalizedQuery) return serviceListByCategory;

    return serviceListByCategory
      .map((group) => ({
        ...group,
        services: group.services.filter((service) =>
          normalizeString(`${group.category} ${service}`).includes(normalizedQuery)
        ),
      }))
      .filter((group) => group.services.length > 0);
  }, [query]);

  const totalServices = serviceListByCategory.reduce((total, group) => total + group.services.length, 0);

  return (
    <MainLayout currentMode="services">
      <PageContainer>
        <SectionHeading
          eyebrow="Serviços"
          title="Encontre profissionais locais para resolver o que você precisa"
          description="Categorias claras, perfis profissionais e uma jornada preparada para orçamento, agenda e reputação."
        />

        <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-float">
          <div className="brand-grid relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Rede profissional do bairro
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                Da necessidade ao profissional certo, sem sair do contexto local.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Busque por serviço, compare perfis e reputação e, na próxima fase, acompanhe orçamento e agendamento dentro da própria plataforma.
              </p>

              <div className="relative mt-7 max-w-xl">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ex.: eletricista, pintura, ar-condicionado..."
                  className="h-12 border-white/10 bg-white/10 pl-11 text-white shadow-none placeholder:text-slate-500 focus-visible:border-white/20 focus-visible:bg-white/[0.14] focus-visible:ring-white/5"
                />
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-6 lg:border-l lg:border-t-0 lg:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Jornada do serviço</p>
              <div className="mt-5 space-y-4">
                {[
                  ['1', 'Encontrar', 'Serviço, categoria e proximidade'],
                  ['2', 'Comparar', 'Perfil, reputação e experiência'],
                  ['3', 'Contratar', 'Orçamento e disponibilidade'],
                  ['4', 'Acompanhar', 'Agenda e histórico do atendimento'],
                ].map(([step, title, description]) => (
                  <div key={step} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-amber-300">
                      {step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Categorias"
            value={String(serviceListByCategory.length)}
            helper="Áreas de atendimento"
            icon={BriefcaseBusiness}
            trend="organizado"
          />
          <MetricCard
            label="Serviços"
            value={String(totalServices)}
            helper="Opções já catalogadas"
            icon={ShieldCheck}
            trend="local"
            trendTone="positive"
          />
          <MetricCard
            label="Profissionais"
            value={String(serviceProviders.length)}
            helper="Perfis disponíveis"
            icon={Users}
          />
          <MetricCard
            label="Próxima camada"
            value="Agenda"
            helper="Orçamento e contratação"
            icon={CalendarCheck}
            trend="planejado"
            trendTone="warning"
          />
        </section>

        {query ? (
          <section className="mt-10">
            <SectionHeading
              eyebrow="Busca"
              title={`Resultados para “${query}”`}
              description={`${filteredCategories.reduce((total, group) => total + group.services.length, 0)} serviços encontrados no catálogo.`}
            />

            {filteredCategories.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredCategories.flatMap((group) => {
                  const categorySlug = normalizeString(group.category);
                  return group.services.map((service) => (
                    <ServiceCard key={`${group.category}-${service}`} service={service} categorySlug={categorySlug} />
                  ));
                })}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-300" />
                <h3 className="mt-4 text-base font-semibold text-slate-950">Nenhum serviço encontrado</h3>
                <p className="mt-1 text-sm text-slate-500">Tente outro termo ou explore as categorias abaixo.</p>
                <Button variant="outline" className="mt-5" onClick={() => setQuery('')}>
                  Limpar busca
                </Button>
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="mt-10">
              <SectionHeading
                eyebrow="Profissionais"
                title="Recomendados para começar"
                description="Perfis em destaque para você entender rapidamente experiência, reputação e faixa de preço."
              />
              <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {recommendedProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </section>

            <section className="mt-10">
              <SectionHeading
                eyebrow="Catálogo"
                title="Explore por tipo de serviço"
                description="A mesma linguagem visual e de navegação para todas as categorias."
              />

              <div className="mt-5 space-y-8">
                {serviceListByCategory.map(({ category, services }) => {
                  const categorySlug = normalizeString(category);
                  return (
                    <div key={category}>
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">{category}</h3>
                          <p className="mt-1 text-xs text-slate-500">{services.length} serviços disponíveis</p>
                        </div>
                        <Link
                          href={`/services/${categorySlug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-blue-700"
                        >
                          Ver categoria
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                        {services.slice(0, 6).map((service) => (
                          <ServiceCard key={service} service={service} categorySlug={categorySlug} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </PageContainer>
    </MainLayout>
  );
}

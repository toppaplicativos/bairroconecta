import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Megaphone,
  Plus,
  ShieldCheck,
  Users,
} from 'lucide-react';

import MainLayout from '@/components/main-layout';
import { MetricCard } from '@/components/system/metric-card';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Button } from '@/components/ui/button';
import { ombudsmanMetrics, ombudsmanReports, type ReportStatus } from '@/features/ouvidoria/data';
import { cn } from '@/lib/utils';

const metricIcons = [FileText, CheckCircle2, Clock3, Users];

const statusStyles: Record<ReportStatus, string> = {
  received: 'bg-slate-100 text-slate-700 ring-slate-200',
  triage: 'bg-amber-50 text-amber-700 ring-amber-100',
  forwarded: 'bg-blue-50 text-blue-700 ring-blue-100',
  resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

export default function OuvidoriaPage() {
  return (
    <MainLayout>
      <PageContainer>
        <SectionHeading
          eyebrow="Ouvidoria"
          title="Demandas públicas com contexto, transparência e acompanhamento"
          description="Registre ocorrências do bairro, acompanhe cada etapa e veja quando outras pessoas estão enfrentando o mesmo problema."
        />

        <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-float">
          <div className="brand-grid relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                <Megaphone className="h-5 w-5" />
              </div>
              <h2 className="mt-5 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                Uma manifestação não deve desaparecer depois do envio.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                O fluxo do Meu Bairro preserva protocolo, categoria, endereço, atualizações, apoio comunitário e histórico de resolução em uma mesma jornada.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button disabled className="h-11 rounded-xl bg-white px-5 font-bold text-slate-950 opacity-70">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova manifestação
                </Button>
                <span className="self-center text-xs text-slate-500">Envio será habilitado ao conectar o Supabase.</span>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-6 lg:border-l lg:border-t-0 lg:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Jornada de atendimento</p>
              <div className="mt-5 space-y-4">
                {[
                  ['1', 'Recebida', 'Protocolo e localização registrados'],
                  ['2', 'Triagem', 'Categoria, prioridade e órgão responsável'],
                  ['3', 'Encaminhada', 'Acompanhamento e atualizações públicas'],
                  ['4', 'Resolvida', 'Conclusão documentada no histórico'],
                ].map(([step, title, description]) => (
                  <div key={step} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-blue-300">
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
          {ombudsmanMetrics.map((metric, index) => {
            const Icon = metricIcons[index];
            return (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                helper={metric.helper}
                icon={Icon}
                trend={index === 1 ? 'acompanhável' : undefined}
                trendTone={index === 1 ? 'positive' : 'neutral'}
              />
            );
          })}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <SectionHeading
              eyebrow="Mural público"
              title="Demandas recentes"
              description="Leitura rápida de status, contexto e apoio da comunidade."
            />

            <div className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
              {ombudsmanReports.map((report) => (
                <article key={report.id} className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{report.id}</span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-semibold text-slate-500">{report.category}</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-slate-950">{report.title}</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{report.description}</p>
                    </div>
                    <span className={cn('w-fit shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1', statusStyles[report.status])}>
                      {report.statusLabel}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span>{report.address}</span>
                      <span>{report.updatedAt}</span>
                      <span className="font-semibold text-slate-700">{report.supporters} apoios</span>
                    </div>
                    <button className="inline-flex items-center gap-1.5 self-start font-bold text-primary sm:self-auto">
                      Ver acompanhamento
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">Transparência por padrão</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Status e histórico ficam visíveis para reduzir duplicidade de relatos e facilitar mobilização comunitária.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel">
              <p className="app-kicker">Também pode ajudar</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">Converse antes de abrir uma demanda</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Veja se outros moradores já estão discutindo o assunto e reúna evidências ou apoio antes do protocolo.
              </p>
              <Button asChild variant="outline" className="mt-5 h-11 w-full rounded-xl font-bold">
                <Link href="/community">Abrir Comunidade</Link>
              </Button>
            </div>
          </aside>
        </section>
      </PageContainer>
    </MainLayout>
  );
}

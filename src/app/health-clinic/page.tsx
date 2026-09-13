import type { SVGProps } from 'react';
import Link from 'next/link';
import {
  Baby,
  Bone,
  Bot,
  Brain,
  CalendarCheck,
  HeartPulse,
  PlusCircle,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

import DoctorCard from '@/components/doctor-card';
import HealthTriageAssistant from '@/components/health-triage-assistant';
import MainLayout from '@/components/main-layout';
import { MetricCard } from '@/components/system/metric-card';
import { PageContainer } from '@/components/system/page-container';
import { SectionHeading } from '@/components/system/section-heading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { appointments, healthProfessionals, specialties } from '@/features/health/data';

const ToothIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3c-2.4 0-4.5-1.2-6.4-.4C3.6 3.5 3 6.3 3.5 9c.7 3.8 2.2 8.8 4.2 11 .7.8 1.8.5 2-.5l.8-4.2c.2-1.1.8-1.8 1.5-1.8s1.3.7 1.5 1.8l.8 4.2c.2 1 1.3 1.3 2 .5 2-2.2 3.5-7.2 4.2-11 .5-2.7-.1-5.5-2.1-6.4C16.5 1.8 14.4 3 12 3Z" />
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Tooth: ToothIcon,
  Baby,
  Brain,
  Bone,
  PlusCircle,
};

export default function HealthClinicPage() {
  return (
    <MainLayout>
      <PageContainer>
        <SectionHeading
          eyebrow="Saúde"
          title="Cuidados e serviços de saúde dentro do contexto do bairro"
          description="Especialidades, profissionais, orientação assistida e agendamentos em uma jornada preparada para integração com o backend."
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)]">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-float sm:p-8 lg:p-10">
            <div className="brand-grid">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                <HeartPulse className="h-3.5 w-3.5 text-rose-300" />
                Portal local de saúde
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                Encontre o próximo passo sem transformar orientação em diagnóstico.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                A experiência combina descoberta de profissionais e unidades com uma camada de IA orientativa, mantendo limites claros para situações que exigem atendimento médico.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <p className="mt-3 text-sm font-semibold text-white">Orientação com limites claros</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">IA não substitui consulta, diagnóstico ou emergência.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <CalendarCheck className="h-5 w-5 text-blue-300" />
                  <p className="mt-3 text-sm font-semibold text-white">Agenda conectável</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">A camada de agendamento será persistida no Supabase.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Triagem orientativa</p>
                <p className="text-xs text-slate-500">Assistente para organizar sintomas e próximos passos.</p>
              </div>
            </div>
            <HealthTriageAssistant />
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Especialidades" value={String(specialties.length)} helper="Áreas disponíveis" icon={Stethoscope} />
          <MetricCard label="Profissionais" value={String(healthProfessionals.length)} helper="Perfis no catálogo" icon={HeartPulse} trend="local" trendTone="positive" />
          <MetricCard label="Agenda" value={String(appointments.length)} helper="Itens demonstrativos" icon={CalendarCheck} trend="Supabase" trendTone="warning" />
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Especialidades"
            title="Comece pelo tipo de atendimento"
            description="Uma entrada simples para chegar aos profissionais e recursos adequados."
          />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {specialties.map((specialty) => {
              const Icon = iconMap[specialty.icon] ?? Stethoscope;
              return (
                <Link
                  href="#"
                  key={specialty.name}
                  className="group flex min-h-28 flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-panel transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-4 text-xs font-semibold text-slate-800">{specialty.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Profissionais"
            title="Atendimento disponível na região"
            description="Perfis organizados para leitura e comparação antes do agendamento."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {healthProfessionals.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <SectionHeading
              eyebrow="Agenda"
              title="Meus agendamentos"
              description="A interface já está preparada; persistência e autenticação entram quando o Supabase estiver conectado."
            />
            <div className="mt-5 space-y-3">
              {appointments.length > 0 ? appointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <Avatar className="h-11 w-11 border border-slate-200">
                      <AvatarFallback>{appointment.doctor.charAt(4)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">{appointment.specialty}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm font-semibold text-primary">{appointment.date} · {appointment.time}</p>
                    <p className="mt-1 text-xs text-slate-400">Agendamento demonstrativo</p>
                  </div>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">Nenhum agendamento no momento.</div>
              )}
            </div>
          </div>

          <aside className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
            <p className="app-kicker text-blue-700">Próxima etapa</p>
            <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">Agendamento transacional</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Auth, disponibilidade, criação, cancelamento e histórico serão conectados ao backend em vez de ficarem presos ao componente de interface.
            </p>
            <Button disabled className="mt-5 h-11 w-full rounded-xl font-bold opacity-70">
              <PlusCircle className="mr-2 h-4 w-4" />
              Agendar consulta
            </Button>
          </aside>
        </section>
      </PageContainer>
    </MainLayout>
  );
}

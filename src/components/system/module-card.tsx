import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type ModuleCardProps = {
  href: string;
  title: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  tone?: 'blue' | 'teal' | 'amber' | 'violet' | 'rose' | 'slate';
  meta?: string;
};

const tones = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  teal: 'bg-teal-50 text-teal-700 ring-teal-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  violet: 'bg-violet-50 text-violet-700 ring-violet-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export function ModuleCard({
  href,
  title,
  description,
  eyebrow,
  icon: Icon,
  tone = 'blue',
  meta,
}: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-panel transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl ring-1', tones[tone])}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700" />
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      {meta ? (
        <div className="mt-5 border-t border-border/70 pt-4 text-xs font-semibold text-slate-500">
          {meta}
        </div>
      ) : null}
    </Link>
  );
}

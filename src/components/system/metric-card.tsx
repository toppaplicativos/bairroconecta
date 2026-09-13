import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  trend?: string;
  trendTone?: 'positive' | 'neutral' | 'warning';
};

const trendTones = {
  positive: 'bg-success/10 text-success ring-success/20',
  neutral: 'bg-muted text-muted-foreground ring-border',
  warning: 'bg-warning/10 text-warning ring-warning/20',
};

export function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  trend,
  trendTone = 'neutral',
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <p className="text-xs text-muted-foreground">{helper}</p>
        {trend ? (
          <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1', trendTones[trendTone])}>
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}

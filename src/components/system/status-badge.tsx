import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: StatusTone;
  icon?: LucideIcon;
  className?: string;
};

const tones: Record<StatusTone, string> = {
  neutral: 'border-border bg-muted text-muted-foreground',
  info: 'border-blue-500/15 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  success: 'border-emerald-500/15 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  danger: 'border-red-500/15 bg-red-500/10 text-red-700 dark:text-red-300',
};

export function StatusBadge({ children, tone = 'neutral', icon: Icon, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-[-0.01em]',
        tones[tone],
        className
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: 'page' | 'section' | 'compact';
  action?: {
    label: string;
    href: string;
  };
  className?: string;
};

const titleStyles = {
  page: 'text-3xl sm:text-4xl',
  section: 'text-2xl sm:text-[28px]',
  compact: 'text-xl sm:text-2xl',
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  variant = 'section',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="min-w-0 max-w-3xl">
        {eyebrow ? <p className="app-kicker text-primary">{eyebrow}</p> : null}
        <h2 className={cn('mt-1 font-semibold tracking-[-0.035em] text-foreground', titleStyles[variant])}>{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex min-h-10 shrink-0 items-center gap-2 self-start rounded-xl px-1 text-sm font-semibold text-primary transition hover:text-primary/80 active:scale-[0.98] sm:self-auto"
        >
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

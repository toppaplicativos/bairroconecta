import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
};

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-[28px]">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-700">
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

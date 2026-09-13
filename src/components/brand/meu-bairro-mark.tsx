import { cn } from '@/lib/utils';

type MeuBairroMarkProps = {
  className?: string;
  title?: string;
};

/**
 * Proprietary Meu Bairro brand mark.
 * Combines a location silhouette with a compact neighborhood/roof geometry.
 * Keep this asset SVG-first so it remains crisp across app, PWA and native shells.
 */
export function MeuBairroMark({ className, title = 'Meu Bairro' }: MeuBairroMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={cn('h-6 w-6', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2.75c-6.49 0-11.75 5.02-11.75 11.22 0 7.76 8.89 14.04 10.93 15.39a1.49 1.49 0 0 0 1.64 0c2.04-1.35 10.93-7.63 10.93-15.39C27.75 7.77 22.49 2.75 16 2.75Z"
        fill="currentColor"
      />
      <path
        d="M9.25 14.06 16 8.65l6.75 5.41v6.19a1.5 1.5 0 0 1-1.5 1.5h-10.5a1.5 1.5 0 0 1-1.5-1.5v-6.19Z"
        fill="white"
        fillOpacity="0.98"
      />
      <path d="M7.9 14.5 16 8l8.1 6.5" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 21.75v-5.5h6v5.5" fill="currentColor" />
      <path d="M11.1 13.95v7.8M20.9 13.95v7.8" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.18" />
      <path d="M15 17.5h2v2h-2z" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

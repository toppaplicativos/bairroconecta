'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = 'Não foi possível carregar esta área',
  description = 'O restante do app continua disponível. Tente novamente quando quiser.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('rounded-2xl border border-red-500/15 bg-red-500/5 p-6', className)} role="alert">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-300">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
          {onRetry ? (
            <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
              <RotateCcw className="h-4 w-4" />
              Tentar novamente
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';

import { ErrorState } from '@/components/system/error-state';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[Meu Bairro] route error', error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <ErrorState
        title="Esta área encontrou um problema"
        description="A navegação principal continua disponível. Você pode tentar recarregar somente esta parte do aplicativo."
        onRetry={reset}
      />
    </div>
  );
}

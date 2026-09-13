'use client';

import { RotateCcw, ShieldAlert } from 'lucide-react';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-white">
        <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
          <div className="w-full rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Meu Bairro</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">O aplicativo encontrou um erro inesperado</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              Nenhum dado foi alterado por esta tela. Tente reiniciar a interface; se o problema persistir, os logs do ambiente poderão indicar a origem.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-950 transition hover:bg-slate-100 active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reiniciar interface
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

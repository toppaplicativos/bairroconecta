'use client';

import { useEffect, useMemo, useState } from 'react';
import { Command, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { navigationGroups } from '@/config/navigation';
import { track } from '@/lib/analytics';

const searchableItems = navigationGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.label }))
);

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const openMenu = () => {
    track('global_search_open');
    setOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => {
          if (!current) track('global_search_open', { source: 'keyboard' });
          return !current;
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) return searchableItems;
    return searchableItems.filter((item) =>
      `${item.label} ${item.description} ${item.group}`.toLocaleLowerCase('pt-BR').includes(normalized)
    );
  }, [query]);

  const navigate = (href: string) => {
    track('global_search_navigate', { href, query: query || null });
    setOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        className="flex h-10 w-full items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
        aria-label="Abrir busca global"
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">Buscar imóveis, lojas, serviços, eventos...</span>
        <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground xl:flex">
          <Command className="h-3 w-3" aria-hidden="true" /> K
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden border-border bg-card p-0 sm:max-w-xl">
          <DialogHeader className="sr-only"><DialogTitle>Busca global</DialogTitle></DialogHeader>
          <div className="flex h-14 items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque uma área do Meu Bairro..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">Esc</kbd>
          </div>

          <div className="max-h-[58vh] overflow-y-auto p-2 app-scrollbar">
            {results.length > 0 ? results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground group-hover:text-foreground">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.description}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{item.group}</span>
                </button>
              );
            }) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-semibold text-foreground">Nenhuma área encontrada</p>
                <p className="mt-1 text-xs text-muted-foreground">A busca global ganhará conteúdo real assim que os repositórios Supabase entrarem.</p>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
            Navegação rápida do produto · conteúdo global entra na próxima camada de dados
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

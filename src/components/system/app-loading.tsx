import { Skeleton } from '@/components/ui/skeleton';

export function AppLoading() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8 xl:py-8" aria-busy="true" aria-label="Carregando conteúdo">
      <div className="space-y-3">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-9 w-[min(520px,80%)] rounded-xl" />
        <Skeleton className="h-5 w-[min(680px,92%)] rounded-lg" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-3 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton className="mt-6 h-px w-full" />
            <Skeleton className="mt-4 h-3 w-32 rounded-full" />
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-border bg-card p-5">
            <Skeleton className="h-36 w-full rounded-xl" />
            <Skeleton className="mt-4 h-5 w-2/3 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-full rounded-lg" />
            <Skeleton className="mt-2 h-4 w-4/5 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

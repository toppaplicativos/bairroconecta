import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Business } from '@/lib/data';
import { getOpenStatus } from '@/lib/business-utils';
import { cn } from '@/lib/utils';

type BusinessCardProps = {
  business: Business;
  showOpenBadge?: boolean;
};

export default function BusinessCard({ business, showOpenBadge = true }: BusinessCardProps) {
  const status = getOpenStatus(business);

  return (
    <Link href={`/businesses/${business.id}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
      <Card className="h-full overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={business.imageUrl}
            alt={business.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
            className="object-cover transition duration-500 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            {showOpenBadge ? (
              <Badge
                className={cn(
                  'rounded-lg border px-2.5 py-1 text-[10px] font-bold shadow-sm backdrop-blur',
                  status.isOpen
                    ? 'border-emerald-200 bg-emerald-50/95 text-emerald-700 hover:bg-emerald-50/95'
                    : 'border-slate-200 bg-white/90 text-slate-600 hover:bg-white/90'
                )}
              >
                {status.isOpen ? 'Aberto agora' : 'Fechado'}
              </Badge>
            ) : (
              <span />
            )}

            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition group-hover:text-primary">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{business.category}</p>
          <h3 className="mt-1.5 line-clamp-1 text-base font-semibold tracking-[-0.02em] text-slate-950">{business.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{business.description}</p>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="line-clamp-1">{business.address}</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {business.rating}
              <span className="text-xs font-medium text-slate-400">({business.reviewsCount})</span>
            </div>
            <span className="text-xs font-bold text-primary">Ver negócio</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

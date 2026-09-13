'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Star } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Business } from '@/lib/data';

type ProviderCardProps = {
  provider: Business;
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const formattedRating = provider.rating.toFixed(1);

  return (
    <Link href={`/services/provider/${provider.id}`} className="group block h-full">
      <Card className="flex h-full gap-4 overflow-hidden p-3 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float sm:p-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28">
          <Image
            src={provider.imageUrl}
            alt={provider.name}
            fill
            sizes="112px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            data-ai-hint={provider.hint}
          />
        </div>

        <div className="min-w-0 flex-1 py-1">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {formattedRating}
              <span className="font-medium text-amber-600/70">({provider.reviewsCount})</span>
            </span>
            {provider.pricePerHour ? (
              <span className="text-xs font-semibold text-slate-500">R$ {provider.pricePerHour}/h</span>
            ) : null}
          </div>

          <h3 className="mt-3 truncate text-base font-semibold tracking-[-0.02em] text-slate-950">{provider.name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
            <Briefcase className="h-3.5 w-3.5" />
            <span>{provider.experience} anos de experiência</span>
          </div>

          <p className="mt-4 text-xs font-bold text-primary">Ver perfil profissional</p>
        </div>
      </Card>
    </Link>
  );
}

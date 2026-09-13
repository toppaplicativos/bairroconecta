'use client';

import Link from 'next/link';
import { ArrowUpRight, Wrench } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { normalizeString } from '@/lib/utils';

type ServiceCardProps = {
  service: string;
  categorySlug: string;
};

export default function ServiceCard({ service, categorySlug }: ServiceCardProps) {
  const serviceSlug = normalizeString(service);

  return (
    <Link href={`/services/${categorySlug}/${serviceSlug}`} className="group block h-full">
      <Card className="flex h-full min-h-36 flex-col justify-between p-4 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Wrench className="h-5 w-5" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700" />
        </div>
        <div className="mt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Serviço local</p>
          <h3 className="mt-1.5 text-sm font-semibold leading-5 text-slate-950">{service}</h3>
        </div>
      </Card>
    </Link>
  );
}

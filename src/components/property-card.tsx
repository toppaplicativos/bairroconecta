import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type Property = {
  id: number;
  imagem: string;
  hint: string;
  tipo: string;
  titulo: string;
  local: string;
  avaliacao: number;
  preco: string;
  periodo: string;
};

type PropertyCardProps = {
  property: Property;
  variant?: 'large' | 'small';
};

export default function PropertyCard({ property, variant = 'large' }: PropertyCardProps) {
  if (variant === 'small') {
    return (
      <Link href={`/properties/${property.id}`} className="group block">
        <Card className="flex items-center gap-4 overflow-hidden p-3 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float">
          <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-32">
            <Image
              src={property.imagem}
              alt={property.titulo}
              fill
              sizes="128px"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              data-ai-hint={property.hint}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary" className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 hover:bg-blue-50">
                {property.tipo}
              </Badge>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {property.avaliacao}
              </div>
            </div>
            <h3 className="mt-2 truncate text-sm font-semibold tracking-[-0.01em] text-slate-950">{property.titulo}</h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{property.local}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-950">
              R$ {property.preco}
              <span className="ml-1 text-xs font-medium text-slate-400">{property.periodo}</span>
            </p>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={property.imagem}
            alt={property.titulo}
            fill
            sizes="(max-width: 768px) 80vw, 480px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            data-ai-hint={property.hint}
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <Badge className="rounded-lg border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur hover:bg-white/90">
              {property.tipo}
            </Badge>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-slate-600 shadow-sm backdrop-blur">
              <Heart className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold tracking-[-0.02em] text-slate-950">{property.titulo}</h3>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{property.local}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {property.avaliacao}
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
            <p>
              <span className="text-lg font-semibold tracking-[-0.02em] text-slate-950">R$ {property.preco}</span>
              <span className="ml-1 text-xs font-medium text-slate-400">{property.periodo}</span>
            </p>
            <span className="text-xs font-bold text-primary">Ver imóvel</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

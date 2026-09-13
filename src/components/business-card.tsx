'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { auth, db } from '@/lib/firebase';
import { Business } from '@/lib/data';
import { getOpenStatus } from '@/lib/business-utils';
import { cn } from '@/lib/utils';

type BusinessCardProps = {
  business: Business;
  showOpenBadge?: boolean;
};

export default function BusinessCard({ business, showOpenBadge = true }: BusinessCardProps) {
  const status = getOpenStatus(business);
  const [user] = useAuthState(auth);
  const [isFav, setIsFav] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!user) return;
    const favRef = doc(db, 'favorites', `${user.uid}_${business.id}`);
    getDoc(favRef).then((snap) => setIsFav(snap.exists()));
  }, [user, business.id]);

  const toggleFav = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return;

    const favRef = doc(db, 'favorites', `${user.uid}_${business.id}`);
    if (isFav) {
      await deleteDoc(favRef);
      setIsFav(false);
      return;
    }

    await setDoc(favRef, {
      userId: user.uid,
      businessId: business.id,
      createdAt: serverTimestamp(),
    });
    setIsFav(true);
  };

  return (
    <Link href={`/businesses/${business.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {!imgError ? (
            <Image
              src={business.imageUrl}
              alt={business.name}
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
              <span className="text-5xl font-semibold text-blue-200">{business.name.charAt(0)}</span>
            </div>
          )}

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

            {user ? (
              <button
                onClick={toggleFav}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:scale-105"
                aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart className={cn('h-4 w-4 transition', isFav && 'fill-rose-500 text-rose-500')} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{business.category}</p>
          <h3 className="mt-1.5 line-clamp-1 text-base font-semibold tracking-[-0.02em] text-slate-950">{business.name}</h3>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {business.rating}
              <span className="text-xs font-medium text-slate-400">({business.reviewsCount})</span>
            </div>
            <span className="text-xs font-bold text-primary">Ver perfil</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

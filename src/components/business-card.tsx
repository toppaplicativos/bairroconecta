'use client';

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import { Business } from "@/lib/data";
import { getOpenStatus } from "@/lib/business-utils";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

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
    getDoc(favRef).then(snap => setIsFav(snap.exists()));
  }, [user, business.id]);

  const toggleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    const favRef = doc(db, 'favorites', `${user.uid}_${business.id}`);
    if (isFav) {
      await deleteDoc(favRef);
      setIsFav(false);
    } else {
      await setDoc(favRef, { userId: user.uid, businessId: business.id, createdAt: serverTimestamp() });
      setIsFav(true);
    }
  };

  return (
    <Link href={`/businesses/${business.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group border-border/60">
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          {!imgError ? (
            <Image
              src={business.imageUrl}
              alt={business.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-5xl font-bold text-primary/30">{business.name.charAt(0)}</span>
            </div>
          )}
          {user && (
            <button
              onClick={toggleFav}
              className="absolute top-2 right-2 p-1.5 bg-white/85 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
            >
              <Heart className={cn("w-4 h-4 transition-colors", isFav ? "text-red-500 fill-red-500" : "text-gray-500")} />
            </button>
          )}
          {showOpenBadge && (
            <Badge
              className={cn(
                "absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5",
                status.isOpen
                  ? "bg-green-500 hover:bg-green-500 text-white"
                  : "bg-black/60 hover:bg-black/60 text-white"
              )}
            >
              {status.isOpen ? 'Aberto' : 'Fechado'}
            </Badge>
          )}
        </div>
        <CardContent className="p-3 flex-grow">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{business.category}</p>
          <p className="font-bold text-sm leading-tight mt-0.5 line-clamp-1">{business.name}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">{business.rating}</span>
            <span className="text-xs text-muted-foreground">({business.reviewsCount})</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

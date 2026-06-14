'use client';

import { useParams } from 'next/navigation';
import { businesses } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Star, Phone, MapPin, Share2, Heart,
  MessageCircle, Clock
} from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/product-card';
import NewReviewForm from '@/components/new-review-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOpenStatus } from '@/lib/business-utils';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import {
  collection, query, where, onSnapshot,
  doc, setDoc, deleteDoc, getDoc, serverTimestamp
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { cn } from '@/lib/utils';

type FirestoreReview = {
  id: string;
  author: string;
  avatarUrl: string | null;
  rating: number;
  comment: string;
  createdAt: any;
};

export default function BusinessStorefrontPage() {
  const params = useParams();
  const id = params?.id as string;
  const business = businesses.find(b => b.id.toString() === id);

  const [user] = useAuthState(auth);
  const [firestoreReviews, setFirestoreReviews] = useState<FirestoreReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [coverError, setCoverError] = useState(false);

  // Real-time reviews from Firestore
  useEffect(() => {
    if (!id) return;
    const q = query(collection(db, 'business_reviews'), where('businessId', '==', id));
    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as FirestoreReview))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setFirestoreReviews(docs);
      setReviewsLoading(false);
    }, () => setReviewsLoading(false));
    return () => unsub();
  }, [id]);

  // Favorite status
  useEffect(() => {
    if (!user || !id) return;
    getDoc(doc(db, 'favorites', `${user.uid}_${id}`)).then(snap => setIsFav(snap.exists()));
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) return;
    const favRef = doc(db, 'favorites', `${user.uid}_${id}`);
    if (isFav) {
      await deleteDoc(favRef);
      setIsFav(false);
    } else {
      await setDoc(favRef, { userId: user.uid, businessId: id, createdAt: serverTimestamp() });
      setIsFav(true);
    }
  };

  const handleShare = async () => {
    if (!business) return;
    if (navigator.share) {
      await navigator.share({ title: business.name, url: window.location.href }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  if (!business) {
    return (
      <MainLayout headerType="detail" headerTitle="Loja não encontrada">
        <div className="text-center p-8 text-muted-foreground">
          <p className="text-lg font-semibold">Este estabelecimento não foi encontrado.</p>
        </div>
      </MainLayout>
    );
  }

  const status = getOpenStatus(business);
  const allReviews = [...business.reviews, ...firestoreReviews];
  const avgRating =
    allReviews.length
      ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
      : business.rating;
  const totalReviews = allReviews.length || business.reviewsCount;

  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: allReviews.filter(r => r.rating === star).length,
    pct: allReviews.length
      ? Math.round((allReviews.filter(r => r.rating === star).length / allReviews.length) * 100)
      : 0,
  }));

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapUrl =
    business.latitude && business.longitude && MAPBOX_TOKEN
      ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ef4444(${business.longitude},${business.latitude})/${business.longitude},${business.latitude},15/600x240@2x?access_token=${MAPBOX_TOKEN}`
      : null;

  const whatsappNumber = business.phone.replace(/\D/g, '');

  return (
    <MainLayout headerType="detail" headerTitle={business.name}>
      <div className="flex-1 pb-8">
        {/* Cover image */}
        <div className="relative h-52 md:h-72 w-full bg-muted">
          {!coverError ? (
            <Image
              src={business.coverImageUrl}
              alt={`Capa de ${business.name}`}
              layout="fill"
              objectFit="cover"
              onError={() => setCoverError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
              <span className="text-7xl font-bold text-primary/20">{business.name.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>

        <div className="px-4 md:px-8 -mt-16 relative z-10 space-y-5">
          {/* Logo + header info */}
          <div className="flex items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl bg-background flex-shrink-0">
              <AvatarImage src={business.logoUrl} />
              <AvatarFallback className="text-3xl font-bold text-primary bg-primary/10">
                {business.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="pb-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary">{business.category}</Badge>
                <Badge
                  className={cn(
                    "text-xs font-semibold",
                    status.isOpen
                      ? "bg-green-500 hover:bg-green-500 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mr-1.5 inline-block",
                    status.isOpen ? "bg-white animate-pulse" : "bg-muted-foreground"
                  )} />
                  {status.label}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold mt-1 leading-tight line-clamp-1">{business.name}</h1>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{avgRating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({totalReviews} avaliações)</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-2">
            <a href={`tel:${business.phone}`} className="col-span-1">
              <Button variant="outline" className="w-full flex-col h-14 gap-0.5 rounded-xl">
                <Phone className="h-4 w-4" />
                <span className="text-[10px] font-semibold">Ligar</span>
              </Button>
            </a>
            <a
              href={`https://wa.me/55${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1"
            >
              <Button variant="outline" className="w-full flex-col h-14 gap-0.5 rounded-xl">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span className="text-[10px] font-semibold">WhatsApp</span>
              </Button>
            </a>
            <Button
              variant="outline"
              className="flex-col h-14 gap-0.5 rounded-xl"
              onClick={toggleFav}
            >
              <Heart className={cn("h-4 w-4", isFav ? "fill-red-500 text-red-500" : "")} />
              <span className="text-[10px] font-semibold">{isFav ? 'Salvo' : 'Favoritar'}</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-14 gap-0.5 rounded-xl"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Compartilhar</span>
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl">
              <TabsTrigger value="store">Loja</TabsTrigger>
              <TabsTrigger value="about">Sobre</TabsTrigger>
              <TabsTrigger value="reviews">
                Avaliações
                {totalReviews > 0 && (
                  <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
                    {totalReviews}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* ── LOJA ── */}
            <TabsContent value="store" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nossos Produtos</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {business.products.length > 0 ? (
                    business.products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm col-span-full text-center py-10">
                      Nenhum produto cadastrado ainda.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── SOBRE ── */}
            <TabsContent value="about" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-muted-foreground leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Informações</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{business.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <a href={`tel:${business.phone}`} className="text-primary underline">
                      {business.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Horário de funcionamento</p>
                      {business.hours.map(h => (
                        <p key={h.day} className="text-muted-foreground">
                          {h.day}:{' '}
                          <span className="font-medium text-foreground">{h.time}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mini-map */}
              {mapUrl && (
                <Card className="overflow-hidden">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base">Localização</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${business.latitude},${business.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src={mapUrl}
                        alt="Localização no mapa"
                        width={600}
                        height={240}
                        className="w-full object-cover"
                      />
                      <div className="px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{business.address}</span>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              )}

              {/* Gallery with lightbox */}
              {business.gallery.length > 0 && (
                <Card>
                  <CardHeader><CardTitle>Galeria</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2">
                    {business.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setLightboxImg(img.url)}
                        className="relative aspect-square rounded-lg overflow-hidden hover:opacity-85 transition-opacity"
                      >
                        <Image src={img.url} alt={img.hint} layout="fill" objectFit="cover" />
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* ── AVALIAÇÕES ── */}
            <TabsContent value="reviews" className="mt-4 space-y-4">
              {/* Rating summary */}
              {allReviews.length > 0 && (
                <Card>
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-5">
                      <div className="text-center shrink-0">
                        <p className="text-5xl font-bold leading-none">{avgRating.toFixed(1)}</p>
                        <div className="flex gap-0.5 justify-center mt-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              className={cn(
                                "w-4 h-4",
                                s <= Math.round(avgRating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{totalReviews} avaliações</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {ratingDist.map(({ star, count, pct }) => (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-right text-muted-foreground shrink-0">{star}</span>
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />
                            <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-4 text-muted-foreground shrink-0">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Review form */}
              <Card>
                <CardHeader>
                  <CardTitle>Deixe sua avaliação</CardTitle>
                  <CardDescription>
                    Sua opinião ajuda outros moradores a escolher melhor.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NewReviewForm businessId={id} />
                </CardContent>
              </Card>

              {/* Reviews list */}
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações ({totalReviews})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviewsLoading ? (
                    [1, 2, 3].map(i => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    ))
                  ) : allReviews.length > 0 ? (
                    allReviews.map((review, i) => (
                      <div
                        key={review.id || i}
                        className="flex items-start gap-3 border-t pt-4 first:border-0 first:pt-0"
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={review.avatarUrl || undefined} alt={review.author} />
                          <AvatarFallback className="text-sm font-bold">
                            {review.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm">{review.author}</p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star
                                  key={s}
                                  className={cn(
                                    "w-3 h-3",
                                    s <= review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-muted"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Seja o primeiro a avaliar este estabelecimento!
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightboxImg} onOpenChange={() => setLightboxImg(null)}>
        <DialogContent className="max-w-2xl p-2 bg-black border-none">
          {lightboxImg && (
            <div className="relative aspect-video w-full">
              <Image
                src={lightboxImg}
                alt="Imagem ampliada"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

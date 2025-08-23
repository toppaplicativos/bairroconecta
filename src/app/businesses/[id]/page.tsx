
'use client';
import { useParams } from 'next/navigation';
import { businesses } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function BusinessDetailPage({ params }: { params: { id: string, searchParams: any } }) {
  const business = businesses.find((b) => b.id.toString() === params.id);

  if (!business) {
    return (
      <MainLayout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold">Comércio não encontrado</h1>
          <p className="text-muted-foreground">O estabelecimento que você está procurando não existe.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Header */}
        <Card className="overflow-hidden">
            <div className="relative h-48 md:h-64 w-full bg-muted">
                 <Image src={business.imageUrl} alt={`Foto de capa de ${business.name}`} layout="fill" objectFit="cover" />
            </div>
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                    <div className="sm:-mt-20">
                         <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                            <AvatarImage src={business.imageUrl} />
                            <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Badge>{business.category}</Badge>
                        <CardTitle className="mt-2">{business.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-bold text-lg">{business.rating}</span>
                            </div>
                            <span>({business.reviewsCount} avaliações)</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            
            {/* Gallery */}
            {business.gallery.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Galeria</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Carousel className="w-full max-w-full">
                          <CarouselContent>
                            {business.gallery.map((img, index) => (
                              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <div className="relative aspect-video">
                                        <Image src={img.url} alt={img.hint} layout="fill" objectFit="cover" className="rounded-lg" data-ai-hint={img.hint} />
                                    </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="ml-12" />
                          <CarouselNext className="mr-12" />
                        </Carousel>
                    </CardContent>
                </Card>
            )}

             {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle>Sobre</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{business.description}</p>
                </CardContent>
            </Card>

             {/* Products */}
             {business.products.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Produtos em Destaque</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {business.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </CardContent>
                </Card>
             )}


            {/* Reviews */}
            <Card>
                <CardHeader>
                    <CardTitle>Avaliações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {business.reviews.map(review => (
                        <div key={review.id} className="flex items-start gap-4">
                             <Avatar>
                                <AvatarImage src={review.avatarUrl} alt={review.author} />
                                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{review.author}</p>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-muted'}`}/>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                    {business.reviews.length === 0 && (
                        <p className="text-muted-foreground text-center">Ainda não há avaliações para este estabelecimento.</p>
                    )}
                </CardContent>
            </Card>

          </div>
          <div className="md:col-span-1 space-y-6">
            
            {/* Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                   <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-1" />
                        <span>{business.address}</span>
                   </div>
                   <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5" />
                        <span>{business.phone}</span>
                   </div>
                   <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-1" />
                         <div>
                            <p className="font-semibold text-foreground">Horário de Funcionamento</p>
                            {business.hours.map(h => (
                                <p key={h.day} className="text-sm">{h.day}: {h.time}</p>
                            ))}
                        </div>
                   </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

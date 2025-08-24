
'use client';
import { useParams } from 'next/navigation';
import { businesses } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/product-card';
import NewReviewForm from '@/components/new-review-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BusinessDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const business = businesses.find((b) => b.id.toString() === id);

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
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="relative h-48 md:h-64 w-full bg-muted">
            <Image src={business.imageUrl} alt={`Foto de capa de ${business.name}`} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4 md:p-8 space-y-6 -mt-24">
            <Card className="overflow-hidden border-0 shadow-none -mt-24">
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                        <div className="sm:-mt-8">
                            <Avatar className="h-28 w-28 border-4 border-background shadow-lg bg-background">
                                <AvatarImage src={business.imageUrl} />
                                <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Badge>{business.category}</Badge>
                            <h1 className="text-3xl font-bold font-headline mt-2">{business.name}</h1>
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

            <Tabs defaultValue="store" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="store">Loja</TabsTrigger>
                    <TabsTrigger value="about">Sobre</TabsTrigger>
                    <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                </TabsList>
                <TabsContent value="store">
                     <Card>
                        <CardHeader>
                            <CardTitle>Nossos Produtos</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {business.products.length > 0 ? (
                                business.products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm col-span-full text-center">Nenhum produto cadastrado ainda.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="about">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                             {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sobre o Estabelecimento</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{business.description}</p>
                                </CardContent>
                            </Card>
                             {/* Gallery */}
                            {business.gallery.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Galeria</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {business.gallery.map((img, index) => (
                                            <div key={index} className="relative aspect-video">
                                                <Image src={img.url} alt={img.hint} layout="fill" objectFit="cover" className="rounded-lg" data-ai-hint={img.hint} />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                        <div className="md:col-span-1">
                             {/* Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                                        <span>{business.address}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 flex-shrink-0" />
                                        <span>{business.phone}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 mt-1 flex-shrink-0" />
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
                </TabsContent>
                <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                            <CardTitle>Avaliações dos Clientes</CardTitle>
                             <CardDescription>Veja o que os outros moradores estão dizendo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <NewReviewForm businessId={id} />
                            <div className="space-y-4">
                                {business.reviews.map(review => (
                                    <div key={review.id} className="flex items-start gap-4 border-t pt-4">
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
                                    <p className="text-muted-foreground text-center text-sm py-4">Ainda não há avaliações para este estabelecimento. Seja o primeiro a avaliar!</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

    
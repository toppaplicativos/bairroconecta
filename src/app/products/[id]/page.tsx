
'use client';
import { useParams } from 'next/navigation';
import { allProducts, businesses } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  // In a real app, you'd fetch this data. Here we're finding it.
  const product = allProducts.find((p) => p.id === id);
  const business = product ? businesses.find(b => b.id === product.businessId) : null;

  if (!product || !business) {
    return (
      <MainLayout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          <p className="text-muted-foreground">O produto que você está procurando não existe.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={product.hint}
              />
            </div>
            {/* Thumbnails would go here */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">(34 avaliações)</span>
              </div>
            </div>
            
            <p className="text-3xl font-bold">{product.price}</p>

            <p className="text-muted-foreground">{product.description}</p>
            
            {product.variants && product.variants.map(variant => (
              <div key={variant.type}>
                  <label className="text-sm font-medium">{variant.type}</label>
                  <Select>
                    <SelectTrigger className="w-full md:w-1/2 mt-1">
                      <SelectValue placeholder={`Selecione o ${variant.type.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {variant.options.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            ))}
            
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="mr-2 h-5 w-5" />
                Adicionar aos Favoritos
              </Button>
            </div>
            
            <Separator />
            
            <Link href={`/businesses/${business.id}`} className="block">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-14 w-14">
                      <AvatarImage src={business.logoUrl} />
                      <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <p className="text-sm text-muted-foreground">Vendido por</p>
                      <p className="font-bold">{business.name}</p>
                  </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}


'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col border-border/60">
        <div className="relative aspect-square bg-muted overflow-hidden">
          {!imgError ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.hint}
              className="group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            </div>
          )}
          {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 left-2 text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
              Últimas {product.stock}
            </span>
          )}
        </div>
        <CardContent className="p-3 pb-1 flex-grow">
          <p className="font-semibold text-sm leading-tight line-clamp-2">{product.name}</p>
          {product.description && (
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
          )}
        </CardContent>
        <CardFooter className="p-3 pt-2 flex items-center justify-between">
          <p className="text-primary font-bold text-sm">{product.price}</p>
          {product.variants && product.variants.length > 0 && (
            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
              {product.variants[0].options.length} opções
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

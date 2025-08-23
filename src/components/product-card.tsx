import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={product.hint}
        />
      </div>
      <CardContent className="p-3">
        <p className="font-semibold text-sm truncate">{product.name}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <p className="text-primary font-bold">{product.price}</p>
      </CardFooter>
    </Card>
  );
}


import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={product.hint}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-3 pb-2 flex-grow">
          <p className="font-semibold text-sm truncate leading-tight">{product.name}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <p className="text-primary font-bold text-base">{product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

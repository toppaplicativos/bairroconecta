import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { Business } from "@/lib/data";

type BusinessCardProps = {
  business: Business;
};

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link href={`/businesses/${business.id}`} className="block">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={business.imageUrl}
              alt={business.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={business.hint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <p className="text-sm text-muted-foreground">{business.category}</p>
          <CardTitle className="text-xl font-bold font-headline mt-1">{business.name}</CardTitle>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-bold">{business.rating}</span>
            <span className="text-xs text-muted-foreground">({business.reviewsCount} avaliações)</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

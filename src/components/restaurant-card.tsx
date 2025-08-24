
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import Link from "next/link";
import { Business } from "@/lib/data";

type RestaurantCardProps = {
  business: Business;
};

export default function RestaurantCard({ business }: RestaurantCardProps) {
  return (
    <Link href={`/businesses/${business.id}`} className="block">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-32 w-full">
            <Image
              src={business.imageUrl}
              alt={business.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={business.hint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <CardTitle className="text-lg font-bold font-headline truncate">{business.name}</CardTitle>
           <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">{business.rating}</span>
            <span className="text-xs text-muted-foreground">• {business.category}</span>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-muted-foreground">
         <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{business.deliveryTime}</span>
         </div>
         <span>{business.deliveryFee}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

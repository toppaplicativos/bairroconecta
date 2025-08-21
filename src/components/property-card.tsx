import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { BedDouble, Bath, Square } from "lucide-react";

type Property = {
  id: number;
  imageUrl: string;
  hint: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
};

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={property.imageUrl}
            alt={property.address}
            layout="fill"
            objectFit="cover"
            data-ai-hint={property.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">{property.price.includes("mês") ? "Aluguel" : "Venda"}</Badge>
        <CardTitle className="text-2xl font-bold text-primary font-headline">{property.price}</CardTitle>
        <CardDescription className="mt-1">{property.address}</CardDescription>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex justify-around text-sm">
        <div className="flex items-center gap-2">
          <BedDouble className="h-4 w-4 text-muted-foreground" />
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="h-4 w-4 text-muted-foreground" />
          <span>{property.bathrooms}</span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="h-4 w-4 text-muted-foreground" />
          <span>{property.area}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

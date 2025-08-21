import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";

type Ad = {
  id: number;
  imageUrl: string;
  hint: string;
  title: string;
  price: string;
  seller: string;
};

type ClassifiedCardProps = {
  ad: Ad;
};

function getBadgeVariant(price: string) {
    if (price.toLowerCase() === 'troca') return 'default';
    if (price.toLowerCase() === 'doação') return 'secondary';
    return 'destructive'
}


export default function ClassifiedCard({ ad }: ClassifiedCardProps) {
  const badgeVariant = getBadgeVariant(ad.price);
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={ad.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold font-headline leading-tight">{ad.title}</CardTitle>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">{ad.price}</p>
        <p className="text-sm text-muted-foreground">Vendido por: {ad.seller}</p>
      </CardFooter>
    </Card>
  );
}

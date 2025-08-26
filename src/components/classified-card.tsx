

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { ClassifiedAd } from "@/lib/data";

type ClassifiedCardProps = {
  ad: ClassifiedAd;
};

export default function ClassifiedCard({ ad }: ClassifiedCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(ad.preco);

  return (
    <Link href={`/classifieds/${ad.id}`} className="block group">
      <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-white">
        <CardHeader className="p-0">
          <div className="relative h-32 w-full">
            <Image
              src={ad.imagem}
              alt={ad.titulo}
              layout="fill"
              objectFit="cover"
              data-ai-hint={ad.hint}
            />
             {ad.tagDestaque && (
                <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 border-0 text-xs font-bold">{ad.tagDestaque}</Badge>
             )}
             <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm rounded-full p-1 flex items-center gap-1 text-white text-xs">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="font-bold">{ad.avaliacao}</span>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-grow">
            <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">{ad.titulo}</h3>
             <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{ad.localizacao}</span>
            </div>
        </CardContent>
        <CardFooter className="p-3 flex justify-between items-center">
          <p className="text-base font-bold text-gray-800">{formattedPrice}</p>
           <button>
             <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 hover:fill-red-500 transition-all" />
           </button>
        </CardFooter>
      </Card>
    </Link>
  );
}

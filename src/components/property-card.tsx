
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Property = {
  id: number;
  imagem: string;
  hint: string;
  tipo: string;
  titulo: string;
  local: string;
  avaliacao: number;
  preco: string;
  periodo: string;
};

type PropertyCardProps = {
  property: Property;
  variant?: 'large' | 'small';
};

export default function PropertyCard({ property, variant = 'large' }: PropertyCardProps) {
  
  if (variant === 'small') {
    return (
      <Link href={`/properties/${property.id}`} className="block">
        <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center p-3 gap-4 bg-card border-0 rounded-2xl">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
             <Image
                src={property.imagem}
                alt={property.titulo}
                layout="fill"
                objectFit="cover"
                data-ai-hint={property.hint}
              />
          </div>
          <div className="flex-1">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs mb-1 font-semibold">{property.tipo}</Badge>
            <h3 className="font-bold font-headline leading-tight">{property.titulo}</h3>
            <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-gray-800">{property.avaliacao}</span>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.id}`} className="block">
      <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col border-0 bg-transparent">
          <div className="relative h-40 w-full rounded-2xl overflow-hidden">
            <Image
              src={property.imagem}
              alt={property.titulo}
              layout="fill"
              objectFit="cover"
              data-ai-hint={property.hint}
            />
            <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-800 border-0 font-semibold">{property.tipo}</Badge>
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md">
              <Heart className="h-5 w-5 text-gray-600" />
            </div>
             <div className="absolute bottom-3 right-3 bg-gray-900/50 backdrop-blur-sm text-white rounded-lg px-2 py-1 flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-bold">{property.avaliacao}</span>
            </div>
          </div>
        <CardContent className="p-0 pt-3">
          <h3 className="text-lg font-bold font-headline truncate">{property.titulo}</h3>
          <div className="text-sm text-muted-foreground space-y-1.5 mt-1">
              <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{property.local}</span>
              </div>
          </div>
           <p className="mt-2">
            <span className="text-xl font-bold text-primary">R${property.preco}</span>
            <span className="text-muted-foreground text-sm">{property.periodo}</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

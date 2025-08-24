
'use client';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Wrench, MoreVertical, Share2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Business } from "@/lib/data";

type ProviderCardProps = {
  provider: Business & { pricePerHour?: number, experience?: number };
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const formattedRating = provider.rating.toFixed(1);
  const formattedReviews = (provider.reviewsCount / 1000).toFixed(1) + 'k';

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex p-3 gap-3 items-center bg-white border rounded-2xl">
      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
        <Image
          src={provider.imageUrl}
          alt={provider.name}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          data-ai-hint={provider.hint}
        />
        <Badge variant="secondary" className="absolute top-2 left-2 bg-black/50 text-white border-0">
          <Star className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" />
          {formattedRating} <span className="text-muted-foreground ml-1">({formattedReviews})</span>
        </Badge>
         <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 bg-black/30 text-white hover:bg-black/50 hover:text-white rounded-full">
            <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-between self-stretch">
        <div>
            <div className="flex justify-between items-start">
                 <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Wrench className="w-3 h-3"/> {provider.category}
                </p>
                <Button variant="ghost" size="icon" className="h-7 w-7 -mr-2">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
            <h3 className="font-bold text-lg leading-tight font-headline">{provider.name}</h3>
            {provider.experience && (
                <p className="text-xs text-muted-foreground">{provider.experience} anos de experiência</p>
            )}
        </div>
        
         {provider.pricePerHour && (
            <div className="flex items-center justify-between mt-2">
                 <Button variant="secondary" className="h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200">
                    <span className="font-bold">${provider.pricePerHour}/hr</span>
                    <div className="ml-2 bg-white rounded-full p-0.5">
                        <Plus className="h-4 w-4 text-orange-600"/>
                    </div>
                </Button>
            </div>
        )}
      </div>
    </Card>
  );
}


import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Business } from "@/lib/data";


type ServiceCardProps = {
  provider: Business;
};

export default function ServiceCard({ provider }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border-0 rounded-2xl">
        <div className="relative aspect-[4/3] w-full">
            <Image
                src={provider.imageUrl}
                alt={provider.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={provider.hint}
                className="rounded-t-2xl"
            />
        </div>
      <CardContent className="p-3 text-center">
        <p className="font-bold text-base truncate">{provider.name}</p>
        <p className="text-sm text-muted-foreground">{provider.description.split('.')[0]}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-sm text-gray-800">{provider.rating}</span>
            <span className="text-xs text-muted-foreground">({provider.reviewsCount})</span>
        </div>
      </CardContent>
    </Card>
  );
}

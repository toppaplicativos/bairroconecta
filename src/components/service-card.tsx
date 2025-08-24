
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

type ServiceProvider = {
  id: number;
  imageUrl: string;
  hint: string;
  name: string;
  category: string;
  rating: number;
};

type ServiceCardProps = {
  provider: ServiceProvider;
};

export default function ServiceCard({ provider }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-[4/3] w-full">
            <Image
                src={provider.imageUrl}
                alt={provider.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={provider.hint}
                className="rounded-t-lg"
            />
        </div>
      <CardContent className="p-3">
        <p className="font-bold text-base truncate">{provider.name}</p>
        <p className="text-sm text-muted-foreground">{provider.category}</p>
        <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">{provider.rating}</span>
            <span className="text-xs text-muted-foreground">(+50)</span>
        </div>
      </CardContent>
    </Card>
  );
}

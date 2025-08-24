
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Business } from "@/lib/data";


type ServiceCardProps = {
  provider: Business;
  professionalsCount: number;
};

export default function ServiceCard({ provider, professionalsCount }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border-0 rounded-2xl h-full flex flex-col">
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
      <CardContent className="p-3 text-left flex-grow">
        <p className="font-bold text-sm leading-tight truncate">{provider.name}</p>
        <div className="flex items-center gap-1 mt-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{professionalsCount} profissionais</span>
        </div>
      </CardContent>
    </Card>
  );
}

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

type ServiceProvider = {
  id: number;
  avatarUrl: string;
  hint: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
};

type ServiceCardProps = {
  provider: ServiceProvider;
};

export default function ServiceCard({ provider }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center">
      <CardHeader className="items-center p-6 bg-muted/30">
         <Avatar className="h-20 w-20 border-4 border-background shadow-md">
            <AvatarImage src={provider.avatarUrl} alt={provider.name} data-ai-hint={provider.hint}/>
            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <CardTitle className="text-lg font-bold font-headline">{provider.name}</CardTitle>
        <CardDescription className="text-primary font-medium mt-1 text-sm">{provider.service}</CardDescription>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-sm">{provider.rating}</span>
          <span className="text-xs text-muted-foreground">({provider.reviews} avaliações)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">Ver Perfil</Button>
      </CardFooter>
    </Card>
  );
}

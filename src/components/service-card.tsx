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
      <CardHeader className="p-6 bg-muted/30">
         <Avatar className="h-24 w-24 mx-auto border-4 border-background shadow-md">
            <AvatarImage src={provider.avatarUrl} alt={provider.name} data-ai-hint={provider.hint}/>
            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-bold font-headline mt-1">{provider.name}</CardTitle>
        <CardDescription className="text-primary font-medium mt-1">{provider.service}</CardDescription>
        <div className="flex items-center justify-center gap-1 mt-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold">{provider.rating}</span>
          <span className="text-xs text-muted-foreground">({provider.reviews} avaliações)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full">Ver Perfil</Button>
      </CardFooter>
    </Card>
  );
}

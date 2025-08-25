
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

type Doctor = {
  id: number;
  imageUrl: string;
  hint: string;
  name: string;
  specialty: string;
  rating: number;
};

type DoctorCardProps = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col text-center">
      <CardHeader className="items-center p-6 bg-muted/30">
         <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={doctor.imageUrl} alt={doctor.name} data-ai-hint={doctor.hint}/>
            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <CardTitle className="text-lg font-bold font-headline">{doctor.name}</CardTitle>
        <CardDescription className="text-primary font-medium mt-1 text-sm">{doctor.specialty}</CardDescription>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-sm">{doctor.rating}</span>
          <span className="text-xs text-muted-foreground">(42 avaliações)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" variant="outline">Ver Perfil</Button>
      </CardFooter>
    </Card>
  );
}

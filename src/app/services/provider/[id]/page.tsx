
'use client';
import { useParams, useRouter } from 'next/navigation';
import { serviceProviders } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { ChevronLeft, Share2, Star, Briefcase, Users, MessageSquare, Phone, Calendar, Bookmark, Award, DollarSign, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import MainLayout from '@/components/main-layout';

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const provider = serviceProviders.find((p) => p.id.toString() === id);

  if (!provider) {
    return (
      <MainLayout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold">Profissional não encontrado</h1>
          <p className="text-muted-foreground">O perfil que você está procurando não existe.</p>
        </div>
      </MainLayout>
    );
  }

  const StatCard = ({ icon: Icon, value, label, colorClass }: { icon: React.ElementType, value: string | number, label: string, colorClass: string }) => (
      <div className={cn("rounded-2xl p-3 flex flex-col items-center justify-center text-center text-white", colorClass)}>
        <Icon className="h-6 w-6 mb-1" />
        <p className="font-bold text-lg">{value}</p>
        <p className="text-xs">{label}</p>
      </div>
  );

  return (
    <div className="bg-orange-50/50 min-h-screen">
      <div className="relative h-64 w-full">
        <Image src={provider.imageUrl} alt={provider.name} layout="fill" objectFit="cover" className="object-top" data-ai-hint="professional portrait" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-100 via-orange-50/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
         <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute -bottom-8 w-full px-6">
            <Card className="p-3 bg-white/80 backdrop-blur-md shadow-lg border-0">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-sm font-semibold text-orange-500 uppercase flex items-center gap-1.5"><Award className="w-4 h-4"/> {provider.tagline}</p>
                        <h1 className="text-2xl font-bold font-headline">{provider.name}</h1>
                        <p className="text-muted-foreground">{provider.experience} anos de experiência</p>
                    </div>
                     <div className="ml-auto flex items-center gap-2 text-right">
                        <p className="text-3xl font-bold text-orange-500">${provider.pricePerHour}</p>
                        <p className="text-muted-foreground text-sm leading-tight">/hr</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>

      <div className="pt-12 p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Briefcase} value={provider.experience || 0} label="Anos" colorClass="bg-orange-400" />
            <StatCard icon={Star} value={provider.rating.toFixed(1)} label="Avaliação" colorClass="bg-purple-400" />
            <StatCard icon={Users} value={`${provider.customers}+`} label="Clientes" colorClass="bg-teal-400" />
        </div>
        
         <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-orange-100">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="availability" disabled>Disponibilidade</TabsTrigger>
                <TabsTrigger value="experience" disabled>Experiência</TabsTrigger>
                <TabsTrigger value="reviews" disabled>Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="pt-4">
               <div className="space-y-6">
                 <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-4">
                        <h3 className="font-bold mb-2">Sobre {provider.name.split(' ')[0]}</h3>
                        <p className="text-muted-foreground text-sm">
                            {provider.description} <a href="#" className="text-orange-500 font-semibold">Ler mais</a>
                        </p>
                    </CardContent>
                </Card>

                 <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={provider.imageUrl} />
                                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{provider.name}</p>
                                <p className="text-sm text-muted-foreground">{provider.service}</p>
                            </div>
                       </div>
                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="icon" className="rounded-full border-orange-200">
                                <MessageSquare className="h-5 w-5 text-orange-500" />
                            </Button>
                             <Button variant="outline" size="icon" className="rounded-full border-orange-200">
                                <Phone className="h-5 w-5 text-orange-500" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                 <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white border-0 shadow-sm">
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4"/> Taxa por hora</p>
                            <p className="font-bold text-xl mt-1">R${provider.pricePerHour},00</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-0 shadow-sm">
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><Users2 className="w-4 h-4"/> Trabalho em equipe</p>
                            <p className="font-bold text-xl mt-1">{provider.teamworkPrice}</p>
                        </CardContent>
                    </Card>
                 </div>
               </div>
            </TabsContent>
        </Tabs>
      </div>

       <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex items-center gap-4">
            <Button size="lg" className="flex-1 bg-orange-500 hover:bg-orange-600 shadow-lg h-14 text-base">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar {provider.name.split(' ')[0]}
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 border-gray-300">
                <Bookmark className="h-6 w-6 text-gray-600" />
            </Button>
       </div>
    </div>
  );
}


'use client';
import MainLayout from "@/components/main-layout";
import ServiceCard from "@/components/service-card";
import { businesses } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, Settings2, Wrench, Plug } from "lucide-react";
import Image from "next/image";

const filterTags = ["All", "Booked", "Electricians", "Agents"];
const serviceTags = [
    { name: "Repairing", icon: Wrench },
    { name: "Installation", icon: Settings2 },
    { name: "Rewiring", icon: Plug },
]

export default function ServicesPage() {
  const serviceProviders = businesses.filter(b => b.type === 'service');

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-4 md:p-6 bg-orange-50/50">
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="What service do you need?" className="pl-10 bg-white shadow-sm border-0" />
            </div>
            <Button variant="outline" size="icon" className="bg-white shadow-sm border-0">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {filterTags.map((tag, index) => (
                <Button key={tag} variant={index === 0 ? "default" : "secondary"} className={`rounded-full shrink-0 ${index === 0 ? 'bg-orange-400 text-white' : 'bg-white text-muted-foreground'}`}>
                    {tag}
                </Button>
            ))}
        </div>
        
        <Card className="relative overflow-hidden bg-orange-100 border-0 shadow-none">
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2 z-10">
                    <p className="text-xs font-bold text-orange-500 uppercase bg-white px-2 py-1 rounded-full inline-block">Popular</p>
                    <h2 className="text-xl font-bold font-headline">Hire a Service Man</h2>
                    <p className="text-muted-foreground text-sm">Need help with wiring, repairs or installations?</p>
                    <Button className="mt-2 bg-orange-400 hover:bg-orange-500 text-white shadow-lg">Book Now</Button>
                </div>
                 <div className="relative h-32 w-32 md:h-36 md:w-36 z-10">
                   <Image src="https://i.postimg.cc/QdGkYp6K/servicos-hero.png" alt="Homem de serviço" layout="fill" objectFit="contain" />
                </div>
            </CardContent>
        </Card>

        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold font-headline">Our Services</h3>
                 <div className="flex gap-2 overflow-x-auto">
                    {serviceTags.map((tag) => (
                        <Button key={tag.name} variant="ghost" className="text-muted-foreground">
                            <tag.icon className="mr-2 h-4 w-4" />
                           {tag.name}
                        </Button>
                    ))}
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
              {serviceProviders.map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
        </div>

      </div>
    </MainLayout>
  );
}

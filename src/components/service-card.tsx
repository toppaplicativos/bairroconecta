
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import { normalizeString } from "@/lib/utils";

type ServiceCardProps = {
  service: string;
  categorySlug: string;
};

export default function ServiceCard({ service, categorySlug }: ServiceCardProps) {
  const serviceSlug = normalizeString(service);
  
  return (
    <Link href={`/services/${categorySlug}/${serviceSlug}`} className="block h-full">
        <Card className="shadow-sm hover:shadow-lg transition-all flex flex-col justify-between items-start h-full bg-white">
            <CardHeader>
                 <div className="p-3 bg-primary/10 rounded-lg">
                    <Wrench className="h-6 w-6 text-primary" />
                </div>
            </CardHeader>
            <CardContent className="pt-2">
                 <CardTitle className="text-md font-bold">{service}</CardTitle>
            </CardContent>
        </Card>
    </Link>
  );
}

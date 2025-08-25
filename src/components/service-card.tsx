

'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { normalizeString } from "@/lib/utils";

type ServiceCardProps = {
  service: string;
  categorySlug: string;
};

export default function ServiceCard({ service, categorySlug }: ServiceCardProps) {
  const serviceSlug = normalizeString(service);
  
  return (
    <Link href={`/services/${categorySlug}/${serviceSlug}`}>
        <Card className="shadow-sm hover:shadow-lg transition-all flex items-center h-full">
            <CardContent className="p-4 flex-1 flex items-center justify-between">
                <CardTitle className="text-md font-medium">{service}</CardTitle>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
        </Card>
    </Link>
  );
}

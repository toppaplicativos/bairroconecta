
'use client';
import { useParams } from 'next/navigation';
import { serviceListByCategory } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ServiceCard from '@/components/service-card';
import { normalizeString } from '@/lib/utils';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


export default function ServiceCategoryPage() {
    const params = useParams();
    const categorySlug = params?.category as string;

    const categoryDetails = useMemo(() => {
         if (!categorySlug) return null;
        return serviceListByCategory.find(
            (cat) => normalizeString(cat.category) === categorySlug
        );
    }, [categorySlug]);
    
    if (!categoryDetails) {
        return (
            <MainLayout>
                <div className="p-4 md:p-6">
                    <Skeleton className="h-8 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
                    </div>
                </div>
            </MainLayout>
        );
    }
    

    return (
        <MainLayout>
            <div className="flex-1 space-y-6 bg-orange-50/50 p-4 md:p-6">
                <h1 className="text-2xl font-bold tracking-tight font-headline">{categoryDetails.category}</h1>
                <p className="text-muted-foreground">Selecione o serviço específico que você precisa.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryDetails.services.map((service) => (
                        <ServiceCard key={service} service={service} categorySlug={categorySlug} />
                    ))}
                </div>

            </div>
        </MainLayout>
    );
}

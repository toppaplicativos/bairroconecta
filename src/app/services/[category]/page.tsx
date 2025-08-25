
'use client';
import { useParams } from 'next/navigation';
import { serviceListByCategory } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { normalizeString } from '@/lib/utils';
import ServiceCard from '@/components/service-card';


export default function ServiceCategoryPage() {
    const params = useParams();
    const categorySlug = params?.category as string;

    const categoryDetails = serviceListByCategory.find(
        (cat) => normalizeString(cat.category) === categorySlug
    );
    
    if (!categoryDetails) {
        return (
            <MainLayout>
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold">Categoria não encontrada</h1>
                    <p className="text-muted-foreground">A categoria de serviço que você está procurando não existe.</p>
                     <Link href="/services">
                        <Button variant="link" className="mt-4">Voltar para Serviços</Button>
                    </Link>
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

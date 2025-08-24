
'use client';
import { useParams } from 'next/navigation';
import { serviceProviders, serviceListByCategory } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import ProviderCard from '@/components/provider-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

const normalizeString = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};


export default function ServiceCategoryPage() {
    const params = useParams();
    const categorySlug = params?.category as string;

    const categoryDetails = serviceListByCategory.find(
        (cat) => normalizeString(cat.category) === categorySlug
    );

    const providers = serviceProviders.filter(
        (p) => p.category === categoryDetails?.category
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
                <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Buscar profissional..." className="pl-10 bg-white shadow-sm border-0" />
                    </div>
                    <Button variant="outline" size="icon" className="bg-white shadow-sm border-0">
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>
                
                <h1 className="text-2xl font-bold tracking-tight font-headline">{categoryDetails.category}</h1>

                <div className="space-y-4">
                    {providers.length > 0 ? (
                        providers.map((provider) => (
                            <ProviderCard key={provider.id} provider={provider} />
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                            <p>Nenhum profissional encontrado para esta categoria ainda.</p>
                        </div>
                    )}
                </div>

            </div>
        </MainLayout>
    );
}


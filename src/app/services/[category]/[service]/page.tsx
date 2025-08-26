
'use client';
import { useParams } from 'next/navigation';
import { serviceProviders } from '@/lib/data';
import MainLayout from '@/components/main-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import ProviderCard from '@/components/provider-card';
import { normalizeString } from '@/lib/utils';
import { useMemo, useState } from 'react';


export default function ServiceProfessionalsPage() {
    const params = useParams();
    const serviceSlug = params?.service as string;
    const [searchTerm, setSearchTerm] = useState('');

    const serviceName = useMemo(() => {
        if (!serviceSlug) return '';
        return decodeURIComponent(serviceSlug).replace(/-/g, ' ');
    }, [serviceSlug]);

    const providers = useMemo(() => {
        if (!serviceSlug) return [];
        return serviceProviders.filter(p => 
            normalizeString(p.service) === serviceSlug &&
            (searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [serviceSlug, searchTerm]);
    
    if (!serviceSlug) {
        return (
            <MainLayout currentMode='services' headerType='detail' headerTitle='Serviço não encontrado'>
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
                    <p className="text-muted-foreground">O serviço que você está procurando não existe.</p>
                     <Link href="/services">
                        <Button variant="link" className="mt-4">Voltar para Serviços</Button>
                    </Link>
                </div>
            </MainLayout>
        );
    }
    

    return (
        <MainLayout currentMode='services' headerType='detail' headerTitle={serviceName}>
            <div className="flex-1 space-y-6 bg-orange-50/50 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder={`Buscar em ${serviceName}...`} 
                            className="pl-10 bg-white shadow-sm border-0 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="bg-white shadow-sm border-0 flex-shrink-0">
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>
                
                <h1 className="text-2xl font-bold tracking-tight font-headline capitalize">{serviceName}</h1>

                <div className="space-y-4">
                    {providers.length > 0 ? (
                        providers.map((provider) => (
                            <ProviderCard key={provider.id} provider={provider} />
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                            <p>Nenhum profissional encontrado para este serviço ou filtro.</p>
                        </div>
                    )}
                </div>

            </div>
        </MainLayout>
    );
}

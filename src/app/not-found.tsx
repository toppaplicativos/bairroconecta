import { MapPinned } from 'lucide-react';

import MainLayout from '@/components/main-layout';
import { EmptyState } from '@/components/system/empty-state';
import { PageContainer } from '@/components/system/page-container';

export default function NotFound() {
  return (
    <MainLayout>
      <PageContainer className="flex min-h-[70vh] items-center justify-center">
        <EmptyState
          icon={MapPinned}
          title="Esta rota não existe no Meu Bairro"
          description="O endereço pode ter mudado ou ainda não fazer parte desta versão do aplicativo."
          action={{ label: 'Voltar para a visão geral', href: '/' }}
          className="w-full max-w-2xl"
        />
      </PageContainer>
    </MainLayout>
  );
}

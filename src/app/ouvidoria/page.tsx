
'use client';
import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import ReportCard from "@/components/report-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewReportForm from "@/components/new-report-form";

const reports = [
  {
    protocol: "202407-001",
    category: "Buraco na rua",
    status: "Resolvido",
    date: "20/07/2024",
    description: "Buraco grande na Rua das Flores, próximo ao número 123, causando transtorno para os veículos.",
    updates: [
        { status: "Resolvido", date: "22/07/2024", comment: "A equipe de manutenção foi ao local e realizou o reparo do asfalto." },
        { status: "Em andamento", date: "21/07/2024", comment: "Manifestação encaminhada para o departamento de obras." },
        { status: "Aberta", date: "20/07/2024", comment: "Manifestação recebida e registrada." },
    ]
  },
  {
    protocol: "202407-002",
    category: "Iluminação pública",
    status: "Em andamento",
    date: "21/07/2024",
    description: "Poste com lâmpada queimada na Praça da Matriz, deixando a área muito escura e insegura à noite.",
    updates: [
        { status: "Em andamento", date: "22/07/2024", comment: "A equipe de iluminação pública foi notificada e programou a substituição da lâmpada." },
        { status: "Aberta", date: "21/07/2024", comment: "Manifestação recebida e registrada." },
    ]
  },
   {
    protocol: "202407-003",
    category: "Lixo acumulado",
    status: "Aberta",
    date: "22/07/2024",
    description: "Acúmulo de lixo na esquina da Rua das Acácias com a Av. Principal. É preciso reforçar a coleta na região.",
     updates: [
        { status: "Aberta", date: "22/07/2024", comment: "Manifestação recebida e aguardando triagem para encaminhamento." },
    ]
  },
];


export default function OuvidoriaPage() {
    return (
        <MainLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Mural da Ouvidoria</h1>
                        <p className="text-muted-foreground">Acompanhe e registre as demandas do seu bairro.</p>
                    </div>
                     <Dialog>
                      <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nova Manifestação
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Abrir Nova Manifestação</DialogTitle>
                          <DialogDescription>
                            Descreva o problema que você identificou no bairro. Seja claro e objetivo.
                          </DialogDescription>
                        </DialogHeader>
                        <NewReportForm />
                      </DialogContent>
                    </Dialog>
                </div>

                <div className="space-y-4">
                  {reports.map((report) => (
                    <ReportCard key={report.protocol} report={report} />
                  ))}
                </div>
            </div>
        </MainLayout>
    )
}
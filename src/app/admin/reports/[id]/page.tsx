
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import AdminLayout from '@/components/admin-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReportTimeline from '@/components/report-timeline';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import UpdateStatusForm from '@/components/update-status-form';

type ReportUpdate = {
  status: string;
  date: string;
  comment: string;
};

type Report = {
  id: string;
  category: string;
  status: "Aberta" | "Em andamento" | "Resolvido";
  analysis: {
      urgency: "Baixa" | "Média" | "Alta" | "Crítica";
  };
  createdAt: { toDate: () => Date };
  description: string;
  address: string;
  imageUrl?: string;
  updates: ReportUpdate[];
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
        case "Resolvido": return "default";
        case "Em andamento": return "secondary";
        case "Aberta": return "destructive";
        default: return "default";
    }
}

const getUrgencyClass = (urgency: string): string => {
    switch (urgency) {
        case "Crítica": return "border-red-500 bg-red-50";
        case "Alta": return "border-orange-500 bg-orange-50";
        case "Média": return "border-yellow-500 bg-yellow-50";
        default: return "";
    }
}

const getUrgencyTextClass = (urgency: string): string => {
     switch (urgency) {
        case "Crítica": return "text-red-600";
        case "Alta": return "text-orange-600";
        case "Média": return "text-yellow-600";
        default: return "text-gray-600";
    }
}

export default function AdminReportDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, 'reports', id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setReport({ id: doc.id, ...doc.data() } as Report);
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="mt-6 space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!report) {
    return (
      <AdminLayout>
        <div className="flex-1 p-4 md:p-8 pt-6">
          <h1 className="text-2xl font-bold">Manifestação não encontrada</h1>
          <p className="text-muted-foreground">O protocolo solicitado não foi encontrado ou foi removido.</p>
        </div>
      </AdminLayout>
    );
  }

  const urgency = report.analysis?.urgency || "Baixa";

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
                <Card className={cn("shadow-lg border-l-4", getUrgencyClass(urgency))}>
                    <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <CardDescription>Protocolo: {report.id}</CardDescription>
                                <CardTitle className="text-2xl font-bold font-headline mt-1">{report.category}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">{report.address}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                                <span className={cn("text-sm font-bold", getUrgencyTextClass(urgency))}>
                                    URGÊNCIA: {urgency.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {report.imageUrl && (
                            <div className="mb-4 relative h-64 w-full">
                                <Image src={report.imageUrl} alt="Foto da manifestação" layout="fill" objectFit="cover" className="rounded-md" />
                            </div>
                        )}
                        <p className="text-muted-foreground whitespace-pre-wrap">{report.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end p-4 bg-muted/30">
                        <p className="text-xs text-muted-foreground">
                            Aberto em: {new Date(report.createdAt.toDate()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                    </CardFooter>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Histórico de Atualizações</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReportTimeline updates={report.updates} />
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Ações do Gestor</CardTitle>
                        <CardDescription>Atualize o status desta manifestação.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateStatusForm reportId={report.id} currentStatus={report.status} />
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

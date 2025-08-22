
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
import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";


export default function OuvidoriaPage() {
    const [user] = useAuthState(auth);
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMyReports, setShowMyReports] = useState(false);
    const [openNewReport, setOpenNewReport] = useState(false);

    useEffect(() => {
        let q;
        if (showMyReports && user) {
            q = query(collection(db, "reports"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        } else {
            q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reportsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReports(reportsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [showMyReports, user]);

    const handleReportSubmitted = () => {
      setOpenNewReport(false);
    }

    return (
        <MainLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Mural da Ouvidoria</h1>
                        <p className="text-muted-foreground">Acompanhe e registre as demandas do seu bairro.</p>
                    </div>
                     <Dialog open={openNewReport} onOpenChange={setOpenNewReport}>
                      <DialogTrigger asChild>
                         <Button className="w-full md:w-auto" disabled={!user}>
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
                        <NewReportForm onReportSubmitted={handleReportSubmitted} />
                      </DialogContent>
                    </Dialog>
                </div>

                {user && (
                    <div className="flex items-center space-x-2 bg-muted/50 p-3 rounded-lg">
                        <Switch
                            id="my-reports-switch"
                            checked={showMyReports}
                            onCheckedChange={setShowMyReports}
                        />
                        <Label htmlFor="my-reports-switch">Mostrar apenas minhas manifestações</Label>
                    </div>
                )}

                <div className="space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                    </>
                  ) : (
                    reports.map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))
                  )}
                </div>
            </div>
        </MainLayout>
    )
}


'use client';
import AdminLayout from "@/components/admin-layout";
import ReportCard from "@/components/report-card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reportsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReports(reportsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AdminLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard de Gestão</h1>
                    <p className="text-muted-foreground">Visualize e gerencie todas as manifestações.</p>
                </div>
                 <div className="space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                    </>
                  ) : (
                    reports.map((report) => (
                      <ReportCard key={report.id} report={report} isAdmin />
                    ))
                  )}
                </div>
            </div>
        </AdminLayout>
    )
}

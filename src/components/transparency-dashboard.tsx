
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getReportsAnalysis } from "@/app/actions";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, FileText, Lightbulb, ListTodo, ShieldAlert } from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ReportsByCategoryChart } from "./reports-by-category-chart";
import { ReportsByStatusChart } from "./reports-by-status-chart";

interface Analysis {
    overallSummary: string;
    keyInsights: string[];
    urgentActionItems: string[];
}

export default function TransparencyDashboard() {
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loadingAnalysis, setLoadingAnalysis] = useState(true);
    const [reports, setReports] = useState<any[]>([]);
    const [loadingReports, setLoadingReports] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoadingAnalysis(true);
            try {
                const result = await getReportsAnalysis();
                setAnalysis(result);
            } catch (error) {
                console.error("Failed to fetch analysis", error);
                setAnalysis(null);
            } finally {
                setLoadingAnalysis(false);
            }
        };

        const subscribeToReports = () => {
            setLoadingReports(true);
            const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const reportsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReports(reportsData);
                setLoadingReports(false);
            });
            return unsubscribe;
        };

        fetchAnalysis();
        const unsubscribe = subscribeToReports();

        return () => unsubscribe();
    }, []);
    
    const totalReports = reports.length;
    const resolvedReports = reports.filter(r => r.status === 'Resolvido').length;
    const openReports = reports.filter(r => r.status === 'Aberta').length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        Análise de IA e Relatório Executivo
                    </CardTitle>
                    <CardDescription>Resumo e insights gerados automaticamente com base em todas as manifestações registradas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loadingAnalysis ? (
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ) : (
                        analysis && (
                            <>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2"><FileText className="h-4 w-4"/> Resumo Geral</h3>
                                    <p className="text-muted-foreground">{analysis.overallSummary}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2"><ShieldAlert className="h-4 w-4"/> Itens de Ação Urgente</h3>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                        {analysis.urgentActionItems.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4"/> Insights Chave</h3>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                        {analysis.keyInsights.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )
                    )}
                     {!loadingAnalysis && !analysis && (
                        <p className="text-muted-foreground text-center">Não foi possível carregar a análise.</p>
                     )}
                </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Manifestações</CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loadingReports ? <Skeleton className="h-8 w-16" /> : totalReports}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manifestações Resolvidas</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loadingReports ? <Skeleton className="h-8 w-16" /> : resolvedReports}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manifestações Abertas</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loadingReports ? <Skeleton className="h-8 w-16" /> : openReports}</div>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Manifestações por Categoria</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ReportsByCategoryChart data={reports} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Manifestações por Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReportsByStatusChart data={reports} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

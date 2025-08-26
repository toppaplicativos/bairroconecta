'use client';
import AdminLayout from "@/components/admin-layout";
import ReportCard from "@/components/report-card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query, where, DocumentData } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, CheckCircle, AlertOctagon } from "lucide-react";
import { ReportsByCategoryChart } from "@/components/reports-by-category-chart";
import { ReportsByStatusChart } from "@/components/reports-by-status-chart";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Urgency = "Baixa" | "Média" | "Alta" | "Crítica";
const URGENCY_LEVELS: Urgency[] = ["Baixa", "Média", "Alta", "Crítica"];

export default function AdminDashboardPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [urgencyFilter, setUrgencyFilter] = useState("all");

    useEffect(() => {
        const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reportsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReports(reportsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const searchMatch = searchTerm.toLowerCase() === '' ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.address.toLowerCase().includes(searchTerm.toLowerCase());
            
            const statusMatch = statusFilter === 'all' || report.status === statusFilter;
            
            const urgencyMatch = urgencyFilter === 'all' || report.analysis?.urgency === urgencyFilter;

            return searchMatch && statusMatch && urgencyMatch;
        });
    }, [reports, searchTerm, statusFilter, urgencyFilter]);
    
    const totalReports = reports.length;
    const resolvedReports = reports.filter(r => r.status === 'Resolvido').length;
    
    const averageUrgency = useMemo(() => {
        if (totalReports === 0) return "N/A";
        const totalUrgencyScore = reports.reduce((acc, report) => {
            const urgency = report.analysis?.urgency as Urgency;
            return acc + (URGENCY_LEVELS.indexOf(urgency) + 1);
        }, 0);
        const averageScore = Math.round(totalUrgencyScore / totalReports);
        return URGENCY_LEVELS[averageScore - 1] || "Baixa";
    }, [reports, totalReports]);


    return (
        <AdminLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard de Gestão</h1>
                    <p className="text-muted-foreground">Visualize e gerencie todas as manifestações.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Manifestações</CardTitle>
                            <ListTodo className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalReports}</div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolvidas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{resolvedReports}</div>
                             <p className="text-xs text-muted-foreground">
                                {totalReports > 0 ? `${Math.round((resolvedReports/totalReports)*100)}% do total` : 'N/A'}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nível de Urgência Médio</CardTitle>
                            <AlertOctagon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageUrgency}</div>
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
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Filtrar e Buscar Manifestações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <Label htmlFor="search">Buscar</Label>
                                <Input 
                                    id="search"
                                    placeholder="Buscar por descrição ou endereço..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                             <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Filtrar por status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos</SelectItem>
                                        <SelectItem value="Aberta">Aberta</SelectItem>
                                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                                        <SelectItem value="Resolvido">Resolvido</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="urgency">Urgência</Label>
                                 <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                                    <SelectTrigger id="urgency">
                                        <SelectValue placeholder="Filtrar por urgência" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas</SelectItem>
                                        {URGENCY_LEVELS.map(level => (
                                          <SelectItem key={level} value={level}>{level}</SelectItem>  
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>


                 <div className="space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                    </>
                  ) : (
                    filteredReports.map((report) => (
                      <ReportCard key={report.id} report={report} isAdmin />
                    ))
                  )}
                  {!loading && filteredReports.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">Nenhuma manifestação encontrada com os filtros aplicados.</div>
                  )}
                </div>
            </div>
        </AdminLayout>
    )
}

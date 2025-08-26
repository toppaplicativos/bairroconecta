
import TransparencyDashboard from "@/components/transparency-dashboard";
import AdminLayout from "@/components/admin-layout";

export default function TransparencyPage({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <AdminLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                 <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Portal da Transparência</h1>
                    <p className="text-muted-foreground">Análise de dados e insights sobre as manifestações da comunidade.</p>
                </div>
                <TransparencyDashboard />
            </div>
        </AdminLayout>
    )
}

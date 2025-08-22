

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ReportTimeline from "./report-timeline";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ReportUpdate = {
  status: string;
  date: string;
  comment: string;
};

type Report = {
  id: string; // Previously protocol
  category: string;
  status: "Aberta" | "Em andamento" | "Resolvido";
  analysis: {
      urgency: "Baixa" | "Média" | "Alta" | "Crítica";
  };
  createdAt: { toDate: () => Date };
  description: string;
  updates: ReportUpdate[];
};

type ReportCardProps = {
  report: Report;
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
        case "Resolvido":
            return "default";
        case "Em andamento":
            return "secondary";
        case "Aberta":
            return "destructive";
        default:
            return "default";
    }
}

const getUrgencyClass = (urgency: string): string => {
    switch (urgency) {
        case "Crítica":
            return "border-red-500 bg-red-50";
        case "Alta":
            return "border-orange-500 bg-orange-50";
        case "Média":
            return "border-yellow-500 bg-yellow-50";
        default:
            return "";
    }
}

const getUrgencyTextClass = (urgency: string): string => {
     switch (urgency) {
        case "Crítica":
            return "text-red-600";
        case "Alta":
            return "text-orange-600";
        case "Média":
            return "text-yellow-600";
        default:
            return "text-gray-600";
    }
}

export default function ReportCard({ report }: ReportCardProps) {
  const urgency = report.analysis?.urgency || "Baixa";
  return (
    <Link href={`/ouvidoria/${report.id}`} className="block">
        <Card className={cn("shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 border-l-4", getUrgencyClass(urgency))}>
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <CardDescription>Protocolo: {report.id.substring(0, 10)}...</CardDescription>
                        <CardTitle className="text-xl font-bold font-headline mt-1">{report.category}</CardTitle>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                        <span className={cn("text-xs font-bold", getUrgencyTextClass(urgency))}>
                            URGÊNCIA: {urgency.toUpperCase()}
                        </span>
                    </div>
                </div>
            </CardHeader>
        <CardContent>
            <p className="text-muted-foreground line-clamp-2">{report.description}</p>
        </CardContent>
        <CardFooter className="p-4 bg-muted/20">
            <div className="text-sm text-primary flex items-center gap-2">
                Ver detalhes e participar <ArrowRight className="h-4 w-4" />
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}

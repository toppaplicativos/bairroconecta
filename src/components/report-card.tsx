
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ReportTimeline from "./report-timeline";
import { cn } from "@/lib/utils";

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
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4", getUrgencyClass(urgency))}>
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
        <p className="text-muted-foreground">{report.description}</p>
      </CardContent>
      <CardFooter className="p-0">
         <Accordion type="single" collapsible className="w-full px-6 pb-4">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-sm justify-start gap-2 hover:no-underline text-primary">Ver histórico de atualizações</AccordionTrigger>
            <AccordionContent>
                <ReportTimeline updates={report.updates} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

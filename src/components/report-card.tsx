
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ReportTimeline from "./report-timeline";

type ReportUpdate = {
  status: string;
  date: string;
  comment: string;
};

type Report = {
  protocol: string;
  category: string;
  status: "Aberta" | "Em andamento" | "Resolvido";
  date: string;
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


export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                     <CardDescription>Protocolo: {report.protocol}</CardDescription>
                     <CardTitle className="text-xl font-bold font-headline mt-1">{report.category}</CardTitle>
                </div>
                 <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
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

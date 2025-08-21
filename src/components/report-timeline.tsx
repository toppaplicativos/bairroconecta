
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader, Mail } from "lucide-react";

type ReportUpdate = {
  status: string;
  date: string;
  comment: string;
};

type ReportTimelineProps = {
  updates: ReportUpdate[];
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Resolvido":
            return <CheckCircle2 className="h-5 w-5 text-primary" />;
        case "Em andamento":
            return <Loader className="h-5 w-5 text-secondary-foreground animate-spin" />;
        case "Aberta":
            return <Mail className="h-5 w-5 text-destructive" />;
        default:
            return <Mail className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function ReportTimeline({ updates }: ReportTimelineProps) {
  return (
    <div className="relative pl-6">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-2.5"></div>
        {updates.map((update, index) => (
            <div key={index} className="relative mb-6">
                <div className="absolute left-0 top-0 -translate-x-1/2 p-1 rounded-full bg-background border">
                     {getStatusIcon(update.status)}
                </div>
                <div className="pl-6">
                    <p className="font-semibold text-sm">{update.status}</p>
                    <p className="text-xs text-muted-foreground">{update.date}</p>
                    <p className="text-sm mt-1">{update.comment}</p>
                </div>
            </div>
        ))}

    </div>
  );
}

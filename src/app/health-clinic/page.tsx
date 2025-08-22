
'use client';
import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewAppointmentForm from "@/components/new-appointment-form";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Carlos Andrade",
    specialty: "Clínico Geral",
    date: "15/08/2024",
    time: "10:30",
    status: "Confirmado",
  },
  {
    id: 2,
    doctor: "Dra. Lúcia Guimarães",
    specialty: "Odontologia",
    date: "22/08/2024",
    time: "14:00",
    status: "Confirmado",
  },
    {
    id: 3,
    doctor: "Dr. Marcos Rocha",
    specialty: "Pediatria",
    date: "05/09/2024",
    time: "09:00",
    status: "Confirmado",
  },
];


export default function HealthClinicPage() {
    const [openNewAppointment, setOpenNewAppointment] = useState(false);

    const handleAppointmentSubmitted = () => {
        setOpenNewAppointment(false);
    }

    return (
        <MainLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Posto de Saúde</h1>
                        <p className="text-muted-foreground">Agende e acompanhe suas consultas.</p>
                    </div>
                     <Dialog open={openNewAppointment} onOpenChange={setOpenNewAppointment}>
                      <DialogTrigger asChild>
                         <Button className="w-full md:w-auto">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agendar Consulta
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Agendar Nova Consulta</DialogTitle>
                          <DialogDescription>
                            Preencha os dados para marcar sua consulta.
                          </DialogDescription>
                        </DialogHeader>
                        <NewAppointmentForm onAppointmentSubmitted={handleAppointmentSubmitted} />
                      </DialogContent>
                    </Dialog>
                </div>

                <div className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold tracking-tight font-headline">Próximos Agendamentos</h2>
                   {appointments.map((appt) => (
                    <Card key={appt.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-12 w-12 sm:flex">
                                    <AvatarFallback>{appt.doctor.charAt(4)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{appt.specialty}</p>
                                    <p className="text-sm text-muted-foreground">{appt.doctor}</p>
                                     <p className="text-sm text-muted-foreground">{`${appt.date} às ${appt.time}`}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Cancelar</Button>
                        </CardContent>
                    </Card>
                  ))}
                </div>
            </div>
        </MainLayout>
    )
}

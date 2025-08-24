
'use client';
import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Stethoscope, Baby, Brain, Bone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewAppointmentForm from "@/components/new-appointment-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import Link from "next/link";
import { healthProfessionals, specialties, appointments } from "@/lib/data";
import DoctorCard from "@/components/doctor-card";

const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M9.34 7.53c.63-.44 1.33-.73 2.16-.73h.97c.32 0 .63.06.92.18.3.12.56.29.77.5.21.21.38.46.48.74.1.28.15.58.15.88v.29c0 .3-.05.6-.15.88a1.53 1.53 0 0 1-.48.74c-.21.21-.47.38-.77.5a2.14 2.14 0 0 1-.92.18h-.97c-.83 0-1.53-.29-2.16-.73L6 14.5v5.5h12V14.5l-3.34-3.74c-.63.44-1.33.73-2.16.73h-.97c-.32 0-.63-.06-.92-.18a1.71 1.71 0 0 1-.77-.5c-.21-.21-.38-.46-.48-.74-.1-.28-.15-.58-.15-.88v-.29c0-.3.05-.6.15-.88.1-.28.27-.53.48-.74.2-.21.46-.38.76-.5.3-.12.6-.18.92-.18h.97c.83 0 1.53.29 2.16.73L18 9.5V4H6v3.5l3.34.03Z"/>
        <path d="M7 20h10"/>
    </svg>
);

const iconMap: { [key: string]: React.ElementType } = {
    Stethoscope,
    Tooth: ToothIcon,
    Baby,
    Brain,
    Bone,
    PlusCircle
};

export default function HealthClinicPage() {
    const [openNewAppointment, setOpenNewAppointment] = useState(false);

    const handleAppointmentSubmitted = () => {
        setOpenNewAppointment(false);
    }

    return (
        <MainLayout>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Portal da Saúde</h1>
                    <p className="text-muted-foreground">Sua central para agendamentos e cuidados no bairro.</p>
                </div>

                <Card className="bg-primary/5 text-center p-6 md:p-10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-bold font-headline">Precisa de atendimento?</CardTitle>
                    <CardDescription className="max-w-md mx-auto">Agende sua consulta de forma rápida e fácil com os profissionais do nosso bairro.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Dialog open={openNewAppointment} onOpenChange={setOpenNewAppointment}>
                        <DialogTrigger asChild>
                           <Button size="lg" className="shadow-md">
                              <PlusCircle className="mr-2 h-5 w-5" />
                              Agendar Nova Consulta
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
                  </CardContent>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Especialidades</h2>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {specialties.map((specialty) => {
                          const Icon = iconMap[specialty.icon];
                          return (
                            <Link href="#" key={specialty.name}>
                               <Card className="text-center p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50 transition-all h-full">
                                  <div className="p-3 bg-primary/10 rounded-full">
                                    {Icon && <Icon className="h-8 w-8 text-primary" />}
                                  </div>
                                  <p className="text-sm font-semibold">{specialty.name}</p>
                              </Card>
                            </Link>
                          );
                      })}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Nossos Profissionais</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {healthProfessionals.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                      ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold tracking-tight font-headline">Meus Agendamentos</h2>
                  {appointments.length > 0 ? (
                      <div className="space-y-3">
                        {appointments.map((appt) => (
                          <Card key={appt.id} className="shadow-sm">
                              <CardContent className="p-4 flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                      <Avatar className="hidden h-12 w-12 sm:flex border">
                                          <AvatarFallback>{appt.doctor.charAt(4)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <p className="font-bold">{appt.specialty}</p>
                                          <p className="text-sm text-muted-foreground">{appt.doctor}</p>
                                          <p className="text-sm font-semibold text-primary mt-1">{`${appt.date} às ${appt.time}`}</p>
                                      </div>
                                  </div>
                                  <Button variant="outline" size="sm">Cancelar</Button>
                              </CardContent>
                          </Card>
                        ))}
                      </div>
                  ) : (
                    <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                        <p>Você ainda não possui agendamentos.</p>
                    </div>
                  )}
                </div>
            </div>
        </MainLayout>
    )
}

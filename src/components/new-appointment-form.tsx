
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Send } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

export default function NewAppointmentForm() {
    const [date, setDate] = React.useState<Date>()
    return (
         <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty" className="text-right">
                    Especialidade
                </Label>
                <Select>
                    <SelectTrigger id="specialty" className="col-span-3">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="clinico-geral">Clínico Geral</SelectItem>
                        <SelectItem value="pediatria">Pediatria</SelectItem>
                        <SelectItem value="ginecologia">Ginecologia</SelectItem>
                        <SelectItem value="odontologia">Odontologia</SelectItem>
                        <SelectItem value="psicologia">Psicologia</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Paciente
                </Label>
                <Input id="name" placeholder="Nome completo do paciente" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dob" className="text-right">
                    Data Nasc.
                </Label>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3 justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">
                    Motivo
                </Label>
                <Textarea id="reason" placeholder="Descreva brevemente o motivo da consulta" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <div/>
                <Button type="submit" className="col-span-3">
                    <Send className="mr-2 h-4 w-4" />
                    Solicitar Agendamento
                </Button>
            </div>
        </div>
    )
}

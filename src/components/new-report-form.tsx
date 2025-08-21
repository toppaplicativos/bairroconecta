
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Send } from "lucide-react";

export default function NewReportForm() {
    return (
         <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                    Categoria
                </Label>
                <Select>
                    <SelectTrigger id="category" className="col-span-3">
                        <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="buraco-rua">Buraco na rua</SelectItem>
                        <SelectItem value="iluminacao">Iluminação pública</SelectItem>
                        <SelectItem value="lixo">Lixo acumulado</SelectItem>
                        <SelectItem value="sinalizacao">Sinalização de trânsito</SelectItem>
                        <SelectItem value="seguranca">Segurança</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                    Descrição
                </Label>
                <Textarea id="description" placeholder="Ex: Há um poste com a lâmpada queimada em frente ao número 100." className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photo" className="text-right">
                    Foto
                </Label>
                <Button variant="outline" className="col-span-3 justify-start font-normal text-muted-foreground">
                    <Camera className="mr-2 h-4 w-4" />
                    Anexar uma foto
                </Button>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <div/>
                <Button type="submit" className="col-span-3">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Manifestação
                </Button>
            </div>
        </div>
    )
}

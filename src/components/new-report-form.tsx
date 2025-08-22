
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Send, Loader2, FileImage, X, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitReport } from "@/app/actions";
import { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Progress } from "./ui/progress";


const reportSchema = z.object({
    category: z.string({ required_error: "Selecione uma categoria." }),
    description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres."),
    address: z.string().min(10, "Por favor, informe um endereço."),
    imageUrl: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface NewReportFormProps {
    onReportSubmitted: () => void;
}

export default function NewReportForm({ onReportSubmitted }: NewReportFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user] = useAuthState(auth);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const storage = getStorage();
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    
    const form = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            description: "",
            address: "",
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    
    const onFileRemove = () => {
        setSelectedFile(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const onSubmit = async (data: ReportFormValues) => {
        if (!user) {
             toast({
                variant: "destructive",
                title: "Usuário não autenticado",
                description: "Você precisa fazer login para enviar uma manifestação.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            let imageUrl = '';
            if (selectedFile) {
                const storageRef = ref(storage, `reports/${user.uid}/${Date.now()}-${selectedFile.name}`);
                const result = await uploadFile(storageRef, selectedFile, {
                    contentType: selectedFile.type
                });
                if(result) {
                    imageUrl = await getDownloadURL(result.ref);
                } else {
                    throw new Error("Falha no upload da imagem.");
                }
            }

            const reportData = { ...data, imageUrl };
            const result = await submitReport(reportData, user.uid);
            
            toast({
                title: "Manifestação Enviada!",
                description: `Sua solicitação foi registrada com o protocolo ${result.id.substring(0, 10)}... e classificada com urgência: ${result.urgency}.`,
            });
            form.reset();
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            onReportSubmitted();
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Erro ao Enviar",
                description: "Não foi possível processar sua manifestação. Tente novamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadProgress = snapshot ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) : 0;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger disabled={isSubmitting}>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Buraco na rua">Buraco na rua</SelectItem>
                                    <SelectItem value="Iluminação pública">Iluminação pública</SelectItem>
                                    <SelectItem value="Lixo acumulado">Lixo acumulado</SelectItem>
                                    <SelectItem value="Sinalização de trânsito">Sinalização de trânsito</SelectItem>
                                    <SelectItem value="Segurança">Segurança</SelectItem>
                                    <SelectItem value="Outros">Outros</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex: Há um poste com a lâmpada queimada em frente ao número 100."
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço da Ocorrência</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Rua, Número, Bairro"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2">
                    <Label htmlFor="photo">Foto</Label>
                    {!selectedFile && (
                         <Button type="button" variant="outline" className="w-full justify-start font-normal text-muted-foreground" onClick={() => fileInputRef.current?.click()} disabled={isSubmitting}>
                            <Camera className="mr-2 h-4 w-4" />
                            Anexar uma foto
                        </Button>
                    )}
                    <Input 
                        id="photo" 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        className="hidden" 
                        accept="image/*"
                        disabled={isSubmitting}
                    />

                    {selectedFile && (
                        <div className="p-2 border rounded-md space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileImage className="h-4 w-4" />
                                    <span className="truncate max-w-48">{selectedFile.name}</span>
                                    {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {!uploading && uploadProgress === 100 && <CheckCircle className="h-4 w-4 text-green-500" />}
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onFileRemove} disabled={isSubmitting}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            {uploading && <Progress value={uploadProgress} className="h-2" />}
                            {error && <p className="text-xs text-destructive">{error.message}</p>}
                        </div>
                    )}
                </div>


                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analisando e Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Manifestação
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
}

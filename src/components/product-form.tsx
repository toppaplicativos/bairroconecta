
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileImage, X, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Progress } from "./ui/progress";
import Image from "next/image";

const productSchema = z.object({
    name: z.string().min(3, "O nome do produto deve ter pelo menos 3 caracteres."),
    description: z.string().optional(),
    price: z.coerce.number().positive("O preço deve ser um número positivo."),
    imageUrl: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    onFinished: () => void;
    product?: ProductFormValues & { id: string };
}

export function ProductForm({ onFinished, product }: ProductFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user] = useAuthState(auth);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const storage = getStorage();
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || 0,
            imageUrl: product?.imageUrl || "",
        },
    });
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    
    const onFileRemove = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        form.setValue('imageUrl', '');
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const onSubmit = async (data: ProductFormValues) => {
        if (!user) {
             toast({ variant: "destructive", title: "Não autenticado." });
            return;
        }

        setIsSubmitting(true);
        try {
            let imageUrl = product?.imageUrl || '';
            if (selectedFile) {
                const storageRef = ref(storage, `products/${user.uid}/${Date.now()}-${selectedFile.name}`);
                const result = await uploadFile(storageRef, selectedFile, { contentType: selectedFile.type });
                if(result) {
                    imageUrl = await getDownloadURL(result.ref);
                } else {
                    throw new Error("Falha no upload da imagem.");
                }
            }

            const productData = { ...data, imageUrl };
            // TODO: Replace with server action to create/update product
            console.log("Submitting product data:", productData);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast({
                title: product ? "Produto Atualizado!" : "Produto Adicionado!",
                description: `O produto "${data.name}" foi salvo com sucesso.`,
            });
            form.reset();
            onFinished();
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Erro ao Salvar",
                description: "Não foi possível salvar o produto. Tente novamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadProgress = snapshot ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) : 0;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[75vh] overflow-y-auto pr-4">
                <div className="space-y-2">
                     <FormLabel htmlFor="photo">Foto do Produto</FormLabel>
                     <div className="relative w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
                        {previewUrl ? (
                            <>
                                <Image src={previewUrl} alt="Pré-visualização" layout="fill" objectFit="cover" className="rounded-lg" />
                                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 z-10" onClick={onFileRemove} disabled={isSubmitting}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                             <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <FileImage className="mx-auto h-8 w-8" />
                                <p className="text-sm mt-2">Clique para adicionar uma imagem</p>
                            </div>
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
                    </div>
                     {uploading && <Progress value={uploadProgress} className="h-2" />}
                     {error && <p className="text-xs text-destructive">{error.message}</p>}
                </div>
                
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Produto</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Pizza de Calabresa" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço (R$)</FormLabel>
                            <FormControl>
                               <Input type="number" step="0.01" placeholder="Ex: 29.90" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição (Opcional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ingredientes, tamanho, etc."
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting || uploading}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        "Salvar Produto"
                    )}
                </Button>
            </form>
        </Form>
    );
}

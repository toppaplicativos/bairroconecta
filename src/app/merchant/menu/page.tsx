
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { ProductForm } from '@/components/product-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

// Placeholder data
const products = [
    {
        id: '1',
        name: 'Lasanha à Bolonhesa',
        price: 59.90,
        imageUrl: 'https://placehold.co/400x400.png',
        status: 'active'
    },
    {
        id: '2',
        name: 'Fettuccine Alfredo',
        price: 54.90,
        imageUrl: 'https://placehold.co/400x400.png',
        status: 'active'
    },
    {
        id: '3',
        name: 'Pizza Margherita',
        price: 49.90,
        imageUrl: 'https://placehold.co/400x400.png',
        status: 'archived'
    }
]

export default function MerchantMenuPage() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Cardápio</h2>
                    <p className="text-muted-foreground">Gerencie os itens e pratos da sua loja.</p>
                </div>
                 <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                         <Button><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar Novo Item ao Cardápio</DialogTitle>
                             <DialogDescription>
                                Preencha os detalhes do seu novo prato ou item.
                            </DialogDescription>
                        </DialogHeader>
                        <ProductForm onFinished={() => setOpenDialog(false)} />
                    </DialogContent>
                </Dialog>
            </div>
             <Card>
              <CardHeader>
                <CardTitle>Seu Cardápio</CardTitle>
                <CardDescription>
                  A lista de todos os itens disponíveis na sua loja.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Imagem</span>
                      </TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Preço</TableHead>
                      <TableHead>
                        <span className="sr-only">Ações</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                         <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={product.imageUrl}
                                width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                                <Badge variant={product.status === 'active' ? 'outline' : 'secondary'}>
                                    {product.status === 'active' ? 'Disponível' : 'Esgotado'}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">R${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </div>
    )
}

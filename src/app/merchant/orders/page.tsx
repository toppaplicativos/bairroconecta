
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
import { MoreHorizontal } from 'lucide-react';

// Placeholder data
const orders = [
    {
        id: 'o1',
        customer: 'Ana Silva',
        date: '2024-07-28',
        status: 'Pendente',
        total: 114.80
    },
    {
        id: 'o2',
        customer: 'Ricardo Mendes',
        date: '2024-07-28',
        status: 'Concluído',
        total: 59.90
    },
    {
        id: 'o3',
        customer: 'Juliana Costa',
        date: '2024-07-27',
        status: 'Concluído',
        total: 49.90
    },
    {
        id: 'o4',
        customer: 'Marcos Lira',
        date: '2024-07-29',
        status: 'Em Preparo',
        total: 54.90
    }
]

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Pendente': return 'destructive';
        case 'Em Preparo': return 'secondary';
        case 'Concluído': return 'default';
        default: return 'outline';
    }
};

export default function MerchantOrdersPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Pedidos</h2>
                    <p className="text-muted-foreground">Gerencie os pedidos recebidos pela sua loja.</p>
                </div>
            </div>
             <Card>
              <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
                <CardDescription>
                  A lista de todos os pedidos feitos em sua loja.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Data</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>
                        <span className="sr-only">Ações</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                         <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.customer}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(order.status)}>
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {new Date(order.date).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right">R${order.total.toFixed(2)}</TableCell>
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
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
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

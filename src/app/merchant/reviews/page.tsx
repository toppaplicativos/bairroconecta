
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Placeholder data - in a real app, this would come from a database
const reviews = [
  {
    id: 'r1',
    author: 'Carlos S.',
    avatarUrl: 'https://placehold.co/40x40.png',
    rating: 5,
    comment: 'Melhor massa que já comi em São Paulo! Atendimento impecável.',
    date: '2 dias atrás',
    product: 'Lasanha à Bolonhesa',
  },
  {
    id: 'r2',
    author: 'Ana P.',
    avatarUrl: 'https://placehold.co/40x40.png',
    rating: 4,
    comment: 'Lugar aconchegante, comida boa. Apenas um pouco demorado no sábado.',
    date: '1 semana atrás',
    product: 'Fettuccine Alfredo',
  },
  {
    id: 'r3',
    author: 'Mariana F.',
    avatarUrl: 'https://placehold.co/40x40.png',
    rating: 5,
    comment: 'Pizza deliciosa e entrega super rápida! Recomendo a todos do bairro.',
    date: '3 semanas atrás',
    product: 'Pizza Margherita',
  }
];

export default function MerchantReviewsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Avaliações</h2>
          <p className="text-muted-foreground">Veja o que seus clientes estão dizendo.</p>
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatarUrl} />
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-muted'}`} />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">"{review.comment}"</p>
            </CardContent>
            <CardContent className="flex items-center justify-end">
               <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Responder
                </Button>
            </CardContent>
          </Card>
        ))}
        {reviews.length === 0 && (
             <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>Você ainda não recebeu nenhuma avaliação.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

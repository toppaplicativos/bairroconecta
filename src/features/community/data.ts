import {
  Car,
  HandHelping,
  Map,
  MessageSquare,
  Search,
  ShieldCheck,
  Users,
  Vote,
} from 'lucide-react';

export const communityModules = [
  {
    title: 'Fórum do bairro',
    description: 'Discussões organizadas por assunto, rua e interesse local.',
    href: '/community/forum',
    icon: MessageSquare,
    status: 'active' as const,
    tone: 'blue' as const,
  },
  {
    title: 'Salas e grupos',
    description: 'Conversas rápidas entre moradores e grupos de interesse.',
    href: '/community/chat',
    icon: Users,
    status: 'active' as const,
    tone: 'teal' as const,
  },
  {
    title: 'Enquetes locais',
    description: 'Decisões rápidas sobre prioridades, eventos e melhorias.',
    href: '/community/forum',
    icon: Vote,
    status: 'active' as const,
    tone: 'violet' as const,
  },
  {
    title: 'Vizinhança solidária',
    description: 'Pedidos e ofertas de ajuda entre pessoas próximas.',
    href: '#',
    icon: HandHelping,
    status: 'planned' as const,
    tone: 'amber' as const,
  },
  {
    title: 'Achados e perdidos',
    description: 'Publicações locais para itens, documentos e animais.',
    href: '#',
    icon: Search,
    status: 'planned' as const,
    tone: 'slate' as const,
  },
  {
    title: 'Caronas',
    description: 'Combine deslocamentos recorrentes e eventos do bairro.',
    href: '#',
    icon: Car,
    status: 'planned' as const,
    tone: 'rose' as const,
  },
];

export const communityHighlights = [
  {
    id: 'seguranca-praca',
    title: 'Iluminação e segurança na praça central',
    excerpt: 'Moradores estão reunindo pontos escuros e horários com maior movimento para encaminhar uma demanda conjunta.',
    meta: '23 respostas · atualizado há 18 min',
    category: 'Segurança',
    icon: ShieldCheck,
  },
  {
    id: 'mutirao-limpeza',
    title: 'Mutirão de limpeza neste sábado',
    excerpt: 'A comunidade está organizando materiais, pontos de encontro e divisão das áreas.',
    meta: '42 interessados · sábado, 08:00',
    category: 'Ação local',
    icon: HandHelping,
  },
  {
    id: 'mapa-servicos',
    title: 'Quais serviços estão faltando na região?',
    excerpt: 'Uma conversa para mapear demandas e aproximar novos profissionais e negócios locais.',
    meta: '31 respostas · em alta',
    category: 'Economia local',
    icon: Map,
  },
];

export const communityMetrics = [
  { label: 'Conversas ativas', value: '18', helper: 'Fórum e grupos' },
  { label: 'Participação', value: '326', helper: 'Interações nesta semana' },
  { label: 'Ações locais', value: '7', helper: 'Eventos e mobilizações' },
];

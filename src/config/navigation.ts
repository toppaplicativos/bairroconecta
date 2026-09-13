import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  CalendarDays,
  HeartPulse,
  Home,
  Map,
  Megaphone,
  MessagesSquare,
  Store,
  Tags,
  User,
  Briefcase,
} from 'lucide-react';

export type NavigationItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Meu Bairro',
    items: [
      { href: '/', label: 'Visão geral', description: 'Resumo e atalhos', icon: Home },
      { href: '/map', label: 'Mapa', description: 'Tudo perto de você', icon: Map },
    ],
  },
  {
    label: 'Descobrir',
    items: [
      { href: '/properties', label: 'Imóveis', description: 'Venda e aluguel', icon: Building2 },
      { href: '/businesses', label: 'Comércio', description: 'Negócios locais', icon: Store },
      { href: '/services', label: 'Serviços', description: 'Profissionais do bairro', icon: Briefcase },
      { href: '/events', label: 'Eventos', description: 'Agenda local', icon: CalendarDays },
      { href: '/classifieds', label: 'Classificados', description: 'Compra e venda', icon: Tags },
    ],
  },
  {
    label: 'Comunidade',
    items: [
      { href: '/community', label: 'Comunidade', description: 'Fórum e conversas', icon: MessagesSquare },
      { href: '/ouvidoria', label: 'Ouvidoria', description: 'Demandas públicas', icon: Megaphone },
      { href: '/health-clinic', label: 'Saúde', description: 'Atendimento e orientação', icon: HeartPulse },
    ],
  },
];

export const mobileNavigation: NavigationItem[] = [
  { href: '/', label: 'Início', description: 'Visão geral', icon: Home },
  { href: '/businesses', label: 'Comércio', description: 'Negócios locais', icon: Store },
  { href: '/map', label: 'Mapa', description: 'Explorar', icon: Map },
  { href: '/community', label: 'Comunidade', description: 'Conversas', icon: MessagesSquare },
  { href: '/profile', label: 'Perfil', description: 'Conta', icon: User },
];

export function isNavigationItemActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

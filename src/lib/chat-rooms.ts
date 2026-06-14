
export const predefinedRooms = [
  {
    id: 'geral',
    name: 'Geral',
    emoji: '🏘️',
    description: 'Conversa livre sobre o bairro',
    color: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'seguranca',
    name: 'Segurança',
    emoji: '🔒',
    description: 'Alertas e dicas de segurança local',
    color: 'bg-red-100 text-red-700',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600',
  },
  {
    id: 'eventos',
    name: 'Eventos',
    emoji: '🎉',
    description: 'Eventos e encontros do bairro',
    color: 'bg-purple-100 text-purple-700',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 'animais',
    name: 'Animais',
    emoji: '🐾',
    description: 'Bichinhos e pets do bairro',
    color: 'bg-green-100 text-green-700',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600',
  },
  {
    id: 'infraestrutura',
    name: 'Infraestrutura',
    emoji: '🏗️',
    description: 'Melhorias e problemas de infraestrutura',
    color: 'bg-orange-100 text-orange-700',
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    id: 'avisos',
    name: 'Avisos',
    emoji: '📢',
    description: 'Avisos importantes para a comunidade',
    color: 'bg-yellow-100 text-yellow-700',
    border: 'border-yellow-200',
    gradient: 'from-yellow-500 to-yellow-600',
  },
] as const;

export type ChatRoom = typeof predefinedRooms[number];

export function getRoomConfig(id: string) {
  return predefinedRooms.find((r) => r.id === id) ?? predefinedRooms[0];
}

export const QUICK_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '👏'] as const;

export const forumCategories = [
  { name: 'Geral',          color: 'bg-gray-100 text-gray-700',   border: 'border-gray-300',   dot: 'bg-gray-500',   emoji: '💬' },
  { name: 'Segurança',      color: 'bg-red-100 text-red-700',     border: 'border-red-300',    dot: 'bg-red-500',    emoji: '🔒' },
  { name: 'Infraestrutura', color: 'bg-orange-100 text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500', emoji: '🏗️' },
  { name: 'Eventos',        color: 'bg-purple-100 text-purple-700', border: 'border-purple-300', dot: 'bg-purple-500', emoji: '🎉' },
  { name: 'Avisos',         color: 'bg-yellow-100 text-yellow-700', border: 'border-yellow-300', dot: 'bg-yellow-500', emoji: '📢' },
  { name: 'Dúvidas',        color: 'bg-blue-100 text-blue-700',   border: 'border-blue-300',   dot: 'bg-blue-500',   emoji: '❓' },
  { name: 'Animais',        color: 'bg-green-100 text-green-700', border: 'border-green-300',  dot: 'bg-green-500',  emoji: '🐾' },
] as const;

export type ForumCategoryName = (typeof forumCategories)[number]['name'];

export function getCategoryStyle(name?: string) {
  return forumCategories.find(c => c.name === name) ?? forumCategories[0];
}

# Meu Bairro — Design System

Este documento define a linguagem visual e as regras de composição do produto. O objetivo é impedir que cada módulo crie sua própria interface e garantir que novas áreas possam crescer sem regressão visual.

## Princípios

1. **Produto antes de decoração** — hierarquia, legibilidade e fluxo têm prioridade sobre efeitos.
2. **Hiperlocal, não infantil** — a marca deve transmitir proximidade e confiança sem depender de cores excessivamente suaves ou ícones grandes demais.
3. **Superfícies consistentes** — cards, modais, inputs e barras compartilham os mesmos tokens.
4. **Densidade controlada** — desktop aproveita espaço; mobile prioriza leitura e ações essenciais.
5. **Um sistema, vários módulos** — Imóveis, Comércio, Serviços, Saúde, Comunidade, Eventos, Classificados e Ouvidoria usam a mesma base.
6. **IA contextual** — IA aparece no ponto em que reduz esforço; não como banner obrigatório em toda página.
7. **Dados antes de marketing** — telas operacionais mostram estado, contexto e ação; copy promocional fica restrita a momentos editoriais claros.

## Tipografia

- Família principal: **Manrope** via `next/font`.
- Display: 40–56px, peso 600, tracking negativo.
- Título de página: 30–36px, peso 600.
- Título de seção: 18–24px, peso 600.
- Corpo: 14–16px, line-height 1.5–1.75.
- Metadata: 10–12px.
- Labels de sistema: 10–11px, uppercase, tracking alto apenas para kickers/eyebrows.

## Cores semânticas

As cores vivem em `src/app/globals.css` e são expostas pelo Tailwind.

- `background`: fundo geral do aplicativo.
- `foreground`: texto principal.
- `surface`: superfície principal.
- `surface-subtle`: superfície de apoio.
- `card`: cards e painéis.
- `primary`: ação/seleção principal.
- `secondary`: ação neutra.
- `muted`: superfícies e texto auxiliar.
- `accent`: destaque complementar.
- `success`, `warning`, `info`, `destructive`: estados semânticos.
- `border`, `input`, `ring`: estrutura e foco.

Cores de domínio — azul, teal, violeta, âmbar, rosa — podem ser usadas em ícones, badges, gráficos e pequenos acentos. Elas **não** redefinem o tema inteiro de uma página.

Nunca criar uma nova cor global dentro de uma página sem antes verificar se ela corresponde a um token semântico existente.

## Espaçamento

Base de 4px.

- 4 / 8 / 12px: micro-espaçamento.
- 16 / 20 / 24px: componentes.
- 32 / 40px: seções.
- 48px+: blocos editoriais/hero.

`PageContainer` é o padrão para largura e padding das páginas.

- largura máxima de aplicação: 1600px;
- mobile: 16px;
- tablet: 24px;
- desktop: 32px;
- gap padrão entre cards: 16px.

## Radius

- Controles: 10–12px (`rounded-xl`).
- Cards/painéis: 16–20px (`rounded-2xl`).
- Hero/superfícies especiais: até 28px.
- `rounded-full` somente para badges, avatares e indicadores.

## Sombras

- `shadow-panel`: elevação mínima para superfícies.
- `shadow-float`: hover, dropdowns e elementos de destaque.
- `shadow-nav`: barras fixas e navegação mobile.

Sombras não substituem bordas; normalmente usamos borda + sombra leve.

## App Shell

`MainLayout` é a moldura permanente do produto.

### Desktop

- sidebar persistente e colapsável;
- grupos de navegação vindos de `src/config/navigation.ts`;
- topbar com contexto local, busca global, IA, notificações e perfil;
- conteúdo preserva largura/densidade adequada para produtividade.

### Mobile

- header compacto;
- drawer para navegação completa;
- bottom navigation com até cinco destinos primários;
- safe-area para iOS;
- ações principais com alvo touch de aproximadamente 44px.

O shell não importa Firebase, Supabase ou qualquer SDK de dados. Autenticação e perfil entram por providers/adapters próprios.

## Componentes de sistema

### `PageContainer`
Controla largura máxima e espaçamento da página.

### `SectionHeading`
Padroniza eyebrow, título, descrição e ação contextual.

### `MetricCard`
Métrica com label, valor, helper e estado/trend.

### `ModuleCard`
Entrada para módulos/capabilities do produto.

### `MainLayout`
App shell compartilhado: sidebar desktop, topbar, busca global, acesso à IA, navegação mobile e ações rápidas.

## Componentes UI

`src/components/ui` contém os primitivos de menor nível (Button, Card, Input, Dialog, Sheet, Badge, Tabs etc.). Esses componentes devem receber melhorias globais antes de cada tela criar overrides locais.

Antes de criar um componente de tela, verificar nesta ordem:

1. já existe um primitive em `ui/*`?
2. já existe um padrão em `system/*`?
3. o elemento é específico de uma feature e deve ficar em `features/<feature>/components`?

## Padrão de página

Quando fizer sentido, cada rota segue esta ordem:

1. `SectionHeading` com contexto/título;
2. busca, filtros ou ação principal;
3. métricas/resumo opcionais;
4. conteúdo principal;
5. estados de loading, vazio, erro e sucesso;
6. CTA contextual somente quando houver próximo passo real.

## Responsividade

- Mobile: barra inferior, menu lateral em Sheet, grids de 1–2 colunas.
- Tablet: grids de 2–3 colunas e topbar completa.
- Desktop: sidebar persistente/colapsável, conteúdo até 1600px.

Nenhum layout deve depender de largura fixa de dispositivo específico.

## Acessibilidade

- foco visível em controles interativos;
- contraste AA como base;
- ícones não substituem labels essenciais;
- estado não depende somente de cor;
- formulários usam labels/aria quando necessário;
- alvos touch próximos de 44px.

## Regras para novas telas

1. Compor a tela dentro de `MainLayout`.
2. Usar `PageContainer`.
3. Começar com `SectionHeading` quando houver título de página.
4. Preferir `Card`, `Button`, `Input` e demais primitives antes de criar CSS específico.
5. Não duplicar arrays de navegação; usar `src/config/navigation.ts`.
6. Estados de loading, vazio, erro e sucesso devem ter linguagem visual consistente.
7. Evitar gradientes decorativos em excesso; gradiente só quando tiver função clara de destaque.
8. Qualquer novo padrão recorrente vira componente em `src/components/system`.
9. Nenhuma página importa diretamente Firestore/Postgres; dados passam pela boundary da feature/repository.
10. Não usar `style={{ '--primary': ... }}` para criar um tema exclusivo por módulo.

## Anti-patterns proibidos

- um tema de cor diferente por página;
- cards gigantes com ícone + texto como única estrutura do produto;
- sombras pesadas em todos os elementos;
- `rounded-[2rem]` indiscriminado;
- Firebase/Supabase diretamente dentro de componentes visuais;
- duplicação de navigation/header/footer;
- copy promocional no lugar de informação operacional;
- mocks que simulam ação real sem indicar claramente o estado.

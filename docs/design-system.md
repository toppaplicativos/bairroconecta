# Meu Bairro — Design System

Este documento define a linguagem visual e as regras de composição do produto. O objetivo é impedir que cada módulo crie sua própria interface e garantir que novas áreas possam crescer sem regressão visual.

## Princípios

1. **Produto antes de decoração** — hierarquia, legibilidade e fluxo têm prioridade sobre efeitos.
2. **Hiperlocal, não infantil** — a marca deve transmitir proximidade e confiança sem depender de cores excessivamente suaves ou ícones grandes demais.
3. **Superfícies consistentes** — cards, modais, inputs e barras compartilham os mesmos tokens.
4. **Densidade controlada** — desktop aproveita espaço; mobile prioriza leitura e ações essenciais.
5. **Um sistema, vários módulos** — Imóveis, Comércio, Serviços, Saúde, Comunidade e Ouvidoria usam a mesma base.

## Tipografia

- Família principal: **Manrope** via `next/font`.
- Títulos: peso 600, tracking negativo moderado.
- Corpo: peso 400/500, line-height confortável.
- Labels de sistema: 10–11px, uppercase, tracking alto apenas para kickers/eyebrows.

## Cores semânticas

As cores vivem em `src/app/globals.css` e são expostas pelo Tailwind.

- `background`: fundo geral do aplicativo.
- `foreground`: texto principal.
- `card`: superfície principal.
- `primary`: ação/seleção principal.
- `secondary`: ação neutra.
- `muted`: superfícies e texto auxiliar.
- `accent`: destaque complementar.
- `success`, `warning`, `info`, `destructive`: estados semânticos.
- `border`, `input`, `ring`: estrutura e foco.

Nunca criar uma nova cor global dentro de uma página sem antes verificar se ela corresponde a um token semântico existente.

## Espaçamento

Base de 4px.

- 4 / 8 / 12px: micro-espaçamento.
- 16 / 20 / 24px: componentes.
- 32 / 40px: seções.
- 48px+: blocos editoriais/hero.

`PageContainer` é o padrão para largura e padding das páginas.

## Radius

- Controles: 12px (`rounded-xl`).
- Cards/painéis: 16–20px (`rounded-2xl`).
- Hero/superfícies especiais: até 28px.
- Evitar `rounded-full` exceto badges, avatares e indicadores.

## Sombras

- `shadow-panel`: elevação mínima para superfícies.
- `shadow-float`: hover, dropdowns e elementos de destaque.
- `shadow-nav`: barras fixas e navegação mobile.

Sombras não devem substituir bordas; normalmente usamos borda + sombra leve.

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

`src/components/ui` contém os primitivos de menor nível (Button, Card, Input, Dialog, Sheet, Badge etc.). Esses componentes devem receber melhorias globais antes de cada tela criar overrides locais.

## Responsividade

- Mobile: barra inferior, menu lateral em Sheet, grids de 1–2 colunas.
- Tablet: grids de 2–3 colunas e topbar completa.
- Desktop: sidebar persistente/colapsável, conteúdo até 1600px.

## Regras para novas telas

1. Compor a tela dentro de `MainLayout`.
2. Usar `PageContainer`.
3. Começar com `SectionHeading` quando houver título de página.
4. Preferir `Card`, `Button`, `Input` e demais primitivos antes de criar CSS específico.
5. Não duplicar arrays de navegação; usar `src/config/navigation.ts`.
6. Estados de loading, vazio, erro e sucesso devem ter linguagem visual consistente.
7. Evitar gradientes decorativos em excesso; usar gradiente apenas quando ele tiver função clara de destaque.
8. Qualquer novo padrão recorrente deve virar componente em `src/components/system`.

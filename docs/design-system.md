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
8. **Sensação de app nativo** — controles, navegação, feedback, touch targets e transições devem parecer parte de um aplicativo, não de uma landing page responsiva.
9. **Identidade própria** — assets genéricos só entram quando não existe ganho de marca em criar um símbolo próprio.

## Identidade visual e iconografia

### Regra absoluta: sem emojis

Emojis não fazem parte da interface do Meu Bairro. Não usar emojis em:

- títulos;
- cards;
- badges;
- estados vazios;
- navegação;
- botões;
- notificações;
- métricas;
- CTAs;
- ilustrações de interface.

Quando houver necessidade de representação visual, usar nesta ordem:

1. **SVG proprietário do Meu Bairro** quando o elemento fizer parte da identidade ou tiver recorrência relevante;
2. **Lucide** para ações e conceitos utilitários;
3. ilustração própria vetorial ou imagem editorial quando um ícone não for suficiente.

### SVG proprietário

O símbolo principal está em `src/components/brand/meu-bairro-mark.tsx`.

Novos assets proprietários devem:

- usar `viewBox` consistente;
- funcionar em alta densidade sem bitmap;
- aceitar cor por `currentColor` ou tokens;
- funcionar em light e dark;
- evitar excesso de detalhe;
- manter linguagem geométrica coerente com o símbolo principal.

Não baixar packs aleatórios de ícones para cada módulo.

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

## Tema claro e escuro

Light e dark são parte da fundação, não uma etapa posterior.

O produto suporta três preferências:

- `Claro`;
- `Escuro`;
- `Sistema`.

A preferência é persistida em `localStorage` e aplicada antes da hidratação para evitar flash de tema incorreto.

Regras obrigatórias:

- componentes compartilhados usam tokens semânticos antes de classes de cor fixa;
- superfícies não devem depender de `bg-white` ou `text-slate-950` sem uma justificativa editorial;
- imagens, ilustrações e SVGs próprios devem ser verificáveis nos dois temas;
- bordas e sombras possuem leitura própria no dark mode;
- estados hover/focus/selected devem funcionar nos dois temas;
- `color-scheme` acompanha o tema para controles nativos do navegador.

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

## Cards premium

Cards não são caixas genéricas repetidas. Cada card precisa ter hierarquia interna clara.

Estrutura preferida:

1. contexto/eyebrow ou mídia;
2. informação principal;
3. metadata essencial;
4. estado/reputação quando aplicável;
5. ação ou affordance discreta.

Regras:

- borda + sombra leve como padrão;
- hover com deslocamento mínimo apenas em desktop;
- estado pressionado/touch sem depender de hover;
- nunca colocar cinco cores, badges e ícones competindo no mesmo card;
- cards de listagem devem compartilhar alinhamento, altura visual e ritmo;
- cards operacionais priorizam leitura; cards editoriais podem usar imagem e composição mais expressiva.

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
- topbar com contexto local, busca global, IA, tema, notificações e perfil;
- conteúdo preserva largura/densidade adequada para produtividade.

### Mobile

- header compacto;
- drawer para navegação completa;
- bottom navigation com até cinco destinos primários;
- safe-area para iOS;
- ações principais com alvo touch de aproximadamente 44px;
- feedback de toque e foco sem depender de hover.

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

### `ThemeToggle`
Alterna Claro / Escuro / Sistema e persiste a preferência.

### `MainLayout`
App shell compartilhado: sidebar desktop, topbar, busca global, acesso à IA, tema, navegação mobile e ações rápidas.

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
- alvos touch próximos de 44px;
- preferências de tema respeitam sistema;
- assets decorativos não devem poluir a leitura por leitor de tela.

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
11. Não introduzir emoji em nenhum texto de interface.
12. Toda nova superfície deve ser revisada em light e dark.
13. Todo novo ícone de marca recorrente deve ser considerado para SVG próprio antes de reutilizar um ícone genérico.

## Anti-patterns proibidos

- emojis em UI;
- um tema de cor diferente por página;
- cards gigantes com ícone + texto como única estrutura do produto;
- sombras pesadas em todos os elementos;
- `rounded-[2rem]` indiscriminado;
- Firebase/Supabase diretamente dentro de componentes visuais;
- duplicação de navigation/header/footer;
- copy promocional no lugar de informação operacional;
- mocks que simulam ação real sem indicar claramente o estado;
- usar `bg-white`/`text-black` como padrão estrutural ignorando tokens de tema;
- misturar bibliotecas de ícones sem necessidade.

# Meu Bairro — Arquitetura Next.js

## Objetivo

Transformar o BairroConecta em uma plataforma local modular, capaz de crescer por domínio e por bairro sem acoplar UI, autenticação, dados e integrações dentro das mesmas telas.

A regra principal é simples: **rotas compõem, features conhecem o domínio, server conhece infraestrutura**.

## Camadas

### `src/app`
Responsável por rotas, layouts, metadata e composição. Deve conter pouca regra de negócio e preferir Server Components.

### `src/components/ui`
Primitivos de interface: Button, Card, Input, Dialog, Sheet, Badge, Tabs etc.

### `src/components/system`
Padrões de produto reutilizáveis: PageContainer, SectionHeading, MetricCard, ModuleCard e futuros layouts compartilhados.

### `src/config`
Configuração estática e centralizada: navegação, módulos, feature flags e metadados de produto.

### `src/features`
Boundary de cada domínio. Cada feature concentra tipos, schemas, queries/actions e UI específica.

```text
src/features/
  properties/
    components/
    data.ts          # boundary temporária durante migração
    queries/
    actions/
    schemas/
    types.ts
  businesses/
  services/
  community/
  ombudsman/
  health/
  events/
  classifieds/
```

As `data.ts` atuais são uma etapa de transição: removem dados/Firestore das páginas e criam um ponto único que depois será substituído por repositories Supabase.

### `src/server`
Camada exclusiva de servidor para infraestrutura e regras sensíveis.

```text
src/server/
  auth/
  db/
  repositories/
  services/
  permissions/
  jobs/
```

Nenhuma página ou componente visual deve conhecer detalhes de Firestore, Postgres ou service role.

## Fluxo de dependências

```text
app route
  ↓
feature component / query / action
  ↓
server service / repository
  ↓
Supabase / integração externa
```

UI nunca importa `src/server` por caminhos que acabem no bundle do cliente. Client Components recebem dados serializáveis ou chamam Server Actions/Route Handlers apropriados.

## Backend alvo

### Supabase
Backend principal:

- Postgres;
- Auth;
- Storage;
- Realtime;
- Row Level Security.

### Vercel
Hospeda:

- Next.js App Router;
- Server Components;
- Route Handlers;
- Server Actions de curta duração;
- cache/revalidation;
- previews por branch.

### Oracle VPS
Somente processos que precisem permanecer vivos:

- workers;
- filas;
- consumidores de webhook;
- tarefas longas;
- integrações persistentes.

O Next.js não deve ser duplicado na VPS.

## Estratégia multi-bairro

A aplicação deve evoluir para tratar território como contexto, não como código duplicado.

Entidades que dependem de território devem receber `neighborhood_id`/`region_id` (ou equivalente) e queries sempre respeitam esse escopo.

A camada de autorização deve considerar pelo menos:

- usuário;
- papel/role;
- território;
- ownership da entidade;
- estado de publicação/moderação.

Não criar um projeto Next.js por bairro. O produto é uma única plataforma multi-tenant/territorial.

## Migração Firebase → Supabase

A migração ocorre por domínio, não por arquivo aleatório.

Ordem recomendada:

1. Auth e profiles.
2. Favorites.
3. Ouvidoria.
4. Comunidade/fórum.
5. Comércio e avaliações.
6. Imóveis.
7. Serviços e agenda.
8. Saúde.
9. Eventos/classificados persistentes.
10. Storage/uploads.

Cada feature passa a depender de repository/service interno; o adapter Firebase pode ser removido quando o adapter Supabase estiver validado.

## Banco e autorização

- IDs públicos: UUID.
- `created_at`/`updated_at` nas entidades persistentes.
- `neighborhood_id` nas entidades territoriais.
- RLS ativa em todas as tabelas expostas.
- roles/autorização não dependem de `user_metadata` controlável pelo cliente.
- `service_role` nunca vai para o navegador.
- uploads passam por buckets e policies explícitas.
- índices acompanham filtros reais: território, status, owner, categoria e datas.

## App Router

Usar Server Components por padrão. Client Components apenas quando houver interação real (state, browser APIs, hooks ou componentes Radix interativos).

Data fetching deve acontecer o mais próximo possível do servidor, reduzindo bundles de cliente.

Layouts compartilhados preservam navegação e estado visual durante troca de rotas.

### Route Groups sugeridos

```text
src/app/
  (public)/
  (app)/
  (professional)/
  (admin)/
```

Esses grupos podem ser introduzidos sem mudar URLs quando a migração de rotas estiver estabilizada.

## Cache e performance

- conteúdo público de catálogo: Server Components + cache/revalidation quando apropriado;
- dados personalizados/autenticados: dynamic/no-store conforme necessidade;
- imagens via `next/image` e domínios explicitamente permitidos;
- paginação/cursor para feeds; não carregar listas completas no cliente;
- busca pesada pode evoluir para Postgres full-text/pg_trgm antes de adicionar infraestrutura externa.

## Observabilidade

Antes de produção, instrumentar:

- erros de aplicação;
- latência de Route Handlers/Server Actions;
- falhas de integração;
- jobs da VPS;
- métricas de produto críticas (busca, publicação, contato, protocolo, conclusão).

Logs não devem conter tokens, documentos pessoais ou payloads sensíveis desnecessários.

## Qualidade

Antes de produção:

- `npm run typecheck`;
- `npm run build`;
- validação visual mobile/tablet/desktop;
- smoke test das rotas críticas;
- Supabase security advisors;
- checagem de variáveis por ambiente;
- teste de autorização/RLS com usuários de papéis diferentes.

Build errors não devem ser ignorados permanentemente. O `ignoreBuildErrors` existente deve ser removido assim que os erros legados forem eliminados.

## Fases

### Fase 1 — Fundação
Design system, App Shell, navegação e páginas-modelo.

### Fase 2 — Feature boundaries
Mover módulos para `src/features` e retirar SDKs de dados das páginas/componentes visuais.

### Fase 3 — Supabase
Schema, RLS, Auth, Storage, repositories e realtime.

### Fase 4 — Operação
Observabilidade, jobs na VPS quando necessários, cache, analytics, feature flags e testes.

### Fase 5 — Escala territorial
Onboarding de bairros/regiões, moderação e governança multi-tenant sem duplicar aplicação.

# Meu Bairro — Arquitetura Next.js

## Objetivo

Transformar o BairroConecta em uma plataforma local modular, capaz de crescer por domínio e por bairro sem acoplar UI, autenticação, dados e integrações dentro das mesmas telas.

## Camadas

### `src/app`
Responsável por rotas, layouts, metadata e composição das páginas. Deve conter pouca regra de negócio.

### `src/components/ui`
Primitivos de interface: Button, Card, Input, Dialog, Sheet, Badge, Tabs etc.

### `src/components/system`
Componentes de design system e composição de produto: PageContainer, SectionHeading, MetricCard, ModuleCard e futuros padrões compartilhados.

### `src/components`
Componentes de domínio ainda compartilhados, como PropertyCard e BusinessCard. À medida que o projeto crescer, eles devem migrar para seus respectivos `features`.

### `src/config`
Configuração estática e centralizada: navegação, módulos, feature flags e metadados de produto.

### `src/features` (próxima etapa)
Estrutura feature-first. Cada domínio deve concentrar UI específica, schemas, actions e data-access.

Exemplo:

```text
src/features/
  properties/
    components/
    actions/
    queries/
    schemas/
    types.ts
  businesses/
  services/
  community/
  ombudsman/
  health/
```

### `src/server` (próxima etapa)
Camada exclusiva de servidor para integrações, autenticação, autorização e data access.

```text
src/server/
  auth/
  db/
  repositories/
  services/
  jobs/
```

Nenhuma página deve conhecer detalhes de Firestore/Postgres diretamente.

## Backend alvo

### Supabase
Backend principal:

- Postgres
- Auth
- Storage
- Realtime
- Row Level Security

### Vercel
Hospeda:

- Next.js App Router
- Server Components
- Route Handlers
- Server Actions de curta duração
- Cache/revalidation

### Oracle VPS
Somente processos que precisem permanecer vivos:

- workers
- filas
- consumidores de webhook
- tarefas longas
- integrações persistentes

O Next.js não deve ser duplicado na VPS.

## Migração Firebase → Supabase

A migração deve ocorrer por domínio, não por arquivo aleatório.

Ordem recomendada:

1. Auth e profiles.
2. Favorites.
3. Ouvidoria.
4. Comunidade/fórum.
5. Comércio e avaliações.
6. Imóveis.
7. Serviços e agenda.
8. Saúde.
9. Storage/uploads.

Cada feature passa a depender de um repository/service interno; o adapter Firebase pode ser removido quando o adapter Supabase estiver validado.

## Banco e autorização

- IDs públicos: UUID.
- `created_at`/`updated_at` em todas as entidades persistentes.
- RLS ativa em todas as tabelas expostas.
- Roles/autorização não devem depender de `user_metadata` controlável pelo cliente.
- `service_role` nunca vai para o navegador.
- Uploads passam por buckets e policies explícitas.

## App Router

Usar Server Components por padrão. Client Components apenas quando houver interação real (state, browser APIs, hooks ou componentes Radix interativos).

Data fetching deve acontecer o mais próximo possível do servidor, reduzindo bundles de cliente.

Layouts compartilhados devem preservar navegação e estado visual durante troca de rotas.

## Qualidade

Antes de produção:

- `npm run typecheck`
- `npm run build`
- validação visual mobile/tablet/desktop
- smoke test das rotas críticas
- Supabase security advisors
- checagem de variáveis por ambiente

Build errors não devem ser ignorados permanentemente. O `ignoreBuildErrors` existente deve ser removido assim que os erros legados forem eliminados.

## Evolução sugerida

### Fase 1 — Fundação
Design system, App Shell, navegação e páginas-modelo.

### Fase 2 — Feature boundaries
Mover cada módulo para `src/features` e retirar Firestore das telas/actions.

### Fase 3 — Supabase
Schema, RLS, Auth, Storage, repositories e realtime.

### Fase 4 — Operação
Observabilidade, jobs na VPS quando necessários, cache, analytics, feature flags e testes.

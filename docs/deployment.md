# Deploy — Meu Bairro / BairroConecta

## Arquitetura

- **Vercel**: aplicação Next.js 15 (App Router), rotas HTTP e server actions de curta duração.
- **Supabase**: Postgres, Auth, Storage e Realtime. O projeto será ligado quando a conexão/slot estiver disponível.
- **Oracle VPS**: reservado para processos persistentes (workers, filas, consumidores, tarefas longas e integrações que precisem permanecer conectadas). O app web não deve ser duplicado na VPS.

## Variáveis necessárias na Vercel

```text
GOOGLE_GENAI_API_KEY
NEXT_PUBLIC_MAPBOX_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_DATABASE_URL
```

`NEXT_PUBLIC_*` pode chegar ao navegador. Nunca colocar service role/secret key do Supabase nessas variáveis.

## Health checks

- `/api/health`: valida que o runtime Next.js está online e informa apenas se as integrações estão configuradas, sem expor valores.
- `/api/supabase/health`: valida a conexão com o Supabase depois que as variáveis forem configuradas.

## Ordem de publicação

1. Validar build do branch `deploy/meu-bairro`.
2. Importar `toppaplicativos/bairroconecta` na Vercel como projeto `meu-bairro`.
3. Configurar Mapbox e Google AI já disponíveis para o projeto.
4. Quando o Supabase estiver disponível, criar/ligar o projeto e configurar URL, publishable key e database URL.
5. Aplicar schema, RLS, Storage e Auth.
6. Migrar os fluxos restantes que ainda usam Firebase.
7. Validar `/api/health` e `/api/supabase/health`.
8. Somente depois promover o deployment validado para produção.

## Oracle VPS

Nenhum processo atual do repositório exige execução 24/7. Por isso não há container ativo do Meu Bairro na VPS nesta etapa. Quando surgir um worker real, ele deve ser isolado por projeto, com diretório, container/rede, secrets e logs próprios.

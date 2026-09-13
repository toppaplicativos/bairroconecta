# Deploy — Meu Bairro / BairroConecta

## Arquitetura

- **Vercel**: aplicação Next.js 15 (App Router), Server Components, Route Handlers e Server Actions de curta duração.
- **Supabase**: Postgres, Auth, Storage e Realtime. O projeto será ligado quando a conexão/slot estiver disponível.
- **Oracle VPS**: processos persistentes (workers, filas, consumidores, tarefas longas e integrações que precisem permanecer conectadas). O app web não deve ser duplicado na VPS.

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

1. Validar o branch `deploy/meu-bairro`.
2. Criar preview Vercel do branch/refatoração.
3. Fazer QA visual em mobile, tablet e desktop.
4. Quando o Supabase estiver disponível, criar/ligar projeto dedicado.
5. Aplicar schema, RLS, Auth e Storage.
6. Conectar repositories das features ao Supabase e remover adapters Firebase remanescentes.
7. Configurar Mapbox e Google AI por ambiente.
8. Validar `/api/health` e `/api/supabase/health`.
9. Somente depois promover um preview validado para produção.

## Bloqueios externos observados em 13/09/2026

### GitHub Actions

O workflow `Predeploy check` está correto, mas os jobs não iniciam porque a conta GitHub está bloqueada por billing. A mensagem do runner é: `The job was not started because your account is locked due to a billing issue.` Portanto, as falhas atuais do workflow não são evidência de erro de build.

### Vercel API

A criação direta do novo preview atingiu o limite diário do plano: `api-deployments-free-per-day`, 100/100 deployments. O reset informado pela API ocorre em 14/09/2026 às 05:11 (America/Fortaleza). Não promover nem reutilizar o preview estático anterior como se ele representasse a nova aplicação.

## Oracle VPS

Nenhum processo atual do repositório exige execução 24/7. Por isso não há container ativo do Meu Bairro na VPS nesta etapa. Quando surgir um worker real, ele deve ser isolado por projeto, com diretório, container/rede, secrets, health-check e logs próprios.

## Critério de produção

Produção só deve receber o projeto quando:

- build/typecheck tiverem validação real;
- rotas críticas passarem smoke test;
- Firebase remanescente estiver isolado/migrado;
- RLS e policies forem revisadas;
- ambientes Vercel estiverem completos;
- preview visual estiver aprovado.

# Meu Bairro — 29 melhorias premium implementadas

Este checklist registra a evolução aplicada no branch `deploy/meu-bairro` após a fundação inicial do design system.

## Estados e componentes

1. **StatusBadge semântico** — estados neutral/info/success/warning/danger consistentes em light/dark.
2. **EmptyState reutilizável** — padrão único para listas e módulos sem conteúdo.
3. **ErrorState reutilizável** — erro contextual com ação de retry.
4. **IconButton nativo** — touch target, aria-label, badge e estados padronizados.
5. **Card variants premium** — default, interactive, elevated, inset, glass e flat.
6. **SectionHeading responsivo** — hierarquia page/section/compact e CTA consistente.

## Navegação e shell

7. **Command palette global** — busca/navegação rápida entre módulos.
8. **Atalho Cmd/Ctrl + K** — acesso por teclado à busca global.
9. **Persistência da sidebar** — estado expandido/recolhido salvo localmente.
10. **Skip-to-content** — navegação acessível direto ao conteúdo principal.
11. **Landmarks e aria-current** — semântica correta em main/nav/rotas ativas.
12. **Scrollbars premium discretas** — comportamento consistente nas áreas roláveis.
13. **Bottom navigation refinada** — indicador ativo e feedback de toque.
14. **Safe-area iOS** — suporte a notch/home indicator e viewport cover.

## Feedback e resiliência

15. **AppLoading skeleton** — skeleton editorial compartilhado.
16. **App Router loading boundary** — `loading.tsx` global.
17. **Route error boundary** — `error.tsx` com retry sem derrubar o app inteiro.
18. **Global error fallback** — fallback de último nível para falhas do root.
19. **404 branded** — not-found coerente com a identidade e navegação do produto.
20. **Reduced motion** — respeita `prefers-reduced-motion`.
21. **Focus-visible global** — foco de teclado claro e consistente.

## PWA e identidade de aplicativo

22. **Manifest PWA** — instalação standalone preparada.
23. **App icon SVG proprietário** — ícone escalável sem asset genérico.
24. **Viewport e theme-color adaptativos** — light/dark e `viewport-fit=cover`.
25. **Identidade/metadados centralizados** — nome, descrição, locale e cores em `config/product.ts`.

## Escala e observabilidade

26. **Feature flags centralizadas** — capacidades futuras sem condicionais espalhadas.
27. **Environment validation tipada** — Zod para integrações públicas/servidor.
28. **Analytics adapter** — boundary desacoplada de qualquer fornecedor de analytics.
29. **Health-check tipado** — readiness de Supabase, database, Mapbox e Google AI sem expor valores secretos.

## Regras permanentes

- Sem emojis como iconografia de interface.
- SVG/ícones vetoriais para ações e identidade.
- SVG proprietário quando o elemento tiver peso de marca.
- Light e dark obrigatórios para novos componentes.
- Componentes interativos devem ter hover, focus, pressed, disabled e touch target apropriados.
- Nenhuma tela nova cria tema próprio por domínio.
- Banco, auth e analytics entram por adapters/boundaries, não diretamente nos componentes visuais.

## Validação pendente externa

O GitHub Actions não executa o runner porque a conta está bloqueada por billing. A mensagem apresentada pelo GitHub é: `The job was not started because your account is locked due to a billing issue.`

O projeto Vercel `meu-bairro-preview` existe, mas ainda precisa ser ligado ao repositório/branch para executar o build real desta versão.

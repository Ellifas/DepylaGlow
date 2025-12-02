# Guia Técnico — Depyla Glow

## Stack
- Front-end estático com React 18 via CDN e Babel standalone (JSX no navegador).
- Estilos em `styles.css` (CSS puro, mobile-first).
- Roteamento hash simples (#/) sem dependência externa.

## Estrutura de pastas
- `index.html`: carrega fontes, CSS, React, Babel e `app.js`.
- `styles.css`: tokens de cor, tipografia, utilitários de grid e componentes.
- `app.js`: dados mockados, componentes React e roteador hash.
- `docs/PRODUCT_OVERVIEW.md`: visão de produto.
- `docs/TECH_GUIDE.md`: este guia técnico.

## Roteamento
- Implementado em `useHashRoute` (listener de `hashchange`).
- Navegação por `window.location.hash = '/autoajuda'` etc.
- Mapeamento de rotas no objeto `routes` em `App`.

## Dados estáticos
- `tips`, `products`, `faqs`, `values`, `timeline`, `docLinks`, `routineMap` ficam no topo de `app.js`.
- Para alterar textos, traduções ou produtos, edite esses arrays/objetos.

## Componentes principais
- `Nav` (brand + tabs), `Hero`, `AutoHelp` (formulário + rotina), `About`, `DocsPage`, `RoutineAdvisor`, `Layout` e `App`.
- Estão todos em `app.js` para simplicidade; podem ser divididos se adicionar bundler.

## Estilo
- Paleta coral/areia definida em `:root`. Tipografia Manrope + Playfair.
- Mobile-first: grids com `auto-fit` para produtos/cards; breakpoint único em 760px.
- Classes chave: `.hero`, `.panel`, `.card`, `.product`, `.cta-bar`, `.nav-link.active`.

## Como evoluir
- Migrar para React Router se quiser histórico real e rotas aninhadas.
- Externalizar dados para JSON e fazer fetch (ou CMS headless) se houver conteúdo dinâmico.
- Adicionar testes de snapshot/axe usando Playwright + axe-core para acessibilidade.
- Implementar modo offline com Service Worker se necessário.

## Testes manuais sugeridos
- Navegar por todas as rotas hash e validar atualização de título de seção.
- Formulário de autoajuda: alterar cada campo e checar rotina exibida.
- Responsividade: viewport 360px, 768px e 1200px; conferir grids e nav.
- Links de docs: abrir `docs/PRODUCT_OVERVIEW.md` e `docs/TECH_GUIDE.md` diretamente.

## Deploy simples
- Hospedar arquivos estáticos (Netlify/Vercel/Pages). Não há build; basta servir raiz.

# Depyla Glow (SPA mobile-first)

Aplicação single-page em React (CDN + Babel) para uma marca fictícia de depilação, com rotas hash (#/) para landing, autoajuda, página da marca e links de documentação. Design mobile-first inspirado em DepylAction com foco em pele e pós-cuidado.

## Como rodar
- Valide se tem o Node instalado em sua máquina
- `npm install`
- Execute o comando `npx http-server` para criação de um server local

## Estrutura
- `index.html`: carrega React CDN, Babel standalone e monta o app em `app.js`.
- `styles.css`: tema e layout mobile-first (cores, grids, componentes).
- `app.js`: componentes React, dados mockados, roteamento via hash e páginas.
- `docs/PRODUCT_OVERVIEW.md`: visão de produto, rotas e mensagens.
- `docs/TECH_GUIDE.md`: detalhes técnicos, arquitetura e manutenção.

## Rotas (hash)
- `#/` landing com hero e produtos.
- `#/autoajuda` consulta de pele e rotina sugerida.
- `#/marca` valores, linha do tempo e FAQ da marca.
- `#/documentacao` links rápidos para os docs markdown.

## Notas de UX
- Mobile-first; usa grid com auto-fit para produtos e cards.
- Paleta coral + areia; tipografia Manrope + Playfair.
- CTA primário: Começar avaliação / Agendar consulta.

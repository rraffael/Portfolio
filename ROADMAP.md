# ROADMAP — Portfólio Pixel Art · Raffael de Castro Rodrigues

Acompanhamento da implementação de um portfólio profissional de engenheiro de
software em **estilo pixel art**, com conteúdo *placeholder* baseado no perfil do
LinkedIn (a preencher com dados reais).
Marque cada item conforme for concluído: `[ ]` → `[x]`.

**Legenda de status das fases:** ⬜ Não iniciada · 🟡 Em andamento · ✅ Concluída

---

## Estado atual

**Concluído (todas as 8 fases):** design system pixel art (fontes `Press Start
2P`/`VT323`/`Inter`, paleta retro em `:root`, `image-rendering: pixelated`);
seções reescritas — Home (avatar SVG + CTA + scroll indicator), About + Skills,
Projects (grid de cards), Work (timeline), Contact (links reais mailto/
LinkedIn/GitHub, sem fetch de demo), Footer (ano dinâmico); i18n EN/PT
expandido e consistente (55 chaves idênticas nos dois locales); nova seção
Skills registrada em `PortfolioPage.jsx` (refs 0–6) com item de menu.

**Gate:** `npm run build` passa (Next.js 16, sem erros de TypeScript).

**Pendente:** substituir os textos *placeholder* em `locales/*.json` pelos
dados reais do LinkedIn (bio, projetos, experiências, links).

---

## Fase 1 — Design system pixel art ✅
Base visual que todas as seções vão herdar; precisa vir primeiro.

- [x] Importar fonte pixel (`Press Start 2P` para títulos, `VT323`/`Inter` para corpo) em `styles/globals.css` via `@import`/`<link>` no `_document` ou CSS
- [x] Definir paleta retro em `:root` (variáveis CSS: fundo, primária, acento, texto, bordas)
- [x] Criar utilitários pixel: `image-rendering: pixelated`, bordas sólidas grossas, sombras *hard* (box-shadow sem blur, offset fixo)
- [x] Estilizar header (`.site-header`, `.nav-link`, `.language-button`) no tema pixel
- [x] Ajustar `.section-*` e `.scroll-area` para o novo visual (cards com borda pixel)
- [x] Garantir contraste/legibilidade ("extremamente profissional") apesar do pixel

## Fase 2 — Conteúdo i18n (perfil placeholder) ✅
Centraliza todo o texto novo antes de tocar nos componentes.

- [x] Expandir `locales/en.json` e `locales/pt.json` com chaves para todas as seções (mesma estrutura nos dois)
- [x] `home`: headline, cargo, CTA, status ("disponível para projetos")
- [x] `about`: bio placeholder baseada no perfil de Raffael de Castro Rodrigues
- [x] `skills`: grupos (linguagens, frameworks, ferramentas, cloud)
- [x] `projects`: 3–4 cards (título, descrição, stack, links placeholder)
- [x] `work`: 2–3 experiências (empresa, cargo, período, descrição) — placeholder
- [x] `contact`: rótulos de e-mail, LinkedIn, GitHub
- [x] `footer`: copyright + ano dinâmico

## Fase 3 — Seção Home ✅
Primeira impressão; avatar pixel art + headline.

- [x] Avatar pixel art placeholder (SVG blocky ou `<img>` com `image-rendering: pixelated`) em `public/`
- [x] Reescrever `SectionHome.jsx`: avatar, nome, cargo, headline e botões de CTA (ver projetos / contato)
- [x] Indicador de "scroll down" no estilo pixel

## Fase 4 — Seção About + Skills ✅
Quem é, o que faz, e o stack técnico.

- [x] Reescrever `SectionAbout.jsx` com bio + destaques (anos de experiência, foco)
- [x] Criar `components/SectionSkills.jsx` com grid de skills agrupadas (badges pixel)
- [x] Registrar Skills no array `sections` e em `sectionRefs.current[N]` de `PortfolioPage.jsx` (manter ordem dos índices)
- [x] Adicionar item de menu "Skills" em `locales/*.json` (`menu.skills`)

## Fase 5 — Seção Projects ✅
Vitrine de projetos próprios com cards.

- [x] Reescrever `SectionProjects.jsx` com grid de cards (mapeando dados do i18n)
- [x] Cada card: thumb/ícone pixel, título, descrição, tags de stack, links (repo/demo placeholder)
- [x] Estilo hover/foco pixel (deslocamento da sombra)

## Fase 6 — Seção Work (experiência) ✅
Histórico profissional em timeline.

- [x] Reescrever `SectionWork.jsx` como timeline/lista de experiências (empresa, cargo, período, bullets)
- [x] Estilo pixel da timeline (marcadores blocky)

## Fase 7 — Seção Contact ✅
Substituir a demo de API por contato real.

- [x] Reescrever `SectionContact.jsx`: remover/condicionar o fetch de demo; manter o componente focado em links
- [x] Botões pixel para e-mail (`mailto:`), LinkedIn, GitHub
- [x] (Opcional) usar `process.env.NEXT_PUBLIC_API_URL` se mantiver o teste de API

## Fase 8 — Footer + polimento ✅
Acabamento e consistência.

- [x] Reescrever `Footer.jsx`: nome, ano dinâmico, mini-links sociais
- [x] Revisar responsividade (mobile/tablet) de todas as seções
- [x] Conferir scroll tracking após adicionar a seção Skills (índices dos refs)
- [x] `npm run build` como gate de correção (único gate do projeto)

---

## Ordem recomendada

Fase **1 → 2** são pré-requisitos de tudo (visual + textos). Depois, as seções
(**3, 4, 5, 6, 7**) podem ser feitas em qualquer ordem, mas **4 altera o array
de seções** em `PortfolioPage.jsx`, então faça-a antes de validar o scroll na
Fase 8. A **Fase 8** fecha com build + responsividade. Substituir os
placeholders pelos dados reais do LinkedIn pode ser feito a qualquer momento
editando apenas `locales/*.json`.

# ROADMAP — Portfólio Pixel Art · Raffael de Castro Rodrigues

Acompanhamento de um portfólio profissional de engenheiro de software em
**estilo pixel art**, construído com Next.js (Pages Router) + React 18 e
publicado como site estático no **GitHub Pages**.

**Legenda:** `[x]` concluído · `[ ]` pendente · ⬜ Não iniciada · 🟡 Em andamento · ✅ Concluída

---

## Estado atual

Portfólio **funcional e publicado**. O conteúdo já é **real** (bio, formação,
skills, projetos e experiências do Raffael) — não há mais placeholders.

- **Stack:** Next.js 16.2.9 (Turbopack), React 18.3.1, CSS global único.
- **Navegação:** *deck* horizontal — uma seção por "slide", com roda do mouse
  (uma seção por gesto, com lock de 700ms), setas do teclado (◄/►), botões de
  seta na tela e itens de menu. Não é scroll-snap vertical.
- **Seções (nesta ordem):** Home → About → Skills → Projects → Work → Contact,
  mais o Footer fixo.
- **i18n:** EN/PT via `lib/locales.js` + `locales/{en,pt}.json` (mesma estrutura
  de chaves, fallback para EN). Idioma em `useState`, **não** persistido.
- **Build/deploy:** `next build` com `output: 'export'` → pasta `out/`,
  publicada no GitHub Pages sob `/Portfolio` (`NEXT_PUBLIC_BASE_PATH`).

**Gate de correção:** `npm run build` passa (sem linter/testes no projeto).

---

## Fases concluídas ✅

### Fase 1 — Design system pixel art ✅
- [x] Fontes `Press Start 2P` (títulos), `VT323` (mono) e `Inter` (corpo) via `@import` em `globals.css`
- [x] Paleta retro "night" em `:root` (gold/mint/pink/blue, sombras *hard*, bordas grossas)
- [x] Utilitários pixel: `image-rendering: pixelated`, scanlines CRT sutis no `body`
- [x] Header, painéis (`.panel`), botões (`.pixel-btn`) e cards no tema pixel

### Fase 2 — Conteúdo i18n ✅
- [x] `locales/en.json` e `locales/pt.json` com estrutura idêntica para todas as seções
- [x] Conteúdo **real**: home, about (bio + formação + idiomas + stats), skills, projects, work, contact, footer

### Fase 3 — Home ✅
- [x] Avatar pixel (`public/avatar.svg`, resolve via `NEXT_PUBLIC_BASE_PATH`)
- [x] Greeting, nome, cargo, headline, status "disponível", CTAs (ver projetos / contato), dica de navegação

### Fase 4 — About + Skills ✅
- [x] `SectionAbout.jsx`: bio, stats (anos/projetos/idiomas), formação e idiomas a partir do i18n
- [x] `SectionSkills.jsx`: grupos de skills em badges pixel
- [x] Skills registrada em `PortfolioPage.jsx` (refs 0–5) e no menu (`menu.skills`)

### Fase 5 — Projects ✅
- [x] `SectionProjects.jsx`: grid de cards (nome, ano, descrição, stack, links code/demo condicionais)

### Fase 6 — Work ✅
- [x] `SectionWork.jsx`: timeline de experiências (cargo, empresa, período, local, descrição) com marcadores blocky

### Fase 7 — Contact ✅
- [x] `SectionContact.jsx`: links reais (mailto, LinkedIn, GitHub) + localização — demo de fetch `localhost:8000` removida

### Fase 8 — Footer + deploy ✅
- [x] `Footer.jsx`: nome + ano dinâmico + direitos
- [x] Responsividade revisada
- [x] Export estático (`output: 'export'`) + workflow de GitHub Pages

---

## Próximas features / melhorias 🚧

### Qualidade & correção
- [ ] **Resolver workflows de deploy duplicados** — `deploy.yml` e `nextjs.yml` disparam ambos no push para `master` no mesmo grupo de concorrência `pages` (ver "Problemas conhecidos" no README). Manter apenas um.
- [ ] Adicionar ESLint + Prettier (hoje o único gate é `npm run build`)
- [ ] Configurar TypeScript ou ao menos checagem de tipos básica
- [ ] Testes (componentes/i18n) — ex.: garantir que `en.json` e `pt.json` têm as mesmas chaves

### Funcionalidades
- [ ] **Persistir idioma** em `localStorage` (hoje um refresh volta para EN) e respeitar `navigator.language`
- [ ] SEO: `<Head>` com `title`, `meta description`, Open Graph / Twitter cards e favicon próprio
- [ ] Acessibilidade: foco visível no deck, `aria-current` no item de menu ativo, navegação por teclado nos cards, respeitar `prefers-reduced-motion`
- [ ] Formulário de contato funcional (ex.: Formspree/serviço estático) usando o `NEXT_PUBLIC_API_URL` já anunciado no `.env.example`
- [ ] Toggle de tema (dark/light) mantendo a estética pixel
- [ ] Thumbnails/ícones pixel reais para os cards de projeto
- [ ] Indicador de progresso do deck (dots/paginação) e deep-link por hash (`#projects`) sincronizado com o slide ativo
- [ ] Botão "baixar CV" (PDF)
- [ ] Adicionar um terceiro idioma (ex.: ES) para validar a camada de i18n

### Conteúdo
- [ ] Revisar/expandir descrições de projetos e adicionar novos trabalhos conforme surgirem
- [ ] Métricas/resultados concretos nas experiências (impacto, números)

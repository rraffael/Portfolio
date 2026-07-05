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
- **Tooling:** ESLint (flat config) + Prettier, TypeScript na camada de lógica
  (`lib/*.ts`) e teste de paridade i18n — scripts `lint`, `format`, `typecheck`, `test`.
- **Navegação:** _deck_ horizontal — uma seção por "slide", com roda do mouse
  (uma seção por gesto, com lock de 700ms), setas do teclado (◄/►), botões de
  seta na tela e itens de menu. Não é scroll-snap vertical.
- **Seções (nesta ordem):** Home → About → Skills → Projects → Work → Contact,
  mais o Footer fixo.
- **i18n:** EN/PT via `lib/locales.js` + `locales/{en,pt}.json` (mesma estrutura
  de chaves, fallback para EN). Idioma em `useState`, **persistido** em
  `localStorage` e com fallback para o idioma do navegador.
- **Home window:** o avatar é uma **janela pixel** que reflete o clima ao vivo do
  visitante — 14 SVGs (`public/window/<condição>[-night].svg`, 7 condições ×
  dia/noite) **animados via SMIL** (nuvens, chuva/neve, estrelas, relâmpago). A
  janela nasce **fechada por um estore** e ele **sobe** revelando a cena quando o
  clima carrega (opt-in).
- **Privacidade:** banner de **consentimento de cookies** (`CookieConsent.jsx` +
  `lib/consent.ts`) que **bloqueia as APIs de clima até o opt-in** do visitante.
- **Build/deploy:** `next build` com `output: 'export'` → pasta `out/`,
  publicada no GitHub Pages sob `/Portfolio` (`NEXT_PUBLIC_BASE_PATH`).

**Gates de correção:** `npm run build`, `npm run lint`, `npm run typecheck` e `npm test` passam.

---

## Fases concluídas ✅

### Fase 1 — Design system pixel art ✅

- [x] Fontes `Press Start 2P` (títulos), `VT323` (mono) e `Inter` (corpo) via `@import` em `globals.css`
- [x] Paleta retro "night" em `:root` (gold/mint/pink/blue, sombras _hard_, bordas grossas)
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

### Fase 9 — Clima local no Home ✅

- [x] `lib/weather.js`: busca o clima do visitante com **API pública primária + backup** (sem chave, CORS-friendly): `ipapi.co` (IP → lat/lon/cidade) + **Open-Meteo** como primária; **wttr.in** como backup (IP → cidade + clima em uma chamada), com fallback automático e timeout via `AbortController`
- [x] Normalização dos códigos das duas APIs (WMO e WWO) para **7 condições** com ícone: ☀️ `clear`, ⛅ `partly`, ☁️ `cloudy`, 🌫️ `fog`, 🌧️ `rain`, ❄️ `snow`, ⛈️ `storm`
- [x] `components/HomeWeatherBadge.jsx`: badge pequeno sobreposto ao avatar (ícone + temperatura), estado de carregando (⏳) e auto-ocultação se as duas APIs falharem
- [x] Estilo pixel do badge em `globals.css` (`.home-avatar-frame` / `.home-weather`) e chaves `home.weather.*` em `locales/{en,pt}.json`

### Fase 10 — Cenas de janela pixel: dia/noite + animação ✅

- [x] O avatar do Home vira uma **janela**: `SectionHome.jsx` mostra `public/window/<condição>.svg` conforme o clima real (fallback para `avatar.svg` enquanto carrega/sem consentimento)
- [x] **Variante dia/noite:** `lib/weather.ts` ganha o flag `isDay` (Open-Meteo `is_day`; wttr.in/fallback usam o relógio local — `isDaytimeLocal`, 06:00–17:59 = dia) e `iconFor(condition, isDay)` (🌙 para céu limpo à noite). Imagem escolhida: `` `${condition}${isDay ? '' : '-night'}.svg` ``
- [x] **14 SVGs pixel** feitos à mão (`public/window/`, 7 condições × dia/noite), mesmo esqueleto 96×64; noites escurecem o céu e trocam sol→lua + estrelas. Relâmpago da tempestade redesenhado (bolt limpo, sem halo de "luminosidade")
- [x] **Animação via SMIL inline** (`<animate>`/`<animateTransform>`), roda dentro de `<img>` sem JS: nuvens à deriva em passos de 1px, estrelas piscando, chuva/neve caindo, relâmpago piscando com flash de céu sincronizado. Movimento em **pixels inteiros** (`calcMode="discrete"`/valores inteiros) para manter `crispEdges`
- [x] **Mock picker dev-only** em `SectionHome.jsx` (removido no build de produção) força qualquer condição e alterna dia/noite

### Fase 11 — Consentimento de cookies (opt-in do clima) ✅

- [x] `lib/consent.ts`: `loadConsent()` / `saveConsent(weather)` persistem escolha **versionada** em `localStorage` (`portfolio-consent`). Duas categorias: **necessary** (sempre ativa — idioma + consentimento) e **weather** (opcional — APIs de terceiros `ipapi.co`/`open-meteo.com`/`wttr.in`)
- [x] `components/CookieConsent.jsx`: banner sutil (canto inferior) com Aceitar tudo / Rejeitar não essenciais / Personalizar (toggles por categoria + explicação de cada dado/API). Botão "Aceitar tudo" centralizado como CTA
- [x] `PortfolioPage.jsx` lê o consentimento no mount, exibe o banner na 1ª visita e passa `weatherConsent` ao `SectionHome`; `useWeather(enabled)` **não faz nenhuma chamada** de rede até o opt-in
- [x] Reabertura via botão "🍪 Cookies" no `Footer.jsx` (`onManageCookies`); textos em `cookies.*` (`locales/{en,pt}.json`) + estilos em `globals.css`

### Fase 12 — Estore de revelação (janela fechada → sobe) ✅

- [x] Estore exterior (persiana/"estore") **100% CSS/DOM** sobreposto ao `<img>` da janela (`.home-window-inner` / `.home-shutter` / `.home-shutter-slats` em `globals.css`), alinhado à região do vidro (96×64) para o caixilho e o parapeito ficarem visíveis por cima. Ripas pixel de bordas duras + barra de fecho com entalhes
- [x] **Fechado por padrão** — inclusive no HTML estático e **antes de aceitar os cookies** (acaba o flash do avatar de céu aberto na 1ª visita). `SectionHome` só marca `data-shutter="open"` quando há cena a mostrar: mock de dev, `status === 'error'` (revela o `avatar.svg`), ou `status === 'ready'` **e** a cena resolvida já pintou (`loadedSrc === windowSrc`, via `<img onLoad>`)
- [x] **Rola pra cima** (`translateY`) com transição de 0.9s só na abertura (fecho é instantâneo); respeita `prefers-reduced-motion` (abre sem animar)

### Fase 13 — Refresh de conteúdo + apoio/contato (jul/2026) ✅

- [x] **Conteúdo** (`locales/{en,pt}.json`): nome "Raffael de Castro Rodrigues", cargo **Lead Software Engineer / Engenheiro de Software líder**, headline reescrita (apps no ciclo completo + fluxos de trabalho + criar/gerir/orientar equipes), status "projetos curtos", brand do topo só "Raffael"
- [x] **About**: bio focada na Kito Health (dev lead), formação **só a graduação na Unit** (mestrado FEUP trancado removido), inglês **C1**
- [x] **Skills** enxugadas para a stack da Kito (JavaScript, React, HTML5, CSS, Node.js, Express, REST APIs, Git, AWS, MongoDB, Scrum/Kanban) + novo grupo **AI & LLMs** (ChatGPT, Claude, GitHub Copilot) com nota asteriscada por grupo (`group.note`, renderizada dentro do card)
- [x] **Experiência** reconstruída a partir do LinkedIn (Kito Health 2021→atual, com progressão a líder; Humanize IT 2020–2021; Protech estágio 2019; Universo de Estudos 2015–2017)
- [x] **Footer "Buy me a drink 🍹"**: popover com link **Wise** + **chave Pix aleatória** (copiar em 1 clique, sem expor dados pessoais); constantes em `Footer.jsx`, textos em `support.*`. Estilo dourado discreto (peso de texto, abaixo dos CTAs), ancorado no canto esquerdo
- [x] **Fallback de e-mail no Contact**: clicar em "Envie-me um e-mail" copia o endereço para a área de transferência (o `mailto:` continua abrindo para quem tem cliente de e-mail configurado)

---

## Próximas features / melhorias 🚧

### Qualidade & correção

- [x] **Resolver workflows de deploy duplicados** — removido `.github/workflows/nextjs.yml` (template padrão do Next.js). Mantido apenas `deploy.yml`, que define `NEXT_PUBLIC_BASE_PATH=/Portfolio` explicitamente. Acaba a corrida no grupo de concorrência `pages`.
- [x] **ESLint + Prettier** — flat config (`eslint.config.mjs`) com `eslint-config-next` (core-web-vitals) + `.prettierrc.json`/`.prettierignore`. Scripts `lint`, `format`, `format:check`. Regra `@next/next/no-img-element` desligada (export estático usa `<img>` de propósito).
- [x] **Checagem de tipos** — TypeScript adicionado com `tsconfig.json` e script `typecheck` (`tsc --noEmit`). Camada de lógica convertida para TS (`lib/locales.ts`, `lib/weather.ts`); componentes seguem em `.jsx` (`checkJs` desligado).
- [x] **Testes de paridade i18n** — `scripts/check-locales.mjs` (Node puro, sem dependências) garante que cada `locales/*.json` tem a mesma árvore de chaves do `en.json` (chaves, tipos e tamanhos de array). Script `npm test`.

### Funcionalidades

- [x] **Persistir idioma** — escolha salva em `localStorage` (`portfolio-locale`) e restaurada após o mount; sem preferência salva, usa `navigator.languages` (`resolvePreferredLocale` em `lib/locales.js`), caindo para EN. Inicializa com EN para casar com o HTML estático e evitar mismatch de hidratação.
- [x] **SEO** — `next/head` em `pages/_app.jsx` com `title`, `meta description`, autor, `theme-color`, canonical, Open Graph e Twitter cards (cobre também o 404). Favicon pixel próprio (`public/favicon.svg`). Pendência menor: imagem OG ainda aponta para `avatar.svg` (SVG); idealmente um PNG/JPG para melhor suporte de scrapers sociais.
- [ ] Acessibilidade: foco visível no deck, `aria-current` no item de menu ativo, navegação por teclado nos cards, e **respeitar `prefers-reduced-motion`** — agora mais relevante por causa das cenas de janela animadas (SMIL). Ideia: pausar/reduzir as animações dos SVGs quando o usuário pedir menos movimento
- [ ] Formulário de contato funcional (ex.: Formspree/serviço estático) usando o `NEXT_PUBLIC_API_URL` já anunciado no `.env.example`
- [ ] Toggle de tema (dark/light) mantendo a estética pixel
- [ ] Thumbnails/ícones pixel reais para os cards de projeto
- [ ] Indicador de progresso do deck (dots/paginação) e deep-link por hash (`#projects`) sincronizado com o slide ativo
- [ ] Botão "baixar CV" (PDF)
- [ ] Adicionar um terceiro idioma (ex.: ES) para validar a camada de i18n

### Conteúdo — 🟡 em evolução

> A janela inicial (estore + cenas de clima) está **finalizada** e o **refresh de
> conteúdo** já foi feito (ver Fase 13). Restam melhorias pontuais.

- [x] Revisar/atualizar informações pessoais (home, about, skills, contato) nos `locales/{en,pt}.json`
- [ ] Revisar/expandir descrições de projetos e adicionar novos trabalhos conforme surgirem
- [ ] Métricas/resultados concretos nas experiências (impacto, números)

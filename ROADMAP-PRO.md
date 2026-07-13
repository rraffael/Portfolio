# ROADMAP — Portfólio Profissional (v2) + "Enter the Pixelworld"

Acompanhamento da construção de uma **versão profissional/não-pixel** do
portfólio que reusa a estrutura e o conteúdo do site atual, com uma pegada
moderna e sóbria (inspirada em `yilmazgokhan.github.io`). A versão pixel art
atual passa a ser um "mundo" secundário, acessível por um botão de menu
**"Enter the pixelworld"**.

> Este roadmap **não substitui** o `ROADMAP.md` (que é o do pixel art). Ele é o
> plano da v2. Marque cada item conforme concluir: `[ ]` → `[x]`.

**Legenda de status das fases:** ⬜ Não iniciada · 🟡 Em andamento · ✅ Concluída

---

## Visão / decisão de arquitetura

- **Rota padrão `/` = versão profissional** (nova). É o que o visitante vê primeiro.
- **Rota `/pixel` = versão pixel art** (o `PortfolioPage.jsx` atual, praticamente intacto).
- Menu da versão pro tem **"Enter the pixelworld"** → navega para `/pixel`.
  A versão pixel ganha um **"Exit to professional"** (ou "◄ Sair do pixelworld") de volta para `/`.
- **Fonte única de conteúdo:** as duas versões leem os mesmos `locales/{en,pt}.json`
  (bio, skills, projects, work, contact). A v2 só **adiciona** chaves novas
  (hero pro, certifications, labels de troca de mundo) — paridade EN/PT mantida (`npm test`).
- **Idioma e consentimento são compartilhados** entre as rotas (mesmo `localStorage`),
  então trocar de mundo preserva a escolha do visitante.
- **O window/clima animado continua exclusivo do pixelworld** — é um dos motivos
  de "entrar" nele. O hero pro usa uma foto/retrato profissional normal.

### O que o site de referência mostra (para inspirar a v2)

Single-page, minimalismo profissional, scroll vertical com âncoras. Seções:
**Hero ("Hello, World")** → About → Resume/Experiência → Portfolio → Open Source →
Articles → **Certifications (PSM I em destaque)** → Contact → Footer com "back to top"
e timestamp. Ícones sociais no header e no footer, e-mail com copy-to-clipboard.
→ Confirma dois pontos: (1) **scroll vertical âncora** é a navegação profissional
natural (vs. o deck horizontal do pixel), e (2) **Certifications é seção de
primeira classe** — é lá que a certificação Scrum Master vai entrar.

---

## Estado atual (base de partida)

**Funcional (só pixel, rota única):** Next.js 16 Pages Router, `output: 'export'`
→ GitHub Pages sob `/Portfolio`. `_app.jsx` importa **um** `globals.css` global
(tema pixel: fontes `Press Start 2P`/`VT323`, scanlines CRT, sombras hard).
`pages/index.jsx` detém o estado de `locale` e o passa ao `PortfolioPage.jsx`
(deck horizontal). i18n em `lib/locales.ts`, consentimento em `lib/consent.ts`,
clima em `lib/weather.ts` + `useWeather`.

**Faltando para a v2:** roteamento de duas versões, isolamento de CSS por "mundo",
um design system profissional, componentes de seção não-pixel, seção de
Certifications, e o cross-linking entre os dois mundos.

---

## Antes de começar — pendências do pixel que vale fechar primeiro

Do `ROADMAP.md` atual, a maioria dos pendentes é opcional/independente. Só
**dois** valem a pena fechar antes (ou junto), porque viram **infra compartilhada**:

- [ ] **Acessibilidade base + `prefers-reduced-motion`** (item já pendente no pixel):
      foco visível, `aria-current` no item de menu ativo, navegação por teclado nos
      cards, e reduzir/pausar animações sob `prefers-reduced-motion`. A v2 vai
      querer exatamente as mesmas primitivas — fazer uma vez, usar nos dois mundos.
- [ ] **Imagem OG em PNG/JPG** (hoje aponta para `avatar.svg`): a v2 precisa de
      cards sociais decentes de qualquer jeito; resolver junto.

O resto do `ROADMAP.md` (toggle de tema, dots do deck, thumbnails de projeto,
3º idioma, métricas de experiência, form de contato, botão "baixar CV") **não
bloqueia** a v2 — pode seguir em paralelo ou depois. Exceção útil: o **"baixar CV"
(PDF)** casa bem com a seção Resume/Certifications da v2; considere puxar para cá.

---

## Fase 1 — Fundação compartilhada (refactor pré-requisito) ⬜

Sem isto, as duas versões brigam por CSS global e duplicam a lógica de idioma.

- [ ] **Extrair a lógica de idioma** de `pages/index.jsx` para um hook reusável
      `lib/useLocale.ts` (ou `components/useLocale.js`): `readClientLocale`,
      `localStorage('portfolio-locale')` e `onLocaleChange`. As duas rotas passam
      a consumir o mesmo hook, garantindo idioma preservado ao trocar de mundo.
- [ ] **Criar as rotas:** `pages/pixel.jsx` renderiza o `PortfolioPage` atual;
      `pages/index.jsx` passa a renderizar a nova `ProfessionalPage`. Confirmar que
      `output: 'export'` gera `/pixel/index.html` (trailing slash já ligado).
- [ ] **Isolar o CSS por mundo.** Como Next só permite CSS global no `_app`,
      importar em `_app.jsx`: `styles/base.css` (reset/variáveis comuns) +
      `styles/pixel.css` (regras atuais, **prefixadas/escopadas** sob
      `[data-world="pixel"]`) + `styles/pro.css` (novo, sob `[data-world="pro"]`).
      Cada página seta `data-world` no wrapper raiz. Meta: entrar em `/pixel` não
      vaza scanlines/fontes pixel para `/` e vice-versa.
- [ ] **Mover os assets pixel-only** (window SVGs, avatar pixel) mantendo os paths
      via `NEXT_PUBLIC_BASE_PATH`; nada quebra no pixelworld.

## Fase 2 — Design system profissional ⬜

A identidade visual da v2, sem nenhum traço pixel.

- [ ] **Tipografia:** manter `Inter` (corpo) e escolher uma display/heading sóbria
      (ex.: Inter tight/`Space Grotesk`/serif leve). **Sem** `Press Start 2P`/`VT323`.
- [ ] **Paleta** em `styles/pro.css` (`:root[data-world="pro"]`): neutra e moderna,
      com suporte a **dark/light** (`prefers-color-scheme` + toggle opcional). Sem
      sombras hard nem scanlines.
- [ ] **Primitivos:** botões, cards, "chips" de skill, painéis, escala de espaçamento,
      raios de borda suaves, transições discretas. Documentar como utilitários/classes.
- [ ] **Ícones sociais** (LinkedIn, GitHub, e-mail, e o que houver) em SVG inline nítido.

## Fase 3 — Layout e navegação profissional ⬜

Scroll vertical âncora — o oposto do deck horizontal do pixel.

- [ ] `components/ProfessionalPage.jsx`: header **sticky** + `main` com scroll
      vertical suave; seções empilhadas com `id` para deep-link por hash (`#projects`).
- [ ] **Nav com seção ativa** via `IntersectionObserver` (destaca o item corrente,
      `aria-current`), scroll suave ao clicar, e menu mobile (hambúrguer) reusando
      o padrão atual mas com estilo pro.
- [ ] **Language switcher** reusado (mesmo componente/estado do hook da Fase 1).
- [ ] **Botão "Enter the pixelworld"** no header (desktop) e no menu mobile →
      `next/link` para `/pixel`. Copy nas chaves i18n (`world.enterPixel`).
- [ ] **"Back to top"** no footer (como na referência).

## Fase 4 — Hero profissional ⬜

- [ ] Adicionar **foto/retrato profissional** em `public/` (resolve via base path).
- [ ] `SectionHeroPro.jsx`: saudação, nome (**Raffael de Castro Rodrigues**),
      cargo (**Lead Software Engineer**), headline, status "disponível para projetos
      curtos", CTAs (ver projetos / contato / **baixar CV**) e linha de ícones sociais.
- [ ] Reusar as chaves `home.*` existentes; adicionar só o que a versão pro pedir
      de novo (mantendo paridade EN/PT).

## Fase 5 — Seções de conteúdo (reusando o i18n) ⬜

Componentes novos, com o **mesmo conteúdo** dos locales — só o visual muda.

- [ ] `SectionAboutPro.jsx` — bio + stats + formação + idiomas (chaves `about.*`).
- [ ] `SectionSkillsPro.jsx` — grupos de skills como chips modernos (chaves `skills.*`,
      incluindo o grupo AI & LLMs com a `note`).
- [ ] `SectionProjectsPro.jsx` — cards de projeto (nome/ano/descrição/stack/links),
      layout em grid limpo (chaves `projects.*`).
- [ ] `SectionExperiencePro.jsx` — timeline profissional (chaves `work.*`).
- [ ] **Lembrete de conteúdo:** detalhar os **últimos 6 anos de trabalho** (2020→2026)
      ano a ano — hoje aparece só como "2020+"; especificar cada período/cargo/entrega
      em vez de um bloco genérico.
- [ ] _(Opcional, como na referência)_ seção **Open Source / Articles**:
      reservar **dois espaços** para **lançamentos/postagens importantes de projetos
      públicos** lançados nesse período (título, data, link do release/post). Deixar
      os dois slots preparados mesmo que o conteúdo entre depois.

## Fase 6 — Certifications (nova seção) ⬜

Seção nova de primeira classe — é aqui que a **certificação Scrum Master** entra
(próxima tarefa). Ver a referência (PSM I) como modelo.

- [ ] Novas chaves `certifications.*` em `locales/{en,pt}.json` (paridade mantida):
      título da seção + array de itens (nome, emissor, ano, id/credential, link).
- [ ] `SectionCertificationsPro.jsx`: cards com selo/logo, nome da certificação,
      emissor, data e ação (ver credencial / verificar / baixar).
- [ ] **Decidir a hospedagem do documento** (a definir na próxima tarefa):
      link de verificação oficial vs. PDF em `public/` vs. imagem do certificado.
      Deixar o card preparado para qualquer uma das opções.

## Fase 7 — Contact + Footer profissionais ⬜

- [ ] `SectionContactPro.jsx` — reusa `contact.*` (mailto + copy-to-clipboard já
      existente na lógica, LinkedIn, GitHub, localização), com visual pro.
- [ ] `FooterPro.jsx` — nome + ano dinâmico + direitos, **ícones sociais**,
      "back to top", botão **"🍪 Cookies"** (reabrir consentimento) e, se fizer
      sentido, o "Buy me a drink 🍹" reusado.

## Fase 8 — Ligação entre os dois mundos ⬜

- [ ] **"Enter the pixelworld"** (pro → `/pixel`) e **"Exit to professional"**
      (pixel → `/`) — adicionar o link de volta no `PortfolioPage.jsx`/header pixel.
- [ ] Garantir que **idioma e consentimento persistem** na troca (já resolvido pela
      Fase 1 + `lib/consent.ts`); testar indo e voltando.
- [ ] _(Opcional)_ transição/animação leve ao trocar de mundo (respeitando
      `prefers-reduced-motion`).

## Fase 9 — SEO, acessibilidade, build e deploy ⬜

- [ ] **Meta por rota:** mover os defaults de `_app.jsx` para permitir `<Head>`
      específico em `/` e `/pixel` (títulos/descrições distintas). OG image PNG.
- [ ] **Acessibilidade:** foco visível, `aria-current`, navegação por teclado,
      contraste AA no tema pro, `prefers-reduced-motion` respeitado.
- [ ] **Gates:** `npm run build` (confirmar que exporta `/` **e** `/pixel/`),
      `npm run lint`, `npm run typecheck`, `npm test` (paridade i18n) — todos verdes.
- [ ] **Deploy:** GitHub Pages sob `/Portfolio` continua; confirmar que a home agora
      é a versão pro e `/Portfolio/pixel/` serve o pixelworld. Atualizar canonical/OG.
- [ ] _(Opcional)_ Lighthouse/pass de performance no tema pro.

---

## Ordem recomendada

1. **Fase 1** é pré-requisito duro de tudo (rotas + CSS escopado + hook de idioma).
2. **Fase 2** logo em seguida — o design system destrava todas as seções.
3. **Fases 3–7** podem andar em paralelo depois da 2 (cada seção é independente);
   Fase 3 (layout/nav) primeiro para ter o esqueleto onde encaixar as seções.
4. **Fase 6 (Certifications)** pode ser feita a qualquer momento após a 3 — é a
   ponte natural para a próxima tarefa (Scrum Master).
5. **Fase 8** depois que ambos os mundos existem.
6. **Fase 9** por último (polish, SEO, a11y, deploy).

As **pendências do pixel** (acessibilidade + OG PNG) podem ser fechadas junto da
Fase 1/Fase 9, já que viram infra compartilhada.

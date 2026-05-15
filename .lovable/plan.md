## Visão geral

Construir o site pessoal da **carolzyn** seguindo a direção "Anime slice-of-life editorial": paleta café/creme/sálvia/laranja queimado, tipografia DM Serif Display + Sora, atmosfera calma, gatinho como mascote, comunidade dos "filhotes" como conceito central. Quatro páginas conectadas por uma navbar persistente, com dark/light mode e animações suaves (vapor, folhas, hover).

## Estrutura de rotas (TanStack Start)

```text
src/routes/
  __root.tsx          → shell + ThemeProvider + Navbar + Footer + <Outlet/>
  index.tsx           → / Home
  filhotes.tsx        → /filhotes
  devocional.tsx      → /devocional
  cafe.tsx            → /cafe
```

Cada rota com `head()` próprio (title, description, og:title, og:description).

## Design tokens (src/styles.css)

Substituir paleta atual por tokens cozy em oklch, com versões light e dark:

- `--background` (cream) / `--foreground` (coffee)
- `--card`, `--muted`, `--border`
- `--primary` = warm-orange (#e68a49 → oklch)
- `--accent` = sage (#94a38e → oklch)
- `--coffee`, `--cream`, `--beige` como tokens semânticos extras
- Fontes: DM Serif Display (display) + Sora (body), via `@import` Google Fonts no topo de styles.css
- Keyframes: `leaf-drift`, `vapor`, `fade-in-up`

Dark mode: fundo coffee profundo, texto cream, mesmos accents (sálvia/laranja levemente desaturados).

## Componentes compartilhados

```text
src/components/
  layout/
    Navbar.tsx        → logo gatinho, links, ícones sociais (Twitch, Discord, Instagram), botão "Entrar na Live", toggle tema
    Footer.tsx        → assinatura cozy + sociais
  ui-cozy/
    SectionCard.tsx   → card navegável reutilizado na home
    SteamParticles.tsx → vapor animado (SVG/divs)
    FloatingLeaves.tsx → folhas em loop drift
    ThemeToggle.tsx   → light/dark via classe no <html>
  hooks/
    use-theme.ts      → persistência em localStorage
```

## Páginas

**Home (`/`)**

- Hero split (texto + ilustração de gatinho com café e folhas)
- Frase: "Pegue sua bebida favorita e fique à vontade, filhote ☕"
- Badge "Ao vivo agora" pulsante
- CTAs: Twitch (warm-orange) + Discord (outline)
- Vapor animado sobre a ilustração, folhas drift nas bordas
- 3 SectionCards: Filhotes / Devocional / Café (linkados às rotas)
- Preview combinado: Devocional (versículo) + Especialidades do Café

**Filhotes (`/filhotes`)**

- Hero acolhedor sobre a comunidade
- Mural com ~6 cards de mensagens mockadas (avatar, nome, comentário) em layout masonry leve
- CTAs grandes Discord + Twitch
- Patinhas/doodles decorativos espalhados

**Devocional (`/devocional`)**

- Atmosfera quarto cozy (ilustração de fundo suave)
- Card grande "Versículo do Dia" centralizado
- Reflexão curta mockada
- Convite para devocional matinal na live
- Tom calmo, nada institucional

**Café (`/cafe`)**

- História breve da cafeteria da família
- Galeria de fotos (placeholders)
- Cardápio: 4-6 cards de bebidas/comidas com preço
- CTA chamativo para Instagram da cafeteria

## Animações (Framer Motion)

- `fade-in-up` em entrada de seções via `whileInView`
- Hover lift (-translate-y-2) nos cards
- Vapor e folhas em CSS keyframes (performance)
- Transições de página suaves (opcional, via AnimatePresence no Outlet)

## Imagens

Gerar com `imagegen` (modelo `fast`, salvas em `src/assets/`):

1. Gatinho cozy com xícara fumegante (hero home) — 1200x1400
2. Mural/quarto da comunidade (filhotes hero) — 1200x800
3. Quarto cozy com luz quente (devocional fundo) — 1200x800
4. Interior da cafeteria (café hero) — 1200x800
5. 4 fotos de bebidas/comidas (latte, matcha, bolo, pão) — 600x600 cada

## Detalhes técnicos

- Stack: TanStack Start já configurado, Tailwind v4, shadcn disponível
- Adicionar `framer-motion` via `bun add`
- Sem backend / sem auth — site puramente visual
- Responsivo mobile-first; navbar vira menu hamburguer em < md
- Acessibilidade: alt em todas imagens, focus rings, contraste AA em ambos temas
- SEO: head() em cada rota, h1 único por página, lang="pt-BR" no shell

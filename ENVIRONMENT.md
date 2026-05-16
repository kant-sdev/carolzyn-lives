## Variáveis de ambiente (Twitch)

Adicione as seguintes variáveis no ambiente (local e no provedor de deploy):

- `TWITCH_CLIENT_ID` — client id da sua app Twitch
- `TWITCH_CLIENT_SECRET` — client secret da sua app Twitch (NUNCA expor no frontend)
- `TWITCH_ACCESS_TOKEN` — app access token (opcional; pode ser obtido via client_credentials no servidor)
- `TWITCH_USERNAME` — `carolzyn`

Recomendações:
- No desenvolvimento local copie `.env.example` → `.env.local` e preencha os valores.
- `.env.local` é gitignored pelo padrão (`*.local` no `.gitignore`).
- No Netlify / Vercel: defina as mesmas chaves no painel de Environment Variables do site/serviço.
- No código, leia as variáveis no servidor (ex.: `process.env.TWITCH_CLIENT_ID`) e nunca passe `TWITCH_CLIENT_SECRET` ao cliente.
- Para expor apenas dados públicos (status da live, título, viewers), crie funções server-side que consultem a Twitch Helix com o token do app e retornem somente os dados públicos necessários.

Netlify quick steps:
1. Site → Site settings → Build & deploy → Environment → Add variable
2. Adicione `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET` e `TWITCH_USERNAME`.
3. Se preferir, adicione `TWITCH_ACCESS_TOKEN`, mas recomendável obter dinamicamente no servidor.

Vercel quick steps:
1. Project → Settings → Environment Variables → Add
2. Adicione as mesmas chaves para `Production` / `Preview` / `Development` conforme necessário.

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import heroCat from "@/assets/hero-cat.jpg";
import { FloatingLeaves } from "@/components/cozy/FloatingLeaves";
import { SteamParticles } from "@/components/cozy/SteamParticles";
import { PawIcon } from "@/components/cozy/PawIcon";
import { StreamStatusBadge } from "@/components/twitch/StreamStatusBadge";
import { useStreamStatus } from "@/hooks/use-twitch";
import { useDailyVerse } from "@/hooks/use-daily-verse";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "carolzyn — Um cantinho cozy para os filhotes" },
      {
        name: "description",
        content:
          "O cantinho cozy da carolzyn: lives, devocional e comunidade dos filhotes.",
      },
      { property: "og:title", content: "carolzyn — um cantinho cozy" },
      {
        property: "og:description",
        content: "Venha descansar e ficar à vontade, filhote.",
      },
    ],
  }),
  component: HomePage,
});

function TwitchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

const TWITCH_URL = "https://twitch.tv/carolzyn";

function TwitchLiveNavCard({ delay }: { delay: number }) {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading, error, isLive } = useStreamStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOnline = mounted && !isLoading && !error && isLive;
  const title = isOnline
    ? data?.title || "Live cozy com os filhotes"
    : "Próxima live em breve";

  const description = isOnline
    ? data?.viewer_count && data.viewer_count > 0
      ? data?.game_name
        ? `${new Intl.NumberFormat("pt-BR").format(data.viewer_count)} filhotes assistindo ${data.game_name}`
        : `${new Intl.NumberFormat("pt-BR").format(data.viewer_count)} filhotes assistindo agora`
      : data?.game_name
      ? `Assistindo ${data.game_name}`
      : "Live cozy com os filhotes"
    : error
    ? "O ninho está quentinho, mas não conseguimos carregar o status. Ainda assim, siga a Twitch para não perder a próxima conversa."
    : "O ninho continua quentinho enquanto esperamos a próxima conversa.";

  const badgeText = isOnline ? "🔴 Ao vivo agora" : "🌙 Offline no momento";
  const buttonLabel = isOnline ? "Entrar na live" : "Seguir na Twitch";
  const buttonClasses = isOnline
    ? "inline-flex items-center gap-2 rounded-full bg-warm-orange px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_rgba(251,146,60,0.18)] hover:shadow-[0_0_40px_rgba(251,146,60,0.25)] transition-all"
    : "inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all";

  if (!mounted || isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: delay }}
        className="rounded-[32px] border border-border bg-card/90 p-8 shadow-sm shadow-coffee/5"
      >
        <div className="h-7 w-32 rounded-full bg-muted/70 mb-6 animate-pulse" />
        <div className="h-10 w-full rounded-[28px] bg-muted/70 mb-5 animate-pulse" />
        <div className="space-y-3 mb-8">
          <div className="h-4 w-full rounded-full bg-muted/70 animate-pulse" />
          <div className="h-4 w-3/4 rounded-full bg-muted/70 animate-pulse" />
        </div>
        <div className="h-10 w-40 rounded-full bg-muted/70 animate-pulse" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: delay }}
      className={`group rounded-[32px] border border-border p-8 shadow-sm shadow-coffee/5 transition-all ${
        isOnline ? "bg-warm-orange/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-warm-orange/20" : "bg-card/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-coffee/15"
      }`}
    >
      <div className="flex items-center justify-between mb-6 gap-4">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.24em] font-semibold ${
            isOnline ? "bg-warm-orange/15 text-warm-orange border border-warm-orange/20" : "bg-sage/15 text-sage border border-sage/20"
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className={`absolute inset-0 rounded-full ${isOnline ? "bg-warm-orange opacity-40" : "bg-sage opacity-40"} animate-pulse`} />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isOnline ? "bg-warm-orange" : "bg-sage"}`} />
          </span>
          {badgeText}
        </div>
        <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Twitch
        </span>
      </div>

      <h3 className="font-serif text-3xl mb-4 text-foreground leading-tight">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8">{description}</p>

      <a
        href={TWITCH_URL}
        target="_blank"
        rel="noreferrer"
        className={buttonClasses}
      >
        {buttonLabel}
        {isOnline ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-warm-orange opacity-40 animate-pulse" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-warm-orange" />
          </span>
        ) : null}
      </a>
    </motion.div>
  );
}

const navCards = [
  {
    to: "/filhotes" as const,
    icon: Users,
    title: "Filhotes",
    desc: "Mural acolhedor cheio de histórias, fotos e encontros reais da nossa comunidade.",
    cta: "Ir para o mural",
    badge: "Comunidade ativa",
    tint: "bg-sage/15 text-sage",
  },
  {
    to: "/devocional" as const,
    icon: BookOpen,
    title: "Devocional",
    desc: "Reflexões diárias, versículos e aquela pausa suave para o seu coração.",
    cta: "Ver devocional",
    badge: "Versículo diário",
    tint: "bg-warm-orange/15 text-warm-orange",
  },
  {
    href: "https://twitch.tv/carolzyn",
    icon: TwitchIcon,
    title: "Live",
    desc: "Conversas reais, gameplay cozy e momentos ao vivo com os filhotes.",
    cta: "Entrar na live",
    badge: "Ao vivo agora",
    tint: "bg-warm-orange/15 text-warm-orange",
  },
] as const;

const liveFeatures = [
  {
    title: "Conversa tranquila",
    desc: "Papo aberto, acolhimento e simplicidade em cada momento.",
  },
  {
    title: "Gameplay cozy",
    desc: "Jogos leves, risadas e presença sem pressa.",
  },
  {
    title: "Devocional junto",
    desc: "Versículos e reflexões com ternura e calor humano.",
  },
  {
    title: "Comunidade acolhedora",
    desc: "Filhotes que se conectam, se apoiam e celebram juntos.",
  },
] as const;

function HomePage() {
  const { verse, loading, error } = useDailyVerse();

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-20 overflow-hidden">
        <FloatingLeaves />
        <div className="relative max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="z-10"
          >
            <StreamStatusBadge />
            <h1 className="font-serif text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-6 text-foreground">
              Um espaço acolhedor para se desligar, compartilhar e sentir que está em casa.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Aqui não temos pressa. Temos conversa verdadeira, apoio entre filhotes e um clima que
              abraça quem chega.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://twitch.tv/carolzyn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-warm-orange px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-lg hover:shadow-warm-orange/20 transition-all"
              >
                <TwitchIcon className="size-4" /> Ver na Twitch
              </a>
              <a
                href="https://discord.gg/7g9wqcKhb"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                Entrar no Discord
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-10 -right-8 size-56 bg-warm-orange/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-10 size-64 bg-sage/15 rounded-full blur-3xl" />
            <div className="relative rounded-[36px] overflow-hidden ring-1 ring-border shadow-2xl shadow-coffee/15">
              <img
                src={heroCat}
                alt="Gatinhos cozy descansando juntos"
                width={1024}
                height={1280}
                className="w-full h-auto"
              />
              <SteamParticles className="bottom-[34%] left-[42%]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="py-16 px-6 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 text-center mb-10">
            <span className="text-xs uppercase tracking-[0.22em] text-warm-orange font-semibold">
              Onde quer chegar
            </span>
            <h2 className="font-serif text-4xl">Escolha o cantinho do dia.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {navCards.map((card, index) => {
              if ("href" in card && card.href === TWITCH_URL) {
                return <TwitchLiveNavCard key="twitch-live-card" delay={index * 0.07} />;
              }

              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group rounded-[32px] border border-border bg-card/90 p-8 shadow-sm shadow-coffee/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-coffee/15 transition-all"
                >
                  <div className="flex items-center justify-between mb-6 gap-4">
                    <div className={`size-14 rounded-3xl flex items-center justify-center ${card.tint}`}>
                      <Icon className="size-7" />
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl mb-4">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">{card.desc}</p>
                  {"to" in card ? (
                    <Link
                      to={card.to}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-warm-orange"
                    >
                      {card.cta} <ArrowRight className="size-3" />
                    </Link>
                  ) : (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-warm-orange"
                    >
                      {card.cta} <ArrowRight className="size-3" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live experience + devotional */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid gap-10 xl:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-[40px] border border-border bg-sage/10 p-10 shadow-2xl shadow-sage/5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-6">
              <PawIcon size={14} /> como é uma live
            </div>
            <h2 className="font-serif text-4xl mb-5">A sensação é de estar entre amigos.</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
              Lives com papo leve, gameplay cozy e um canto onde todo filhote é bem-vindo.
              Aqui tem afeto, apoio e presença real.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {liveFeatures.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-border bg-white/75 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-10 rounded-3xl bg-sage/15 text-sage flex items-center justify-center">
                      <PawIcon size={14} />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-sage/15 bg-white/90 p-10 shadow-2xl shadow-sage/5">
            <div className="flex items-center gap-3 mb-6 text-sage">
              <div className="size-12 rounded-3xl bg-sage/20 flex items-center justify-center">
                <BookOpen className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] font-semibold">Devocional do dia</p>
                <p className="text-sm text-muted-foreground">Uma palavra tranquila para o seu tempo.</p>
              </div>
            </div>
            <div className="rounded-[32px] border border-sage/20 bg-sage/10 p-10 min-h-[220px]">
              {loading ? (
                <div className="space-y-5 animate-pulse">
                  <div className="h-14 rounded-3xl bg-muted/70" />
                  <div className="h-4 w-5/6 rounded-full bg-muted/70" />
                  <div className="h-4 w-3/4 rounded-full bg-muted/70" />
                </div>
              ) : error ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Hoje o silêncio também pode ser uma forma de cuidado 🌿
                </p>
              ) : (
                <>
                  <p className="font-serif text-3xl leading-tight mb-6 text-foreground">
                    {verse?.text}
                  </p>
                  <div className="text-sm text-sage font-medium tracking-wide">
                    {verse?.reference} · {verse?.book} {verse?.chapter}:{verse?.verse} · {verse?.version}
                  </div>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed mt-8">
              Uma pausa suave para respirar, encontrar sentido e lembrar que você é amado.
            </p>
            <Link
              to="/devocional"
              className="inline-flex items-center gap-2 rounded-full bg-warm-orange px-5 py-3 text-sm font-semibold text-primary-foreground hover:shadow-lg hover:shadow-warm-orange/20 transition-all"
            >
              Ver devocional completo
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto rounded-[40px] border border-border bg-card/80 p-10 text-center shadow-xl shadow-coffee/10">
          <p className="text-sm uppercase tracking-[0.28em] text-sage mb-4 font-semibold">A casa está aberta</p>
          <h2 className="font-serif text-4xl mb-5">Entre para a comunidade dos filhotes.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Aqui tem live, espaço para oração, amizade e aquele clima acolhedor que faz falta.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <a
              href="https://twitch.tv/carolzyn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-warm-orange px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-lg hover:shadow-warm-orange/20 transition-all"
            >
              Ver na Twitch
            </a>
            <a
              href="https://discord.gg/7g9wqcKhb"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
            >
              Entrar no Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

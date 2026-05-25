import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import mural from "@/assets/filhotes-mural.jpg";
import { FloatingLeaves } from "@/components/cozy/FloatingLeaves";
import { PawIcon } from "@/components/cozy/PawIcon";
import { StreamStatusBadge } from "@/components/twitch/StreamStatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { useStreamStatus } from "@/hooks/use-twitch";

export const Route = createFileRoute("/filhotes")({
  head: () => ({
    meta: [
      { title: "Filhotes — a comunidade da carolzyn" },
      {
        name: "description",
        content:
          "Conheça os filhotes: nossa comunidade acolhedora no Discord e nas lives da Twitch.",
      },
      { property: "og:title", content: "Filhotes — comunidade carolzyn" },
      { property: "og:description", content: "Um ninho de gente boa, gatinhos e carinho." },
    ],
  }),
  component: FilhotesPage,
});

function TwitchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

function FilhotesPage() {
  const {
    data: streamData,
    isLoading: streamLoading,
    isError: streamError,
  } = useStreamStatus();

  const isStreamOnline = streamData?.online;
  const viewerCount = streamData?.viewer_count ?? 0;
  const isLoadingStats = streamLoading;
  const hasStatsError = streamError;

  const heroBadgeLabel = "Ninho Ao Vivo";

  const streamLabel = isStreamOnline
    ? `${new Intl.NumberFormat("pt-BR").format(viewerCount)} filhotes no chat agora`
    : "A live está descansando, mas o ninho continua acolhendo.";

  return (
    <>
      <section className="relative px-6 pt-16 pb-20 overflow-hidden">
        <FloatingLeaves />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-warm-orange/15 text-warm-orange rounded-full text-xs font-medium mb-6">
              <PawIcon size={12} />{isLoadingStats ? "Filhotes no ninho" : heroBadgeLabel}
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-6 text-balance">
              Muito mais que uma live, uma <span className="italic text-warm-orange">família</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Ser filhote significa ter um cantinho seguro pra ser você mesmo. A gente compartilha
              fotos dos pets, oração e os pequenos momentos da semana.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://discord.gg/7g9wqcKhb"
                target="_blank"
                rel="noreferrer"
                className="bg-warm-orange text-primary-foreground py-3 px-6 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
              >
                Entrar no Discord
              </a>
              <a
                href="https://twitch.tv/carolzyn"
                target="_blank"
                rel="noreferrer"
                className="bg-card text-foreground py-3 px-6 rounded-xl text-sm font-semibold ring-1 ring-border hover:ring-foreground/30 transition-all flex items-center gap-2"
              >
                <TwitchIcon className="size-4" /> Ver lives
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mural illustration */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto rounded-[40px] overflow-hidden ring-1 ring-border shadow-xl shadow-coffee/10"
        >
          <img
            src={mural}
            alt="Mural da comunidade com polaroids de gatinhos e bilhetes escritos à mão"
            width={1280}
            height={832}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Community board */}
      <section className="py-20 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="font-serif text-4xl mb-2">Ninho Ao Vivo</h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                O ponto de encontro da live da Carol: player oficial, chat integrado e um espaço acolhedor
                para toda a comunidade.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl ring-1 ring-border bg-card/50 p-6"
            >
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <StreamStatusBadge showViewerCount />
                  <div>
                    <h3 className="font-serif text-3xl">Ninho Ao Vivo</h3>
                    <p className="text-muted-foreground mt-2">
                      Assistir, comentar e acompanhar a Carol no mesmo lugar, com o clima cozy do ninho.
                    </p>
                  </div>
                </div>

                {isLoadingStats ? (
                  <div className="rounded-[32px] border border-border bg-background p-8 min-h-[420px] animate-pulse" />
                ) : isStreamOnline ? (
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="rounded-[32px] overflow-hidden border border-border bg-black">
                      <iframe
                        title="Player Twitch Carolzyn"
                        src="https://player.twitch.tv/?channel=carolzyn&parent=carolzyn-lives.netlify.app"
                        allowFullScreen
                        frameBorder="0"
                        loading="lazy"
                        className="w-full h-[360px] sm:h-[430px]"
                      />
                    </div>

                    <div className="rounded-[32px] overflow-hidden border border-border bg-card">
                      <div className="px-5 py-4 border-b border-border/70 bg-muted/70">
                        <p className="text-sm font-semibold text-foreground">Chat da Twitch</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Converse com a comunidade enquanto a live acontece.
                        </p>
                      </div>
                      <iframe
                        title="Chat Twitch Carolzyn"
                        src="https://www.twitch.tv/embed/carolzyn/chat?parent=carolzyn-lives.netlify.app"
                        frameBorder="0"
                        loading="lazy"
                        className="w-full h-[360px] sm:h-[430px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[32px] border border-border bg-warm-orange/5 p-8 min-h-[420px] flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-warm-orange shadow-sm">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-warm-orange animate-pulse" />
                        O ninho está em descanso
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-serif text-4xl leading-tight">Toca o sininho do ninho 🐣</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          A live está descansando agora, mas o chat e a comunidade continuam pertinho.
                          Volte quando quiser para receber carinho, oração e o calor do ninho.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <a
                          href="https://discord.gg/7g9wqcKhb"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-warm-orange text-primary-foreground px-4 py-3 text-sm font-semibold hover:shadow-lg hover:shadow-warm-orange/20 transition-all"
                        >
                          Entrar no Discord
                        </a>
                        <a
                          href="https://twitch.tv/carolzyn"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
                        >
                          Visitar o canal da Twitch
                        </a>
                      </div>
                    </div>

                    <div className="rounded-[28px] bg-gradient-to-r from-warm-orange/10 via-sage/10 to-coffee/10 p-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Mesmo offline, o ninho segue vivo. O canal e o chat voltam quando a Carol retornar.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Community stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-3xl mb-2">Juntos no ninho</h3>
                  <p className="text-muted-foreground">
                    Nossa comunidade cresce a cada semana e encontra espaço no Discord, nas lives e nos momentos de carinho.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-warm-orange/10 border border-warm-orange/20">
                    <p className="text-xs font-semibold uppercase tracking-widest text-warm-orange mb-1">
                      Presença ao vivo
                    </p>
                    {isLoadingStats ? (
                      <Skeleton className="h-12 w-full max-w-xs rounded-2xl" />
                    ) : (
                      <p className="text-2xl font-semibold">{streamLabel}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {hasStatsError
                        ? "A conexão Twitch deu uma pausa, mas o ninho segue ali para você."
                        : isStreamOnline
                        ? "A live está quentinha e cheia de abraços."
                        : "A live descansou, mas o ninho continua acolhendo."}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-coffee/10 border border-coffee/20">
                    <p className="text-xs font-semibold uppercase tracking-widest text-coffee mb-1">
                      Hub da comunidade
                    </p>
                    <p className="text-2xl font-semibold">Discord, live e muito carinho</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      O ninho é o lugar para se conectar, ouvir música, rezar e trocar abraços com outros filhotes.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://discord.gg/7g9wqcKhb"
                target="_blank"
                rel="noreferrer"
                className="mt-6 bg-warm-orange text-primary-foreground py-3 px-6 rounded-full font-semibold hover:shadow-lg hover:shadow-warm-orange/20 transition-all text-center"
              >
                Entrar no Discord
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-warm-orange/10 rounded-[40px] p-12 ring-1 ring-warm-orange/20 relative overflow-hidden">
          <PawIcon className="absolute -top-4 -left-4 text-warm-orange/15" size={120} />
          <PawIcon className="absolute -bottom-6 -right-6 text-sage/20" size={140} />
          <div className="relative">
            <h2 className="font-serif text-4xl mb-4">Vem ser filhote 🐾</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Entre no Discord pra encontrar gente boa, gatinhos e os recadinhos das lives.
            </p>
            <a
                href="https://discord.gg/7g9wqcKhb"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
            >
              Entrar no ninho
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

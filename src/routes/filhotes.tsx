import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import CarolzinFilhotes from "@/assets/carolzin-filhotes.jpeg";
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
          className="max-w-6xl mx-auto rounded-[40px] overflow-hidden ring-1 ring-border shadow-xl shadow-coffee/10"
        >
          <div className="aspect-[16/9] sm:aspect-[16/7]">
            <img
              src={CarolzinFilhotes}
              alt="Mural da comunidade com polaroids de gatinhos e bilhetes escritos à mão"
              width={1280}
              height={832}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Community board */}
      <section className="py-20 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[40px] ring-1 ring-border bg-card/60 p-6 shadow-xl shadow-coffee/10"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <StreamStatusBadge showViewerCount />
                <div>
                  <h3 className="font-serif text-4xl">Ninho Ao Vivo</h3>
                  <p className="text-muted-foreground mt-2 max-w-2xl">
                    Uma experiência integrada com a live da Carol e o chat da comunidade.
                    Aqui é o ponto de encontro da Twitch, do Discord e do calor do ninho.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.5fr_minmax(320px,1fr)]">
                <div className="rounded-[32px] overflow-hidden border border-border bg-black shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  {isLoadingStats ? (
                    <div className="h-[220px] sm:h-[320px] lg:h-[360px] xl:h-[400px] bg-muted/40 flex items-center justify-center text-muted-foreground">
                      Carregando live...
                    </div>
                  ) : isStreamOnline ? (
                    <iframe
                      title="Player Twitch Carolzyn"
                      src="https://player.twitch.tv/?channel=carolzyn&parent=carolzyn-lives.netlify.app"
                      allowFullScreen
                      frameBorder="0"
                      loading="lazy"
                      className="w-full h-[220px] sm:h-[320px] lg:h-[360px] xl:h-[400px]"
                    />
                  ) : (
                    <div className="h-[220px] sm:h-[320px] lg:h-[360px] xl:h-[400px] bg-warm-orange/10 p-8 flex flex-col justify-between rounded-[32px]">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-warm-orange shadow-sm">
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-warm-orange animate-pulse" />
                          O ninho está em descanso
                        </div>
                        <h4 className="font-serif text-3xl mt-6">Toca o sininho do ninho 🐣</h4>
                        <p className="text-muted-foreground mt-4 leading-relaxed">
                          A live está offline agora, mas o espaço continua acolhedor. Volte para o chat e para o carinho assim que a Carol retornar.
                        </p>
                      </div>
                      <div className="rounded-[28px] bg-gradient-to-r from-warm-orange/15 via-sage/10 to-coffee/15 p-5 text-sm text-muted-foreground">
                        Mesmo offline, o hub segue vivo e preparado para mais momentos juntos.
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-[32px] overflow-hidden border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
                  <div className="px-6 py-5 border-b border-border/70 bg-muted/70">
                    <p className="text-sm font-semibold text-foreground">Chat da Twitch</p>
                    <p className="text-xs text-muted-foreground mt-1">Converse com a galera e acompanhe a comunidade.</p>
                  </div>
                  <iframe
                    title="Chat Twitch Carolzyn"
                    src="https://www.twitch.tv/embed/carolzyn/chat?parent=carolzyn-lives.netlify.app"
                    frameBorder="0"
                    loading="lazy"
                    className="w-full h-[420px]"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://twitch.tv/carolzyn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-warm-orange px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-warm-orange/10 transition-all hover:shadow-warm-orange/20"
                >
                  Vem para a live
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

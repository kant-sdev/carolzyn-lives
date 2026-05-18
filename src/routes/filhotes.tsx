import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import mural from "@/assets/filhotes-mural.jpg";
import { FloatingLeaves } from "@/components/cozy/FloatingLeaves";
import { PawIcon } from "@/components/cozy/PawIcon";
import { RecentFollowers } from "@/components/twitch/RecentFollowers";
import { Skeleton } from "@/components/ui/skeleton";
import { useFollowers, useStreamStatus } from "@/hooks/use-twitch";

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
      { property: "og:description", content: "Um ninho de gente boa, gatinhos e café." },
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
    data: followersData,
    isLoading: followersLoading,
    isError: followersError,
  } = useFollowers(10);

  const {
    data: streamData,
    isLoading: streamLoading,
    isError: streamError,
  } = useStreamStatus();

  const totalFollowers = followersData?.totalFollowers;
  const isStreamOnline = streamData?.online;
  const viewerCount = streamData?.viewer_count ?? 0;
  const isLoadingStats = followersLoading || streamLoading;
  const hasStatsError = followersError || streamError;

  const followersLabel = totalFollowers
    ? `${new Intl.NumberFormat("pt-BR").format(totalFollowers)} filhotes seguindo ☕`
    : "Muitos filhotes espalhando carinho ☕";

  const topBadgeLabel = totalFollowers
    ? `${new Intl.NumberFormat("pt-BR").format(totalFollowers)} filhotes no ninho`
    : "Filhotes no ninho";

  const streamLabel = isStreamOnline
    ? `${new Intl.NumberFormat("pt-BR").format(viewerCount)} filhotes na live agora 🐾`
    : "Comunidade crescendo toda semana ☕";

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
              <PawIcon size={12} />{isLoadingStats ? "Filhotes no ninho" : topBadgeLabel}
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-6 text-balance">
              Muito mais que uma live, uma <span className="italic text-warm-orange">família</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Ser filhote significa ter um cantinho seguro pra ser você mesmo. A gente compartilha
              fotos dos pets, receitas de café, oração e os pequenos momentos da semana.
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
              <h2 className="font-serif text-4xl mb-2">Últimos filhotes que chegaram 🐾</h2>
              <p className="text-sm text-muted-foreground">
                Pessoas que decidiram fazer parte do ninho recentemente.
              </p>
            </div>
          </div>

          {/* Recent followers component */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl ring-1 ring-border bg-card/50 p-6"
            >
              <RecentFollowers />
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
                    Nossa comunidade cresce a cada semana com novos filhotes que escolhem fazer parte
                    dessa família aconchegante.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-warm-orange/10 border border-warm-orange/20">
                    <p className="text-xs font-semibold uppercase tracking-widest text-warm-orange mb-1">
                      Seguidores na Twitch
                    </p>
                    {isLoadingStats ? (
                      <Skeleton className="h-12 w-full max-w-xs rounded-2xl" />
                    ) : (
                      <p className="text-2xl font-semibold">{followersLabel}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {hasStatsError
                        ? "A conexão quis dar uma pausa, mas o carinho segue aqui."
                        : "Cada novo seguidor é um filhote chegando no ninho."}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-coffee/10 border border-coffee/20">
                    <p className="text-xs font-semibold uppercase tracking-widest text-coffee mb-1">
                      Crescimento da comunidade
                    </p>
                    {isLoadingStats ? (
                      <Skeleton className="h-12 w-full max-w-xs rounded-2xl" />
                    ) : (
                      <p className="text-2xl font-semibold">{streamLabel}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {isStreamOnline
                        ? "A live está quentinha e cheia de abraços."
                        : "Mesmo offline, o ninho continua crescendo devagar e com carinho."}
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

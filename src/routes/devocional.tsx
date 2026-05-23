import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sunrise } from "lucide-react";
import room from "@/assets/devocional-room.jpg";
import { SteamParticles } from "@/components/cozy/SteamParticles";
import { useDailyVerse } from "@/hooks/use-daily-verse";

export const Route = createFileRoute("/devocional")({
  head: () => ({
    meta: [
      { title: "Devocional — pausa para a alma | carolzyn" },
      {
        name: "description",
        content:
          "Versículo do dia, reflexão curta e convite para o devocional matinal nas lives da carolzyn.",
      },
      { property: "og:title", content: "Devocional cozy — carolzyn" },
      {
        property: "og:description",
        content: "Um momento calmo pra respirar, orar e receber paz.",
      },
    ],
  }),
  component: DevocionalPage,
});

function DevocionalPage() {
  const { verse, loading, error } = useDailyVerse();

  return (
    <>
      {/* Hero with cozy room */}
      <section className="relative">
        <div className="relative h-[44vh] lg:h-[56vh] overflow-hidden">
          <img
            src={room}
            alt="Quarto cozy ao entardecer com Bíblia, vela e iluminação suave"
            width={1280}
            height={832}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <SteamParticles className="bottom-[28%] left-[44%]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-6 -mt-24 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-warm-orange/15 text-warm-orange rounded-full text-xs font-medium mb-5">
            <Sunrise className="size-3" /> Pausa para a alma
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl leading-[1.05] mb-5 text-balance">
            Respira fundo, <span className="italic text-warm-orange">filhote</span>.
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Um pedacinho de paz no meio do dia. Sem pressa, sem peso — só você e uma palavra calma.
          </p>
        </motion.div>
      </section>

      {/* Versículo do dia */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border-2 border-sage/20 p-12 lg:p-14 rounded-[40px] shadow-2xl shadow-sage/5 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sage text-accent-foreground px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]">
              Versículo do dia
            </div>
            <span className="absolute top-6 left-7 text-7xl text-sage/20 font-serif leading-none">
              "
            </span>
            <div className="min-h-[220px] mt-2">
              {loading ? (
                <div className="space-y-5 animate-pulse">
                  <div className="h-14 rounded-3xl bg-muted/70" />
                  <div className="h-4 w-4/5 rounded-full bg-muted/70" />
                  <div className="h-4 w-1/2 rounded-full bg-muted/70" />
                </div>
              ) : verse ? (
                <p className="font-serif text-2xl lg:text-3xl italic text-center leading-snug px-2 text-foreground">
                  {verse.text}
                </p>
              ) : (
                <p className="text-center text-sm leading-relaxed text-muted-foreground">
                  Hoje o silêncio também pode ser uma forma de cuidado 🌿
                </p>
              )}
            </div>
            {verse ? (
              <div className="text-center mt-7 text-sage font-medium tracking-wide">
                {verse.reference}
              </div>
            ) : null}
            <hr className="my-9 border-sage/15" />
            <p className="text-muted-foreground italic text-center leading-relaxed">
              {error
                ? "Hoje o silêncio também pode ser uma forma de cuidado 🌿"
                : "Que hoje você encontre descanso no meio da correria. Respire fundo e saiba que você é amado, exatamente do jeitinho que está."}
            </p>
            <p className="text-right mt-4 text-sm text-muted-foreground">— carol 🤎</p>
          </div>
        </motion.div>
      </section>

      {/* Convite pra devocional ao vivo */}
      <section className="py-20 px-6 bg-muted/40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl mb-4">A gente se vê na live?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            O devocional dos filhotes acontece toda{" "}
            <strong className="text-foreground">segunda-feira às 09:00</strong>, ao vivo na Twitch.
            Oração, presença e papo bom.
          </p>
          <a
            href="https://twitch.tv/carolzyn"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-warm-orange text-primary-foreground px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-warm-orange/20 transition-all"
          >
            Quero participar
          </a>
        </motion.div>
      </section>
    </>
  );
}

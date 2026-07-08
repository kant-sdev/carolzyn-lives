import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PawIcon } from "@/components/cozy/PawIcon";
import { useDailyVerse } from "@/hooks/use-daily-verse";

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

export function LiveAndDevocionalSection() {
  const { verse, loading, error } = useDailyVerse();

  return (
    <section className="py-20 px-6 bg-background relative overflow-hidden">
      {/* Backdrop blur decorativo */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid gap-10 xl:grid-cols-[1.1fr_0.9fr] items-start relative z-10">
        {/* Como é uma live - Card esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[40px] border border-border bg-card/40 p-10 shadow-2xl shadow-coffee/5 dark:border-amber-700/30 dark:bg-gradient-to-br dark:from-yellow-950/70 dark:to-yellow-950/70 dark:shadow-black/10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-sage/15 border border-sage/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-6 dark:bg-amber-900/40 dark:border-amber-700/50 dark:text-amber-200">
            <PawIcon size={14} /> como é uma live
          </div>

          <h2 className="font-serif text-4xl mb-5 text-foreground dark:text-amber-50">
            A sensação é de estar entre amigos.
          </h2>

          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8 dark:text-amber-100/70">
            Lives com papo leve, gameplay cozy e um canto onde todo filhote é bem-vindo.
            Aqui tem afeto, apoio e presença real.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {liveFeatures.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="rounded-[28px] border border-border bg-muted/20 hover:bg-muted/35 p-5 transition-all dark:border-white/10 dark:bg-white/3 dark:backdrop-blur-sm dark:hover:bg-white/5 dark:hover:border-white/15"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-3xl bg-sage/15 text-sage flex items-center justify-center dark:bg-amber-700/40 dark:text-amber-300">
                    <PawIcon size={14} />
                  </div>
                  <h3 className="font-semibold text-foreground dark:text-amber-50">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed dark:text-amber-100/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Devocional do dia - Card direito */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[40px] border border-border bg-card/40 p-10 shadow-2xl shadow-coffee/5 dark:border-amber-700/30 dark:bg-gradient-to-br dark:from-yellow-950/70 dark:to-yellow-950/70 dark:shadow-black/10"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 text-sage dark:text-amber-300">
            <div className="size-12 rounded-3xl bg-sage/20 flex items-center justify-center dark:bg-amber-700/40">
              <BookOpen className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-sage dark:text-amber-200">
                Devocional do dia
              </p>
              <p className="text-sm text-muted-foreground dark:text-amber-100/60">Uma palavra tranquila para o seu tempo.</p>
            </div>
          </div>

          {/* Quote Block */}
          <div className="rounded-[32px] border border-sage/20 bg-sage/8 dark:border-amber-700/30 dark:bg-yellow-950/30 p-10 min-h-[240px] flex flex-col justify-center mb-8">
            {loading ? (
              <div className="space-y-5 animate-pulse">
                <div className="h-14 rounded-3xl bg-muted/40 dark:bg-yellow-900/30" />
                <div className="h-4 w-5/6 rounded-full bg-muted/40 dark:bg-yellow-900/30" />
                <div className="h-4 w-3/4 rounded-full bg-muted/40 dark:bg-yellow-900/30" />
              </div>
            ) : verse ? (
              <>
                <p className="font-serif text-3xl leading-tight mb-8 text-foreground dark:text-amber-100">
                  "{verse.text}"
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-sage font-medium tracking-wide dark:text-amber-300">
                    {verse.reference}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.15em] dark:text-amber-200/60">
                    {verse.book} {verse.chapter}:{verse.verse} • {verse.version}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground dark:text-amber-100/60">
                Hoje o silêncio também pode ser uma forma de cuidado 🌿
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed dark:text-amber-100/60">
            Uma pausa suave para respirar, encontrar sentido e lembrar que você é amado.
          </p>

          {/* CTA Button */}
          <Link
            to="/devocional"
            className="inline-flex items-center gap-2 rounded-full bg-warm-orange hover:shadow-lg hover:shadow-warm-orange/20 px-5 py-3 text-sm font-semibold text-primary-foreground transition-all dark:bg-amber-600 dark:hover:bg-amber-500 dark:text-slate-50 dark:shadow-lg dark:shadow-amber-600/20 dark:hover:shadow-amber-500/30"
          >
            Ver devocional completo
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

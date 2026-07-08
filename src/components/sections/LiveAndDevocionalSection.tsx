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
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950/50 to-slate-950/30">
      <div className="max-w-7xl mx-auto grid gap-10 xl:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Como é uma live - Card esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[40px] border border-amber-700/30 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-10 shadow-2xl shadow-black/20"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-900/40 border border-amber-700/50 px-4 py-2 text-xs uppercase tracking-[0.22em] text-amber-200 font-semibold mb-6">
            <PawIcon size={14} /> como é uma live
          </div>

          <h2 className="font-serif text-4xl mb-5 text-amber-50">
            A sensação é de estar entre amigos.
          </h2>

          <p className="text-amber-100/70 max-w-2xl leading-relaxed mb-8">
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
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/8 hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-3xl bg-amber-700/40 text-amber-300 flex items-center justify-center">
                    <PawIcon size={14} />
                  </div>
                  <h3 className="font-semibold text-amber-50">{item.title}</h3>
                </div>
                <p className="text-sm text-amber-100/60 leading-relaxed">{item.desc}</p>
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
          className="rounded-[40px] border border-amber-700/30 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-10 shadow-2xl shadow-black/20"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 text-amber-300">
            <div className="size-12 rounded-3xl bg-amber-700/40 flex items-center justify-center">
              <BookOpen className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-amber-200">
                Devocional do dia
              </p>
              <p className="text-sm text-amber-100/60">Uma palavra tranquila para o seu tempo.</p>
            </div>
          </div>

          {/* Quote Block */}
          <div className="rounded-[32px] border border-amber-700/40 bg-slate-950/60 p-10 min-h-[240px] flex flex-col justify-center mb-8">
            {loading ? (
              <div className="space-y-5 animate-pulse">
                <div className="h-14 rounded-3xl bg-slate-800/50" />
                <div className="h-4 w-5/6 rounded-full bg-slate-800/50" />
                <div className="h-4 w-3/4 rounded-full bg-slate-800/50" />
              </div>
            ) : verse ? (
              <>
                <p className="font-serif text-3xl leading-tight mb-8 text-amber-100">
                  "{verse.text}"
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-amber-300 font-medium tracking-wide">
                    {verse.reference}
                  </div>
                  <div className="text-xs text-amber-200/60 uppercase tracking-[0.15em]">
                    {verse.book} {verse.chapter}:{verse.verse} • {verse.version}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-amber-100/60">
                Hoje o silêncio também pode ser uma forma de cuidado 🌿
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-amber-100/60 mb-8 leading-relaxed">
            Uma pausa suave para respirar, encontrar sentido e lembrar que você é amado.
          </p>

          {/* CTA Button */}
          <Link
            to="/devocional"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-50 shadow-lg shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Ver devocional completo
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

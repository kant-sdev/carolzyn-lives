import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import mural from "@/assets/filhotes-mural.jpg";
import { FloatingLeaves } from "@/components/cozy/FloatingLeaves";
import { PawIcon } from "@/components/cozy/PawIcon";

export const Route = createFileRoute("/filhotes")({
  head: () => ({
    meta: [
      { title: "Filhotes — a comunidade da carolzyn" },
      { name: "description", content: "Conheça os filhotes: nossa comunidade acolhedora no Discord e nas lives da Twitch." },
      { property: "og:title", content: "Filhotes — comunidade carolzyn" },
      { property: "og:description", content: "Um ninho de gente boa, gatinhos e café." },
    ],
  }),
  component: FilhotesPage,
});

const messages = [
  { name: "lua_mochi", color: "bg-warm-orange", text: "esse devocional de hoje me pegou no coração 🥹 obg carol" },
  { name: "pingo.dev", color: "bg-sage", text: "primeira live e já me senti em casa. acho que virei filhote oficial 🐾" },
  { name: "ana_chai", color: "bg-coffee text-cream", text: "tomando meu chá enquanto leio aqui. perfeito pra noite chuvosa 🍃" },
  { name: "joaco_pet", color: "bg-warm-orange", text: "meu gato veio dormir no meu colo no exato momento que vc disse \"filhote\" 😭" },
  { name: "marisol", color: "bg-sage", text: "a comunidade do discord é o lugar mais gentil da internet, sério" },
  { name: "thé.co", color: "bg-coffee text-cream", text: "alguém mais ouvindo lofi com a live aberta? combinação perfeita" },
];

function TwitchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

function FilhotesPage() {
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
              <PawIcon size={12} />
              + 1.2k filhotes no ninho
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-6 text-balance">
              Muito mais que uma live, uma <span className="italic text-warm-orange">família</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Ser filhote significa ter um cantinho seguro pra ser você mesmo. A gente compartilha fotos
              dos pets, receitas de café, oração e os pequenos momentos da semana.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="bg-warm-orange text-primary-foreground py-3 px-6 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
              >
                Entrar no Discord
              </a>
              <a
                href="https://twitch.tv"
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
              <h2 className="font-serif text-4xl mb-2">No mural dos filhotes</h2>
              <p className="text-sm text-muted-foreground">Carinhos recentes da nossa comunidade.</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-warm-orange">tempo real ✦</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {messages.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="bg-card p-6 rounded-3xl ring-1 ring-border hover:ring-warm-orange/30 hover:-translate-y-1 transition-all"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`size-10 rounded-full ${m.color} flex items-center justify-center text-sm font-semibold`}>
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">@{m.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">filhote</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{m.text}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="size-3" /> {12 + i * 3}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="size-3" /> {2 + i}</span>
                </div>
              </motion.div>
            ))}
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
              href="https://discord.com"
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

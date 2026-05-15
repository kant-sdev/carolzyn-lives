import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Coffee, Users } from "lucide-react";
import heroCat from "@/assets/hero-cat.jpg";
import latte from "@/assets/drink-latte.jpg";
import matcha from "@/assets/drink-matcha.jpg";
import { FloatingLeaves } from "@/components/cozy/FloatingLeaves";
import { SteamParticles } from "@/components/cozy/SteamParticles";
import { PawIcon } from "@/components/cozy/PawIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "carolzyn — Pegue sua bebida e fique à vontade, filhote" },
      { name: "description", content: "O cantinho cozy da carolzyn: lives, devocional, comunidade dos filhotes e a cafeteria da família." },
      { property: "og:title", content: "carolzyn — um cantinho cozy" },
      { property: "og:description", content: "Pegue sua bebida favorita e fique à vontade, filhote ☕" },
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

const cards = [
  {
    to: "/filhotes" as const,
    icon: Users,
    title: "Filhotes",
    desc: "Nossa comunidade acolhedora. Venha fazer parte do mural de memórias.",
    cta: "Explorar mural",
    tint: "bg-sage/15 text-sage",
  },
  {
    to: "/devocional" as const,
    icon: BookOpen,
    title: "Devocional",
    desc: "Momentos de pausa, versículos diários e oração em comunidade.",
    cta: "Ler versículo",
    tint: "bg-warm-orange/15 text-warm-orange",
  },
  {
    to: "/cafe" as const,
    icon: Coffee,
    title: "Café",
    desc: "A cafeteria da nossa família. Conheça nosso cardápio e nossa história.",
    cta: "Ver cardápio",
    tint: "bg-coffee/10 text-foreground",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-24 overflow-hidden">
        <FloatingLeaves />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/15 text-sage rounded-full text-xs font-medium mb-6 ring-1 ring-sage/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
              </span>
              Cafeteria da Carol aberta
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-8 text-balance">
              Pegue sua bebida favorita e fique à vontade,{" "}
              <span className="italic text-warm-orange">filhote</span> ☕
            </h1>
            <p className="text-lg text-muted-foreground max-w-[48ch] mb-10 leading-relaxed">
              Um cantinho calmo na internet para descansarmos, conversarmos sobre a vida e fortalecermos nossa fé. Puxe uma cadeira.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://twitch.tv"
                target="_blank"
                rel="noreferrer"
                className="bg-warm-orange text-primary-foreground py-3 px-5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-warm-orange/20 transition-all flex items-center gap-2 active:scale-95"
              >
                <TwitchIcon className="size-4" />
                Acompanhe na Twitch
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="bg-card text-foreground py-3 px-6 rounded-xl text-sm font-semibold ring-1 ring-border hover:ring-foreground/30 transition-all"
              >
                Comunidade no Discord
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-12 -right-10 size-64 bg-sage/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-12 size-72 bg-warm-orange/15 rounded-full blur-3xl" />
            <div className="relative z-10 rounded-[32px] overflow-hidden ring-1 ring-black/5 shadow-2xl shadow-coffee/10">
              <img
                src={heroCat}
                alt="Gatinhos cozy dormindo ao lado de uma xícara de café fumegante"
                width={1024}
                height={1280}
                className="w-full h-auto"
              />
              <SteamParticles className="bottom-[34%] left-[42%]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section cards */}
      <section className="py-24 px-6 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl mb-3">Onde você quer ir, filhote?</h2>
            <p className="text-muted-foreground">Escolha um cantinho da casa.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.to}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={c.to}
                  className="group block bg-card p-8 rounded-[32px] ring-1 ring-border hover:ring-warm-orange/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-coffee/5 transition-all duration-500"
                >
                  <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 ${c.tint}`}>
                    <c.icon className="size-6" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.desc}</p>
                  <span className="text-xs font-semibold uppercase tracking-wider text-warm-orange flex items-center gap-2 group-hover:gap-3 transition-all">
                    {c.cta} <ArrowRight className="size-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-sage/10 rounded-[40px] p-10 ring-1 ring-sage/20"
          >
            <div className="flex items-center gap-2 mb-6 text-sage">
              <PawIcon className="text-sage" size={18} />
              <span className="text-xs font-semibold uppercase tracking-widest">O pão de hoje</span>
            </div>
            <div className="bg-card rounded-3xl p-8 ring-1 ring-border relative">
              <span className="absolute top-4 left-5 text-5xl text-sage/30 font-serif leading-none">"</span>
              <p className="font-serif italic text-xl text-center mb-6 mt-2 px-3 leading-snug">
                O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar...
              </p>
              <p className="text-xs font-medium text-center text-sage uppercase tracking-widest">
                Salmos 23:1-2
              </p>
            </div>
            <Link
              to="/devocional"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sage hover:gap-3 transition-all"
            >
              Ler reflexão completa <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl mb-2">Especialidades da casa</h2>
                <p className="text-sm text-muted-foreground max-w-[40ch]">
                  Feitos com grãos selecionados e muito carinho pela nossa família.
                </p>
              </div>
              <Link
                to="/cafe"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                Ver todo o menu →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { img: latte, name: "Latte do Filhote", desc: "Expresso, leite vaporizado e canela.", price: "R$ 14,00" },
                { img: matcha, name: "Matcha Sálvia", desc: "Matcha premium com toque refrescante.", price: "R$ 16,50" },
              ].map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-muted/50 ring-1 ring-border hover:ring-warm-orange/30 transition-all"
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    width={640}
                    height={640}
                    loading="lazy"
                    className="size-24 shrink-0 rounded-xl object-cover ring-1 ring-black/5"
                  />
                  <div>
                    <h4 className="font-medium mb-1">{d.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{d.desc}</p>
                    <span className="text-sm font-serif">{d.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

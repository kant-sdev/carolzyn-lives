import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, MapPin, Clock } from "lucide-react";
import cafeInterior from "@/assets/cafe-interior.jpg";
import latte from "@/assets/drink-latte.jpg";
import matcha from "@/assets/drink-matcha.jpg";
import cinnamon from "@/assets/food-cinnamon.jpg";
import cake from "@/assets/food-cake.jpg";
import { SteamParticles } from "@/components/cozy/SteamParticles";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "Café — a cafeteria da família carolzyn" },
      {
        name: "description",
        content:
          "Conheça a cafeteria da família carolzyn: grãos selecionados, bolos artesanais e ambiente cozy.",
      },
      { property: "og:title", content: "A cafeteria dos filhotes" },
      {
        property: "og:description",
        content: "Grãos selecionados, bolos artesanais e muito carinho.",
      },
    ],
  }),
  component: CafePage,
});

const menu = [
  {
    img: latte,
    name: "Latte do Filhote",
    desc: "Expresso, leite vaporizado e um toque de canela.",
    price: "R$ 14,00",
    tag: "favorito",
  },
  {
    img: matcha,
    name: "Matcha Sálvia",
    desc: "Matcha premium com toque refrescante de sálvia.",
    price: "R$ 16,50",
  },
  {
    img: cinnamon,
    name: "Pão de Canela",
    desc: "Massa fofinha com glacê de cream cheese, feito na hora.",
    price: "R$ 12,00",
  },
  {
    img: cake,
    name: "Bolo de Cenoura da Vó",
    desc: "Receita de família com cobertura de cream cheese.",
    price: "R$ 11,00",
    tag: "novidade",
  },
];

function CafePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/15 text-sage rounded-full text-xs font-medium mb-6">
              Aberta de terça a domingo
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-6 text-balance">
              O <span className="italic text-warm-orange">cantinho</span> físico dos filhotes.
            </h1>
            <p className="text-lg text-muted-foreground max-w-[48ch] leading-relaxed mb-8">
              A cafeteria da nossa família existe há 12 anos. Grãos selecionados, bolos da vó,
              música baixinha e gente que lembra do seu nome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-warm-orange" /> Rua das Acácias, 142
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-warm-orange" /> 08:00 — 19:00
              </span>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-warm-orange text-primary-foreground py-3 px-6 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-warm-orange/20 transition-all"
            >
              <Instagram className="size-4" />
              Seguir no Instagram
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-8 -right-8 size-56 bg-warm-orange/15 rounded-full blur-3xl" />
            <div className="relative rounded-[32px] overflow-hidden ring-1 ring-black/5 shadow-2xl shadow-coffee/15">
              <img
                src={cafeInterior}
                alt="Interior aconchegante da cafeteria com plantas, balcão de madeira e gatinhos"
                width={1280}
                height={832}
                loading="lazy"
                className="w-full h-auto"
              />
              <SteamParticles className="bottom-[40%] left-[36%]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-20 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-orange">
              cardápio
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-2">O que tá rolando hoje</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {menu.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-card rounded-3xl overflow-hidden ring-1 ring-border hover:ring-warm-orange/30 hover:-translate-y-1 transition-all flex"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="size-40 sm:size-44 object-cover shrink-0"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    {item.tag && (
                      <span className="text-[10px] uppercase tracking-widest bg-sage/15 text-sage px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-auto leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="font-serif text-lg mt-3">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-coffee/5 rounded-[40px] p-12 ring-1 ring-border"
        >
          <h2 className="font-serif text-4xl mb-4">Aparece pra tomar um café com a gente ☕</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Marca a Carol nas suas fotos da cafeteria — adoramos repostar os filhotes que aparecem
            por lá.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
          >
            <Instagram className="size-4" />
            @cafeteria.dosfilhotes
          </a>
        </motion.div>
      </section>
    </>
  );
}

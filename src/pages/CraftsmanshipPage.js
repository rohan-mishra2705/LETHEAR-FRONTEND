import { useEffect } from "react";
import { motion } from "framer-motion";
import FooterSection from "@/components/FooterSection";

const TEXTURE = "https://images.unsplash.com/photo-1764065339829-b2bba9ca509c?crop=entropy&cs=srgb&fm=jpg&q=85";
const STITCHING = "https://images.unsplash.com/photo-1763674292700-317879c2038c?crop=entropy&cs=srgb&fm=jpg&q=85";
const SEWING = "https://images.unsplash.com/photo-1727924306332-7e981ef2f7e9?crop=entropy&cs=srgb&fm=jpg&q=85";
const LEATHER_TEX = "https://images.unsplash.com/photo-1769674277892-2c46fa0b4216?crop=entropy&cs=srgb&fm=jpg&q=85";

const stages = [
  { number: "01", title: "Hide Selection", desc: "Each hide is hand-selected for grain consistency, thickness uniformity, and character. Only 1 in 8 hides meets our standard.", image: TEXTURE },
  { number: "02", title: "Pattern Cutting", desc: "Millimeter-precision patterns laid by hand. Every panel is mapped to the hide's natural grain direction for structural integrity.", image: STITCHING },
  { number: "03", title: "Hand Assembly", desc: "Each jacket takes 40–50 hours of continuous craftwork. Double-stitched stress points, hand-set hardware, articulated joints.", image: SEWING },
  { number: "04", title: "Finishing", desc: "Hand-burnished edges, conditioning treatment, final quality inspection. Each piece is signed and numbered before leaving the atelier.", image: LEATHER_TEX },
];

export default function CraftsmanshipPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main data-testid="craftsmanship-page" className="bg-[#FFF4E2] min-h-screen pt-20">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-6">The Process</p>
          <h1 data-testid="craft-title" className="font-agatho text-4xl sm:text-5xl lg:text-6xl text-[#472825] leading-none mb-6">Four Stages.<br />One Standard.</h1>
          <p className="text-[#96786F] text-sm tracking-wide max-w-lg font-light leading-relaxed">From raw hide to finished garment. No shortcuts. No compromises.</p>
        </motion.div>
      </section>
      <div className="h-px bg-gradient-to-r from-transparent via-[#D3AB80]/50 to-transparent" />
      {stages.map((stage, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={stage.number} className="border-b border-[#D3AB80]/20">
            <div className={`grid grid-cols-1 lg:grid-cols-2 max-w-[1600px] mx-auto`}>
              <motion.div initial={{ opacity: 0, x: isEven ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden aspect-[16/10] ${isEven ? "" : "lg:order-2"}`}>
                <img src={stage.image} alt={stage.title} className="w-full h-full object-cover opacity-80" loading="lazy" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-24 bg-[#FFF4E2] ${isEven ? "" : "lg:order-1"}`}>
                <span className="font-agatho text-5xl lg:text-7xl text-[#D3AB80]/40 mb-6">{stage.number}</span>
                <h2 data-testid={`craft-stage-${stage.number}`} className="font-agatho text-2xl md:text-3xl text-[#472825] mb-4">{stage.title}</h2>
                <p className="text-[#96786F] text-sm leading-relaxed tracking-wide max-w-md">{stage.desc}</p>
              </motion.div>
            </div>
          </section>
        );
      })}
      <FooterSection />
    </main>
  );
}

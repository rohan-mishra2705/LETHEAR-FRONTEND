import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TEXTURE = "https://images.unsplash.com/photo-1764065339829-b2bba9ca509c?crop=entropy&cs=srgb&fm=jpg&q=85";
const STITCHING = "https://images.unsplash.com/photo-1763674292700-317879c2038c?crop=entropy&cs=srgb&fm=jpg&q=85";
const SEWING = "https://images.unsplash.com/photo-1727924306332-7e981ef2f7e9?crop=entropy&cs=srgb&fm=jpg&q=85";
const LEATHER_TEX = "https://images.unsplash.com/photo-1769674277892-2c46fa0b4216?crop=entropy&cs=srgb&fm=jpg&q=85";

const stages = [
  {
    number: "01",
    title: "Hide Selection",
    desc: "Each hide is hand-selected for grain consistency, thickness uniformity, and character. Only 1 in 8 hides meets our standard.",
    image: TEXTURE,
  },
  {
    number: "02",
    title: "Pattern Cutting",
    desc: "Millimeter-precision patterns laid by hand. Every panel is mapped to the hide's natural grain direction for structural integrity.",
    image: STITCHING,
  },
  {
    number: "03",
    title: "Hand Assembly",
    desc: "Each jacket takes 16-28 hours of continuous craftwork. Double-stitched stress points, hand-set hardware, articulated joints.",
    image: SEWING,
  },
  {
    number: "04",
    title: "Finishing",
    desc: "Hand-burnished edges, conditioning treatment, final quality inspection. Each piece is signed and numbered before leaving the atelier.",
    image: LEATHER_TEX,
  },
];

export default function CraftsmanshipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="craft"
      data-testid="craftsmanship-section"
      ref={ref}
      className="py-24 md:py-32 lg:py-40"
    >
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[#C9A96A] uppercase tracking-[0.3em] text-xs mb-6">
            The Process
          </p>
          <h2
            data-testid="craft-title"
            className="font-agatho text-3xl sm:text-4xl lg:text-5xl text-[#E5E5E5] leading-tight max-w-xl"
          >
            Four Stages.<br />
            One Standard.
          </h2>
        </motion.div>
      </div>

      <div className="space-y-0">
        {stages.map((stage, i) => (
          <CraftStage key={stage.number} stage={stage} index={i} />
        ))}
      </div>
    </section>
  );
}

function CraftStage({ stage, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-[#262626]"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 max-w-[1600px] mx-auto ${isEven ? '' : 'lg:direction-rtl'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`relative overflow-hidden aspect-[16/10] ${isEven ? '' : 'lg:order-2'}`}
        >
          <img
            src={stage.image}
            alt={stage.title}
            className="w-full h-full object-cover opacity-70"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0E0E0E]/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-24 ${isEven ? '' : 'lg:order-1'}`}
        >
          <span className="font-agatho text-5xl lg:text-7xl text-[#262626] mb-6">
            {stage.number}
          </span>
          <h3
            data-testid={`craft-stage-${stage.number}`}
            className="font-agatho text-2xl md:text-3xl text-[#E5E5E5] mb-4"
          >
            {stage.title}
          </h3>
          <p className="text-[#A3A3A3] text-sm leading-relaxed tracking-wide max-w-md">
            {stage.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

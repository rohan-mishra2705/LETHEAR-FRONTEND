import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WORKSHOP_1 = "https://images.unsplash.com/photo-1531188929123-0cfa61e6c770?crop=entropy&cs=srgb&fm=jpg&q=85";
const WORKSHOP_2 = "https://images.unsplash.com/photo-1643968704781-df3b260df6a7?crop=entropy&cs=srgb&fm=jpg&q=85";

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="philosophy"
      data-testid="philosophy-section"
      ref={ref}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
        {/* Left: Text */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C9A96A] uppercase tracking-[0.3em] text-xs mb-6">
              Philosophy
            </p>
            <h2
              data-testid="philosophy-title"
              className="font-agatho text-3xl sm:text-4xl lg:text-5xl text-[#E5E5E5] leading-tight mb-8"
            >
              Permanence<br />
              Over Trend
            </h2>
            <div className="space-y-6 text-[#A3A3A3] text-sm leading-relaxed tracking-wide">
              <p>
                Every LHEATHER piece begins with a single hide and a singular intent:
                to create something that outlasts its maker. We do not follow seasons.
                We do not chase trends.
              </p>
              <p>
                Our atelier operates on the principle that time is the ultimate test
                of quality. Each jacket is a collaboration between craftsman and material
                — where the leather&apos;s character dictates the final form.
              </p>
              <p className="font-agatho-narrow italic text-base text-[#C9A96A]/80">
                &ldquo;The marks become the memory.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Images */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden aspect-[4/3]"
          >
            <img
              src={WORKSHOP_1}
              alt="Leather crafting tools"
              className="w-full h-full object-cover image-zoom"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/40 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden aspect-square"
            >
              <img
                src={WORKSHOP_2}
                alt="Craftsman at work"
                className="w-full h-full object-cover image-zoom"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center bg-[#141414] border border-[#262626] p-8"
            >
              <div className="text-center">
                <p className="font-agatho text-4xl text-[#C9A96A] mb-2">50</p>
                <p className="text-[#525252] uppercase tracking-[0.2em] text-xs">
                  Pieces per year
                </p>
                <p className="text-[#525252] uppercase tracking-[0.2em] text-xs mt-1">
                  The Legacy Edition
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

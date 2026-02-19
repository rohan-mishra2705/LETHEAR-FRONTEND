import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HERO_BG = "https://images.unsplash.com/photo-1752213355644-64b6900e7841?crop=entropy&cs=srgb&fm=jpg&q=85";

export default function HeroSection() {
  const scrollToCollection = () => {
    const el = document.querySelector("#collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src={HERO_BG}
          alt=""
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/40 via-[#0E0E0E]/20 to-[#0E0E0E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            data-testid="hero-headline"
            className="font-agatho text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-[#E5E5E5] leading-none tracking-tight mb-6"
          >
            Crafted to<br />
            <span className="text-[#C9A96A]">Outlive You.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          data-testid="hero-subtitle"
          className="text-[#A3A3A3] text-sm md:text-base tracking-wide max-w-md mb-10 font-light"
        >
          Handmade leather garments built to age, not expire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4"
        >
          <button
            data-testid="hero-explore-btn"
            onClick={scrollToCollection}
            className="bg-[#C9A96A] text-[#0E0E0E] hover:bg-[#D4C4A8] transition-colors duration-500 font-medium px-8 py-4 uppercase tracking-[0.2em] text-xs"
          >
            Explore Collection
          </button>
          <button
            data-testid="hero-craft-btn"
            onClick={() => {
              const el = document.querySelector("#craft");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A] hover:text-[#0E0E0E] transition-all duration-500 px-8 py-4 uppercase tracking-[0.2em] text-xs"
          >
            Our Craft
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-[#525252]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

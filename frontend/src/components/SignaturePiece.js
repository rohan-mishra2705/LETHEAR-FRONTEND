import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const LEGACY_IMAGE = "https://images.unsplash.com/photo-1727518154538-59e7dc479f8f?crop=entropy&cs=srgb&fm=jpg&q=85";

export default function SignaturePiece() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      data-testid="signature-section"
      ref={ref}
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#C9A96A]/[0.02] blur-[100px]" />
      </div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image - Museum style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={LEGACY_IMAGE}
                alt="The Legacy"
                data-testid="signature-image"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              {/* Spotlight effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/60 to-transparent" />

              {/* Edition label */}
              <div className="absolute bottom-8 left-8">
                <p className="text-[#C9A96A]/60 uppercase tracking-[0.3em] text-[10px]">
                  Limited to 50 per year
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-[#C9A96A] uppercase tracking-[0.3em] text-xs mb-6">
              Signature Piece
            </p>
            <h2
              data-testid="signature-title"
              className="font-agatho text-4xl sm:text-5xl lg:text-6xl text-[#E5E5E5] leading-none mb-6"
            >
              The Legacy
            </h2>
            <p className="font-agatho-narrow italic text-lg text-[#A3A3A3] mb-8">
              Heirloom Quality
            </p>

            <div className="space-y-4 text-[#A3A3A3] text-sm leading-relaxed tracking-wide mb-10">
              <p>
                Our flagship collector piece. Each Legacy jacket is built by a single craftsman 
                over 24-28 hours of focused work. Premium oxblood leather, hand saddle stitching, 
                solid brass hardware, and Kevlar reinforcement.
              </p>
              <p>
                Every piece is semi-bespoke, fitted to its owner. A name plate is set into the 
                interior, marking it as truly yours.
              </p>
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="font-agatho text-3xl text-[#C9A96A]">
                {"\u20B9"}28,000
              </span>
              <span className="text-[#525252] text-xs uppercase tracking-[0.2em]">
                Pre-order only
              </span>
            </div>

            <Link
              to="/product/legacy-001"
              data-testid="signature-cta"
              className="inline-block border border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A] hover:text-[#0E0E0E] transition-all duration-500 px-10 py-4 uppercase tracking-[0.2em] text-xs"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

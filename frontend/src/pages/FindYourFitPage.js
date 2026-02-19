import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Ruler } from "lucide-react";
import FooterSection from "@/components/FooterSection";

const SIZES = [
  { label: "S", chest: '36-38"', shoulder: '16.5"', length: '25"' },
  { label: "M", chest: '38-40"', shoulder: '17.5"', length: '26"' },
  { label: "L", chest: '40-42"', shoulder: '18.5"', length: '27"' },
  { label: "XL", chest: '42-44"', shoulder: '19.5"', length: '28"' },
  { label: "XXL", chest: '44-46"', shoulder: '20.5"', length: '29"' },
];

const BODY_TYPES = [
  { id: "slim", label: "Slim", desc: "Lean build, narrow shoulders" },
  { id: "athletic", label: "Athletic", desc: "Broad shoulders, defined chest" },
  { id: "regular", label: "Regular", desc: "Balanced proportions" },
  { id: "relaxed", label: "Relaxed", desc: "Wider frame, comfort-first fit" },
];

export default function FindYourFitPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main data-testid="find-fit-page" className="bg-[#FFF4E2] min-h-screen pt-20">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Ruler size={16} className="text-[#5a3d38]" />
            <p className="text-[#5a3d38] uppercase tracking-[0.3em] text-xs font-medium">Made for You</p>
          </div>
          <h1 data-testid="fit-title" className="font-agatho text-4xl sm:text-5xl lg:text-6xl text-[#3a201d] leading-none mb-4">Find Your Fit</h1>
          <p className="text-[#5a3d38] text-sm tracking-wide max-w-lg leading-relaxed">Select your measurements and body type — we will recommend the right cut.</p>
        </motion.div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#472825]/30 to-transparent mb-16" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Size Selection */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1 }}>
            <p className="text-[#472825] uppercase tracking-[0.2em] text-xs mb-6 font-medium">Select Size</p>
            <div className="grid grid-cols-5 gap-3">
              {SIZES.map((s) => (
                <button key={s.label} data-testid={`size-${s.label}`} onClick={() => { setSelectedSize(s); setShowResult(false); }}
                  className={`py-5 text-center border transition-all duration-500 ${selectedSize?.label === s.label ? "border-[#472825] bg-[#472825]/10 text-[#3a201d]" : "border-[#472825]/30 text-[#5a3d38] hover:border-[#472825]/60"}`}>
                  <span className="font-agatho text-xl">{s.label}</span>
                </button>
              ))}
            </div>
            {selectedSize && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.5 }} className="mt-6 p-6 bg-[#FDE4BC] border border-[#472825]/20">
                <p className="text-[#472825] uppercase tracking-[0.2em] text-xs mb-4 font-medium">Measurements</p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  {[["Chest", selectedSize.chest], ["Shoulder", selectedSize.shoulder], ["Length", selectedSize.length]].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[#5a3d38] uppercase tracking-[0.15em] text-[10px] mb-1">{k}</p>
                      <p className="text-[#3a201d] text-base font-agatho">{v}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Body Type Selection */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
            <p className="text-[#472825] uppercase tracking-[0.2em] text-xs mb-6 font-medium">Body Type</p>
            <div className="space-y-3">
              {BODY_TYPES.map((bt) => (
                <button key={bt.id} data-testid={`body-${bt.id}`} onClick={() => { setSelectedBody(bt); setShowResult(false); }}
                  className={`w-full text-left p-5 border transition-all duration-500 ${selectedBody?.id === bt.id ? "border-[#472825]/60 bg-[#472825]/10" : "border-[#472825]/25 hover:border-[#472825]/50"}`}>
                  <span className={`font-agatho text-lg ${selectedBody?.id === bt.id ? "text-[#3a201d]" : "text-[#5a3d38]"}`}>{bt.label}</span>
                  <span className="text-[#6b4f4a] text-xs ml-3">{bt.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Find Fit Button & Result */}
        <div className="mt-14">
          <button data-testid="find-fit-btn" onClick={() => { if (selectedSize && selectedBody) setShowResult(true); }} disabled={!selectedSize || !selectedBody}
            className="bg-[#472825] text-[#FFF4E2] hover:bg-[#5a3d38] transition-colors duration-500 font-medium px-10 py-4 uppercase tracking-[0.2em] text-xs disabled:opacity-30 disabled:cursor-not-allowed">
            Find My Fit
          </button>
          {showResult && selectedSize && selectedBody && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} data-testid="fit-result" className="mt-8 p-8 bg-[#FDE4BC] border border-[#472825]/20 max-w-xl">
              <p className="text-[#472825] uppercase tracking-[0.2em] text-xs mb-3 font-medium">Your Recommendation</p>
              <p className="text-[#5a3d38] text-sm leading-relaxed mb-4">
                For a <span className="text-[#3a201d] font-medium">{selectedSize.label}</span> / <span className="text-[#3a201d] font-medium">{selectedBody.label.toLowerCase()}</span> build, we recommend{" "}
                {selectedBody.id === "slim" || selectedBody.id === "athletic" ? <><strong className="text-[#3a201d]">The Racer</strong> or <strong className="text-[#3a201d]">The Engineer</strong></> : <><strong className="text-[#3a201d]">The Architect</strong> or <strong className="text-[#3a201d]">The Nomad</strong></>}.
              </p>
              <Link to="/collection" data-testid="fit-result-cta" className="inline-flex items-center gap-2 text-[#472825] text-xs uppercase tracking-[0.2em] hover:text-[#5a3d38] font-medium">
                <span>View Collection</span><ArrowRight size={12} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}

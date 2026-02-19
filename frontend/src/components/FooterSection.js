import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_git-pull-1/artifacts/0zxcohs0_Gemini_Generated_Image_gra9grgra9grgra9.png";

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!email) return;
    try { await axios.post(`${API}/newsletter`, { email }); setStatus("success"); setEmail(""); }
    catch (err) { setStatus(err.response?.status === 400 ? "exists" : "error"); }
  };

  return (
    <footer data-testid="footer-section" ref={ref} className="border-t border-[#D3AB80]/30 bg-[#FDE4BC]">
      <div className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-xl">
          <p className="text-[#472825] uppercase tracking-[0.3em] text-xs mb-6">Stay Informed</p>
          <h2 className="font-agatho text-2xl sm:text-3xl text-[#472825] leading-tight mb-4">Join the Atelier</h2>
          <p className="text-[#96786F] text-sm tracking-wide mb-8">Receive updates on new pieces, limited editions, and atelier stories. No noise, no frequency — only what matters.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input data-testid="newsletter-email-input" type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus(""); }} placeholder="Your email"
              className="flex-1 bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-4 px-0 placeholder:text-[#D3AB80] transition-colors duration-300 text-sm tracking-wide" required />
            <button data-testid="newsletter-submit-btn" type="submit"
              className="bg-[#472825] text-[#FFF4E2] hover:bg-[#96786F] transition-colors duration-500 font-medium px-8 py-4 uppercase tracking-[0.2em] text-xs whitespace-nowrap">Subscribe</button>
          </form>
          {status === "success" && <p data-testid="newsletter-success" className="text-[#472825] text-xs mt-4 tracking-wide">Welcome to the atelier.</p>}
          {status === "exists" && <p data-testid="newsletter-exists" className="text-[#96786F] text-xs mt-4 tracking-wide">You are already part of the atelier.</p>}
          {status === "error" && <p data-testid="newsletter-error" className="text-[#96786F] text-xs mt-4 tracking-wide">Something went wrong. Please try again.</p>}
        </motion.div>
      </div>
      <div className="border-t border-[#D3AB80]/30 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <img src={LOGO_URL} alt="LHEATHER" className="h-8 w-auto opacity-40" />
            <span className="text-[#D3AB80] text-xs tracking-wide">Online Atelier</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-[#96786F] hover:text-[#472825] transition-colors duration-300 text-xs uppercase tracking-[0.2em]">Instagram</a>
            <span className="text-[#D3AB80]">|</span>
            <span className="text-[#D3AB80] text-xs tracking-wide">&copy; {new Date().getFullYear()} LHEATHER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

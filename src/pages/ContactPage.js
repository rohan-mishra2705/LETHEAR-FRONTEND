import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault(); if (!email) return;
    try { await axios.post(`${API}/newsletter`, { email }); setStatus("success"); setEmail(""); }
    catch (err) { setStatus(err.response?.status === 400 ? "exists" : "error"); }
  };

  return (
    <main data-testid="contact-page" className="bg-[#FFF4E2] min-h-screen pt-20">
      <section className="min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-6">Get in Touch</p>
            <h1 data-testid="contact-title" className="font-agatho text-4xl sm:text-5xl lg:text-6xl text-[#472825] leading-none mb-8">Contact</h1>
            <div className="space-y-8 text-[#96786F] text-sm tracking-wide">
              <div><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-2">Location</p><p>Online Atelier</p><p className="text-[#D3AB80] mt-1">Worldwide shipping available</p></div>
              <div><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-2">Inquiries</p><p>atelier@lheather.com</p></div>
              <div><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-2">Follow</p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" data-testid="contact-instagram" className="text-[#96786F] hover:text-[#472825] transition-colors duration-300">Instagram</a></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="flex flex-col justify-center">
            <h2 className="font-agatho text-2xl sm:text-3xl text-[#472825] leading-tight mb-4">Join the Atelier</h2>
            <p className="text-[#96786F] text-sm tracking-wide mb-8 font-light leading-relaxed">Updates on new pieces, limited editions, and atelier stories. No noise — only what matters.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input data-testid="contact-email-input" type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus(""); }} placeholder="Your email"
                className="w-full bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-4 px-0 placeholder:text-[#D3AB80] transition-colors duration-300 text-sm tracking-wide" required />
              <button data-testid="contact-submit-btn" type="submit"
                className="bg-[#472825] text-[#FFF4E2] hover:bg-[#96786F] transition-colors duration-500 font-medium px-10 py-4 uppercase tracking-[0.2em] text-xs">Subscribe</button>
              {status === "success" && <p data-testid="contact-success" className="text-[#472825] text-xs tracking-wide">Welcome to the atelier.</p>}
              {status === "exists" && <p className="text-[#96786F] text-xs tracking-wide">Already part of the atelier.</p>}
            </form>
            <div className="mt-16 pt-8 border-t border-[#D3AB80]/30">
              <p className="font-agatho-narrow italic text-base text-[#472825]/50">&ldquo;This piece will change with you.&rdquo;</p>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="border-t border-[#D3AB80]/30 px-6 md:px-12 bg-[#FDE4BC]">
        <div className="max-w-[1600px] mx-auto py-6 flex items-center justify-between">
          <span className="text-[#D3AB80] text-xs tracking-wide">Online Atelier</span>
          <span className="text-[#D3AB80] text-xs">&copy; {new Date().getFullYear()} LHEATHER</span>
        </div>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import FooterSection from "@/components/FooterSection";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function WaitlistPage() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => { window.scrollTo(0, 0); axios.get(`${API}/products`).then((r) => setProducts(r.data)).catch(console.error); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!email || !selectedProduct) return;
    const product = products.find((p) => p.id === selectedProduct); if (!product) return;
    try { await axios.post(`${API}/waitlist`, { email, product_id: product.id, product_name: product.name, entry_type: product.availability }); setStatus("success"); setEmail(""); setSelectedProduct(""); }
    catch (err) { setStatus(err.response?.status === 400 ? "exists" : "error"); }
  };

  return (
    <main data-testid="waitlist-page" className="bg-[#FFF4E2] min-h-screen pt-20">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-xl">
          <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-6">Reserve Your Piece</p>
          <h1 data-testid="waitlist-title" className="font-agatho text-4xl sm:text-5xl lg:text-6xl text-[#472825] leading-none mb-6">Join the<br />Waitlist</h1>
          <p className="text-[#96786F] text-sm tracking-wide font-light leading-relaxed mb-12">Select your piece and enter your email. We will reach out with details.</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-4">Select a piece</p>
              <div className="space-y-3">
                {products.map((p) => (
                  <button key={p.id} type="button" data-testid={`waitlist-select-${p.id}`}
                    onClick={() => { setSelectedProduct(p.id); setStatus(""); }}
                    className={`w-full text-left p-4 border transition-all duration-500 flex items-center justify-between ${
                      selectedProduct === p.id ? "border-[#472825]/50 bg-[#472825]/5" : "border-[#D3AB80]/30 hover:border-[#D3AB80] bg-transparent"
                    }`}>
                    <div>
                      <span className={`font-agatho text-base ${selectedProduct === p.id ? "text-[#472825]" : "text-[#96786F]"}`}>{p.name}</span>
                      <span className="text-[#D3AB80] text-xs ml-3">{p.code}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#472825]/70 text-sm">{"\u20B9"}{p.price.toLocaleString("en-IN")}</span>
                      <span className={`text-[10px] uppercase tracking-[0.15em] px-2 py-1 ${p.availability === "pre-order" ? "text-[#472825] border border-[#472825]/30" : "text-[#D3AB80] border border-[#D3AB80]/50"}`}>
                        {p.availability === "pre-order" ? "Pre-Order" : "Waitlist"}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <input data-testid="waitlist-email-input" type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus(""); }} placeholder="Your email"
              className="w-full bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-4 px-0 placeholder:text-[#D3AB80] transition-colors duration-300 text-sm tracking-wide" required />
            <button data-testid="waitlist-submit-btn" type="submit" disabled={!selectedProduct || !email}
              className="bg-[#472825] text-[#FFF4E2] hover:bg-[#96786F] transition-colors duration-500 font-medium px-10 py-4 uppercase tracking-[0.2em] text-xs disabled:opacity-30 disabled:cursor-not-allowed">
              {selectedProduct && products.find((p) => p.id === selectedProduct)?.availability === "pre-order" ? "Pre-Order Now" : "Join Waitlist"}</button>
            {status === "success" && <p data-testid="waitlist-success" className="text-[#472825] text-xs tracking-wide">You are in. We will be in touch.</p>}
            {status === "exists" && <p data-testid="waitlist-exists" className="text-[#96786F] text-xs tracking-wide">You are already registered for this piece.</p>}
            {status === "error" && <p data-testid="waitlist-error" className="text-[#96786F] text-xs tracking-wide">Something went wrong. Please try again.</p>}
          </form>
        </motion.div>
      </section>
      <FooterSection />
    </main>
  );
}

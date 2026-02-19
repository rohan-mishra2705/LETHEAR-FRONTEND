import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => { window.scrollTo(0, 0); axios.get(`${API}/products/${productId}`).then((res) => { setProduct(res.data); setLoading(false); }).catch(() => setLoading(false)); }, [productId]);

  const handleWaitlist = async (e) => {
    e.preventDefault(); if (!email || !product) return;
    try { await axios.post(`${API}/waitlist`, { email, product_id: product.id, product_name: product.name, entry_type: product.availability }); setSubmitStatus("success"); setEmail(""); }
    catch (err) { setSubmitStatus(err.response?.status === 400 ? "exists" : "error"); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FFF4E2]"><div className="w-8 h-8 border border-[#D3AB80] border-t-[#472825] rounded-full animate-spin" /></div>;
  if (!product) return <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF4E2] gap-6"><p className="text-[#96786F] text-sm">Product not found</p><Link to="/" className="text-[#472825] text-xs uppercase tracking-[0.2em]">Return Home</Link></div>;

  return (
    <main data-testid="product-page" className="bg-[#FFF4E2] min-h-screen">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="fixed top-24 left-6 md:left-12 z-50">
        <Link to="/collection" data-testid="back-to-home" className="flex items-center gap-2 text-[#D3AB80] hover:text-[#472825] transition-colors duration-300 text-xs uppercase tracking-[0.2em]">
          <ArrowLeft size={14} /><span>Back</span>
        </Link>
      </motion.div>

      <section className="relative h-screen">
        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <img src={product.image_url} alt={product.name} data-testid="product-hero-image" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E2]/30 via-transparent to-[#FFF4E2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF4E2]/50 to-transparent" />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }}>
            <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-4">{product.code}</p>
            <h1 data-testid="product-title" className="font-agatho text-4xl sm:text-5xl lg:text-7xl text-[#472825] leading-none mb-4">{product.name}</h1>
            <p className="font-agatho-narrow italic text-lg md:text-xl text-[#96786F] mb-6">{product.tagline}</p>
            <p className="font-agatho text-2xl md:text-3xl text-[#472825]">{"\u20B9"}{product.price.toLocaleString("en-IN")}</p>
          </motion.div>
        </div>
      </section>

      <DetailSection title="Overview"><p className="text-[#96786F] text-sm md:text-base leading-relaxed tracking-wide max-w-2xl">{product.concept}</p></DetailSection>
      <DetailSection title="Engineering">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-4">Specifications</p>
            <ul className="space-y-3">{product.engineering_details.map((d, i) => <li key={i} className="flex items-start gap-3 text-[#96786F] text-sm tracking-wide"><span className="w-1 h-1 rounded-full bg-[#472825] mt-2 shrink-0" />{d}</li>)}</ul></div>
          {product.leather && <div><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-4">Leather</p><p className="text-[#96786F] text-sm leading-relaxed tracking-wide">{product.leather}</p></div>}
        </div>
      </DetailSection>
      <DetailSection title="Construction"><p className="text-[#96786F] text-sm md:text-base leading-relaxed tracking-wide max-w-2xl">{product.construction}</p></DetailSection>
      <DetailSection title="Fit"><ul className="space-y-3 max-w-2xl">{product.fit.map((f, i) => <li key={i} className="flex items-start gap-3 text-[#96786F] text-sm tracking-wide"><span className="w-1 h-1 rounded-full bg-[#472825] mt-2 shrink-0" />{f}</li>)}</ul></DetailSection>
      {product.colors.length > 0 && <DetailSection title="Colors"><div className="flex flex-wrap gap-4">{product.colors.map((c, i) => <span key={i} className="px-4 py-2 border border-[#D3AB80]/40 text-[#96786F] text-xs uppercase tracking-[0.15em]">{c}</span>)}</div></DetailSection>}
      <DetailSection title="Includes"><div className="flex flex-wrap gap-4 max-w-2xl">{product.includes.map((item, i) => <span key={i} className="flex items-center gap-2 text-[#96786F] text-sm tracking-wide"><Check size={12} className="text-[#472825]" />{item}</span>)}</div></DetailSection>
      <DetailSection title="Lifetime Philosophy">
        <div className="max-w-2xl space-y-6">
          <p className="text-[#96786F] text-sm leading-relaxed tracking-wide">Every LHEATHER piece is built to be worn, aged, and inherited.</p>
          <p className="font-agatho-narrow italic text-base text-[#472825]/60">&ldquo;This piece will change with you.&rdquo;</p>
          <div className="pt-4"><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-2">Delivery</p><p className="text-[#96786F] text-sm tracking-wide">{product.delivery}</p></div>
        </div>
      </DetailSection>

      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="max-w-lg">
          <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-6">{product.availability === "pre-order" ? "Pre-Order" : "Join the Waitlist"}</p>
          <h2 className="font-agatho text-2xl sm:text-3xl text-[#472825] leading-tight mb-4">{product.availability === "pre-order" ? "Reserve Your Piece" : "Be the First to Know"}</h2>
          <p className="text-[#96786F] text-sm tracking-wide mb-8">{product.availability === "pre-order" ? "Secure your order. We will reach out with fitting details." : "Enter your email. We will notify you when available."}</p>
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4">
            <input data-testid="waitlist-email-input" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSubmitStatus(""); }} placeholder="Your email"
              className="flex-1 bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-4 px-0 placeholder:text-[#D3AB80] transition-colors duration-300 text-sm tracking-wide" required />
            <button data-testid="waitlist-submit-btn" type="submit"
              className="bg-[#472825] text-[#FFF4E2] hover:bg-[#96786F] transition-colors duration-500 font-medium px-8 py-4 uppercase tracking-[0.2em] text-xs whitespace-nowrap">
              {product.availability === "pre-order" ? "Pre-Order" : "Join Waitlist"}</button>
          </form>
          {submitStatus === "success" && <p data-testid="waitlist-success" className="text-[#472825] text-xs mt-4 tracking-wide">{product.availability === "pre-order" ? "Your pre-order has been received." : "You are on the list."}</p>}
          {submitStatus === "exists" && <p data-testid="waitlist-exists" className="text-[#96786F] text-xs mt-4 tracking-wide">Already registered for this piece.</p>}
        </motion.div>
      </section>

      <div className="border-t border-[#D3AB80]/30 px-6 md:px-12 bg-[#FDE4BC]">
        <div className="max-w-[1600px] mx-auto py-8 flex items-center justify-between">
          <Link to="/" className="text-[#96786F] hover:text-[#472825] text-xs uppercase tracking-[0.2em] transition-colors duration-300">LHEATHER</Link>
          <span className="text-[#D3AB80] text-xs">&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </main>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="border-t border-[#D3AB80]/30">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mb-8">{title}</p>
        {children}
      </motion.div>
    </section>
  );
}

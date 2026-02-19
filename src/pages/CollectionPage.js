import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import FooterSection from "@/components/FooterSection";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { window.scrollTo(0, 0); axios.get(`${API}/products`).then((r) => setProducts(r.data)).catch(console.error); }, []);

  return (
    <main data-testid="collection-page" className="bg-[#FFF4E2] min-h-screen pt-20">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-6">The Collection</p>
          <h1 data-testid="collection-title" className="font-agatho text-4xl sm:text-5xl lg:text-6xl text-[#472825] leading-none mb-6">Five Signatures</h1>
          <p className="text-[#96786F] text-sm tracking-wide max-w-lg font-light leading-relaxed">Each piece begins with a single hide and a singular intent — to create something that outlasts its maker.</p>
        </motion.div>
      </section>
      <div className="h-px bg-gradient-to-r from-transparent via-[#D3AB80]/50 to-transparent" />
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.2, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className={i === 4 ? "md:col-span-2" : ""}>
              <Link to={`/product/${product.id}`} data-testid={`product-card-${product.id}`} className="group block product-card-hover">
                <div className="relative overflow-hidden bg-[#FDE4BC] border border-[#D3AB80]/30 group-hover:border-[#D3AB80] transition-colors duration-700">
                  <div className={`relative ${i === 4 ? "aspect-[21/9]" : "aspect-[4/5]"} overflow-hidden`}>
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover image-zoom opacity-80 group-hover:opacity-100 transition-opacity duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#472825]/60 via-transparent to-transparent" />
                    <div className="absolute top-5 right-5">
                      <span data-testid={`badge-${product.id}`}
                        className={`uppercase tracking-[0.2em] text-[10px] px-3 py-1.5 ${product.availability === "pre-order" ? "bg-[#472825]/80 text-[#FDE4BC] border border-[#472825]/50" : "bg-[#FDE4BC]/80 text-[#96786F] border border-[#D3AB80]/50"}`}>
                        {product.availability === "pre-order" ? "Pre-Order" : "Waitlist"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 data-testid={`product-name-${product.id}`} className="font-agatho text-xl md:text-2xl text-[#472825] mb-1">{product.name}</h3>
                        <p className="text-[#D3AB80] uppercase tracking-[0.15em] text-xs">{product.code}</p>
                      </div>
                      <p className="text-[#472825] text-lg font-light tracking-wide">{"\u20B9"}{product.price.toLocaleString("en-IN")}</p>
                    </div>
                    <p className="text-[#96786F] text-sm font-light tracking-wide mb-4 font-agatho-narrow italic">{product.tagline}</p>
                    <div className="flex items-center text-[#D3AB80] group-hover:text-[#472825] transition-colors duration-500 text-xs uppercase tracking-[0.2em]">
                      <span>Discover</span><ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}

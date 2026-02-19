import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <section
      id="collection"
      data-testid="product-showcase"
      ref={ref}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 max-w-[1600px] mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24"
      >
        <p className="text-[#C9A96A] uppercase tracking-[0.3em] text-xs mb-6">
          The Collection
        </p>
        <h2
          data-testid="collection-title"
          className="font-agatho text-3xl sm:text-4xl lg:text-5xl text-[#E5E5E5] leading-tight"
        >
          Five Signatures
        </h2>
      </motion.div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index, inView }) {
  const isLarge = index === 0 || index === 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay: 0.15 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${isLarge ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <Link
        to={`/product/${product.id}`}
        data-testid={`product-card-${product.id}`}
        className="group block product-card-hover"
      >
        <div className="relative overflow-hidden bg-[#141414] border border-[#262626] group-hover:border-[#404040] transition-colors duration-700">
          <div className={`relative ${isLarge ? "aspect-[16/9]" : "aspect-[3/4]"} overflow-hidden`}>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover image-zoom opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/20 to-transparent" />

            {/* Availability badge */}
            <div className="absolute top-4 right-4">
              <span
                data-testid={`badge-${product.id}`}
                className={`uppercase tracking-[0.2em] text-[10px] px-3 py-1.5 ${
                  product.availability === "pre-order"
                    ? "bg-[#C9A96A]/10 text-[#C9A96A] border border-[#C9A96A]/30"
                    : "bg-[#262626]/80 text-[#525252] border border-[#262626]"
                }`}
              >
                {product.availability === "pre-order" ? "Pre-Order" : "Waitlist"}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3
                  data-testid={`product-name-${product.id}`}
                  className="font-agatho text-xl md:text-2xl text-[#E5E5E5] mb-1"
                >
                  {product.name}
                </h3>
                <p className="text-[#525252] uppercase tracking-[0.15em] text-xs">
                  {product.code}
                </p>
              </div>
              <p className="text-[#C9A96A] text-lg font-light tracking-wide">
                {"\u20B9"}{product.price.toLocaleString("en-IN")}
              </p>
            </div>

            <p className="text-[#A3A3A3] text-sm font-light tracking-wide mb-4 font-agatho-narrow italic">
              {product.tagline}
            </p>

            <div className="flex items-center text-[#525252] group-hover:text-[#C9A96A] transition-colors duration-500 text-xs uppercase tracking-[0.2em]">
              <span>Discover</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

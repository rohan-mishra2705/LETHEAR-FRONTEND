import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = "https://images.unsplash.com/photo-1752213355644-64b6900e7841?crop=entropy&cs=srgb&fm=jpg&q=85";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_git-pull-1/artifacts/0zxcohs0_Gemini_Generated_Image_gra9grgra9grgra9.png";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CAT_COLLECTION = "https://images.unsplash.com/photo-1727515546577-f7d82a47b51d?crop=entropy&cs=srgb&fm=jpg&q=85";
const CAT_CRAFT = "https://images.unsplash.com/photo-1531188929123-0cfa61e6c770?crop=entropy&cs=srgb&fm=jpg&q=85";
const CAT_LEGACY = "https://images.unsplash.com/photo-1727518154538-59e7dc479f8f?crop=entropy&cs=srgb&fm=jpg&q=85";

// Gallery items reordered: Our Story, Join Waitlist, Contact Us
const GALLERY_ITEMS = [
  { label: "Our Story", title: "Philosophy", image: "https://images.unsplash.com/photo-1764065339829-b2bba9ca509c?crop=entropy&cs=srgb&fm=jpg&q=85", to: "/story", cta: "View" },
  { label: "Reserve", title: "Join Waitlist", image: "https://images.unsplash.com/photo-1695335753902-7ef11740fbb8?crop=entropy&cs=srgb&fm=jpg&q=85", to: "/waitlist", cta: "Join" },
  { label: "Visit", title: "Contact Us", image: "https://images.unsplash.com/photo-1769674277892-2c46fa0b4216?crop=entropy&cs=srgb&fm=jpg&q=85", to: "/contact", cta: "Visit" },
];

export default function HomePage() {
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Reordered sections: 1.Hero 2.CategoryGrid(Collection,Craftsmanship,Legacy) 3.Philosophy 4.Gallery(OurStory,Waitlist,Contact) 5.Footer
  return (
    <main data-testid="home-page" className="bg-[#FFF4E2]">
      <HeroSection />
      <CategoryGrid />
      <BrandPhilosophy />
      <HorizontalGallery />
      <HomeFooter />
    </main>
  );
}

function HeroSection() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial logo animation - NO FADE OUT ON SCROLL
      gsap.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: "power3.out"
      });

      // Tagline reveal
      gsap.from(taglineRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out"
      });

      // Parallax on scroll - background only
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // REMOVED: Logo fade out on scroll - Logo now stays visible

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      data-testid="hero-section" 
      className="relative h-screen"
    >
      {/* Background - stable, no fading */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src={HERO_BG} 
          alt="" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#FFF4E2]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF4E2] via-transparent to-[#FFF4E2]/30" />
      </div>

      {/* Content - Logo stays visible, larger size, darker text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <img 
          ref={logoRef}
          src={LOGO_URL} 
          alt="LHEATHER" 
          data-testid="hero-brand-logo"
          className="h-36 sm:h-52 md:h-64 lg:h-80 xl:h-96 w-auto"
        />
        
        <p 
          ref={taglineRef}
          className="mt-10 text-[#472825] text-base md:text-lg lg:text-xl tracking-[0.35em] uppercase font-medium"
        >
          Heritage Craftsmanship
        </p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <ChevronDown size={24} className="text-[#472825]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CategoryGrid() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Order: Collection, Craftsmanship, Legacy
  const categories = [
    { title: "COLLECTION", image: CAT_COLLECTION, to: "/collection" },
    { title: "CRAFTSMANSHIP", image: CAT_CRAFT, to: "/craftsmanship" },
    { title: "THE LEGACY", image: CAT_LEGACY, to: "/story" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Card reveal
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          rotateY: i === 1 ? 0 : (i === 0 ? 15 : -15),
          rotateX: 10,
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      data-testid="category-grid" 
      className="px-3 md:px-6 py-16 md:py-24 bg-[#FFF4E2]"
      style={{ perspective: "1500px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-[1800px] mx-auto">
        {categories.map((cat, i) => (
          <Link 
            key={cat.title}
            ref={el => cardsRef.current[i] = el}
            to={cat.to} 
            data-testid={`category-${cat.title.toLowerCase().replace(/\s/g, '-')}`}
            className="group relative block overflow-hidden aspect-[3/4]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity duration-500" 
                loading="lazy" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#472825]/75 via-[#472825]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <h3 className="font-agatho text-xl md:text-2xl text-[#FFF4E2] tracking-wide font-medium">{cat.title}</h3>
              <div className="mt-3 flex items-center gap-2 text-[#FDE4BC] text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
                <span>Discover</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BrandPhilosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const words = "Heritage craftsmanship meets singular intent. What we build is more than leather. It is permanence. It is legacy.".split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal on scroll
      gsap.from(".philosophy-word", {
        opacity: 0.15,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      });

      // Scale and parallax
      gsap.from(textRef.current, {
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      data-testid="brand-philosophy" 
      className="py-28 md:py-40 lg:py-48 px-6 md:px-12 bg-[#FFF4E2]"
    >
      <div ref={textRef} className="max-w-4xl mx-auto text-center">
        <p className="text-[#96786F] uppercase tracking-[0.4em] text-xs mb-8 font-medium">Philosophy</p>
        <h2 
          data-testid="philosophy-text"
          className="font-agatho text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#3a201d] leading-relaxed mb-10 font-normal"
        >
          {words.map((word, i) => (
            <span key={i} className="philosophy-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>
        <Link 
          to="/story" 
          data-testid="philosophy-cta"
          className="group inline-flex items-center gap-2 text-[#472825] text-sm uppercase tracking-[0.25em] hover:text-[#96786F] transition-colors duration-500 font-medium"
        >
          <span>Our Story</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}

function HorizontalGallery() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  
  const scroll = (dir) => { 
    if (!scrollRef.current) return; 
    scrollRef.current.scrollBy({ 
      left: dir === "left" ? -scrollRef.current.offsetWidth * 0.6 : scrollRef.current.offsetWidth * 0.6, 
      behavior: "smooth" 
    }); 
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal gallery items
      gsap.from(".gallery-item", {
        x: 100,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      data-testid="scroll-gallery" 
      className="py-20 md:py-28 relative bg-[#FFF4E2]"
    >
      {/* Section title */}
      <div className="px-6 md:px-12 mb-12">
        <p className="text-[#96786F] uppercase tracking-[0.4em] text-xs font-medium">Explore More</p>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20">
        <button 
          data-testid="gallery-left" 
          onClick={() => scroll("left")}
          className="w-12 h-12 flex items-center justify-center border border-[#472825]/30 text-[#472825] hover:bg-[#472825] hover:text-[#FFF4E2] transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20">
        <button 
          data-testid="gallery-right" 
          onClick={() => scroll("right")}
          className="w-12 h-12 flex items-center justify-center border border-[#472825]/30 text-[#472825] hover:bg-[#472825] hover:text-[#FFF4E2] transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Gallery - Our Story, Join Waitlist, Contact Us */}
      <div 
        ref={scrollRef} 
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 snap-x snap-mandatory" 
        style={{ scrollbarWidth: "none" }}
      >
        {GALLERY_ITEMS.map((item, i) => (
          <Link 
            key={item.title}
            to={item.to} 
            data-testid={`gallery-item-${i}`} 
            className="gallery-item group relative block overflow-hidden aspect-[3/4] flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] snap-start"
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500" 
                loading="lazy" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#472825]/85 via-[#472825]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 group-hover:-translate-y-2">
              <p className="text-[#D3AB80] uppercase tracking-[0.25em] text-[10px] mb-2 font-medium">{item.label}</p>
              <h3 className="font-agatho text-2xl md:text-3xl text-[#FFF4E2] mb-4 font-medium">{item.title}</h3>
              <span className="inline-flex items-center gap-2 text-[#FDE4BC] group-hover:text-[#D3AB80] text-xs uppercase tracking-[0.2em] transition-colors duration-500 font-medium">
                {item.cta}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-500" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HomeFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content > *", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNewsletter = async (e) => {
    e.preventDefault(); 
    if (!email) return;
    try { 
      await axios.post(`${API}/newsletter`, { email }); 
      setStatus("success"); 
      setEmail(""); 
    } catch (err) { 
      setStatus(err.response?.status === 400 ? "exists" : "error"); 
    }
  };

  return (
    <footer 
      ref={containerRef}
      data-testid="home-footer" 
      className="border-t border-[#472825]/20 bg-[#FDE4BC]"
    >
      <div className="footer-content py-20 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="text-[#472825] uppercase tracking-[0.3em] text-xs mb-4 font-medium">Join the Atelier</p>
            <p className="text-[#5a3d38] text-sm tracking-wide mb-6 max-w-sm">
              New pieces, limited editions, atelier stories. No noise.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input 
                data-testid="home-newsletter-email" 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus(""); }} 
                placeholder="Your email" 
                required
                className="flex-1 bg-transparent border-b border-[#472825]/40 text-[#472825] focus:border-[#472825] focus:outline-none py-3 px-0 placeholder:text-[#96786F] transition-colors duration-300 text-sm tracking-wide" 
              />
              <button 
                data-testid="home-newsletter-btn" 
                type="submit"
                className="bg-[#472825] text-[#FFF4E2] hover:bg-[#5a3d38] transition-colors duration-500 font-medium px-6 py-3 uppercase tracking-[0.2em] text-xs whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {status === "success" && <p data-testid="home-newsletter-success" className="text-[#472825] text-xs mt-3 font-medium">Welcome to the atelier.</p>}
            {status === "exists" && <p className="text-[#5a3d38] text-xs mt-3">Already part of the atelier.</p>}
          </div>
          <div>
            <p className="text-[#472825]/70 uppercase tracking-[0.2em] text-xs mb-5 font-medium">Explore</p>
            <div className="flex flex-col gap-3">
              {[["Collection", "/collection"], ["Craftsmanship", "/craftsmanship"], ["Our Story", "/story"], ["Join the Waitlist", "/waitlist"]].map(([l, t]) => (
                <Link key={l} to={t} className="text-[#5a3d38] hover:text-[#472825] transition-colors duration-300 text-sm tracking-wide">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#472825]/70 uppercase tracking-[0.2em] text-xs mb-5 font-medium">Contact</p>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="text-[#5a3d38] hover:text-[#472825] transition-colors duration-300 text-sm tracking-wide">Get in Touch</Link>
              <a href="mailto:atelier@lheather.com" className="text-[#5a3d38] hover:text-[#472825] transition-colors duration-300 text-sm tracking-wide">atelier@lheather.com</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#5a3d38] hover:text-[#472825] transition-colors duration-300 text-sm tracking-wide">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#472825]/20 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[#5a3d38] text-xs tracking-wide">Online Atelier</span>
          <span className="text-[#5a3d38] text-xs tracking-wide font-agatho-narrow italic">"The marks become the memory."</span>
          <span className="text-[#5a3d38] text-xs">&copy; {new Date().getFullYear()} LHEATHER</span>
        </div>
      </div>
    </footer>
  );
}

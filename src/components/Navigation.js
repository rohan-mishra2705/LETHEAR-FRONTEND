import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_git-pull-1/artifacts/0zxcohs0_Gemini_Generated_Image_gra9grgra9grgra9.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Collection", to: "/collection" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "Story", to: "/story" },
  { label: "Find Your Fit", to: "/find-your-fit" },
  { label: "Waitlist", to: "/waitlist" },
  { label: "Contact", to: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        data-testid="main-navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? "nav-blur bg-[#FFF4E2]/90 border-b border-[#D3AB80]/30"
            : "bg-[#FFF4E2]/80 nav-blur"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link to="/" data-testid="logo-link" className="relative z-10">
            <img src={LOGO_URL} alt="LHEATHER" className="h-7 md:h-9 w-auto object-contain" />
          </Link>
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                className={`transition-colors duration-500 uppercase tracking-[0.18em] text-[11px] font-medium ${
                  location.pathname === link.to ? "text-[#472825]" : "text-[#96786F] hover:text-[#472825]"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
          <button data-testid="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#96786F] hover:text-[#472825] transition-colors duration-300">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div data-testid="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} className="fixed inset-0 z-[99] bg-[#FFF4E2]/98 nav-blur flex flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i, duration: 0.4 }}>
                <Link to={link.to}
                  className={`uppercase tracking-[0.3em] text-base font-light ${location.pathname === link.to ? "text-[#472825]" : "text-[#96786F]"}`}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

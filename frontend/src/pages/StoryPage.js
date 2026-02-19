import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterSection from "@/components/FooterSection";

gsap.registerPlugin(ScrollTrigger);

// Images
const HERO_LEATHER = "https://images.unsplash.com/photo-1727515192207-3dc860bfd773?crop=entropy&cs=srgb&fm=jpg&q=85";
const WORKSHOP_1 = "https://images.unsplash.com/photo-1531188929123-0cfa61e6c770?crop=entropy&cs=srgb&fm=jpg&q=85";
const WORKSHOP_2 = "https://images.unsplash.com/photo-1643968704781-df3b260df6a7?crop=entropy&cs=srgb&fm=jpg&q=85";
const LEGACY_IMG = "https://images.unsplash.com/photo-1727518154538-59e7dc479f8f?crop=entropy&cs=srgb&fm=jpg&q=85";
const DETAIL_IMG = "https://images.unsplash.com/photo-1727515546577-f7d82a47b51d?crop=entropy&cs=srgb&fm=jpg&q=85";
const CRAFT_IMG = "https://images.unsplash.com/photo-1695335753902-7ef11740fbb8?crop=entropy&cs=srgb&fm=jpg&q=85";
const JACKET_FRONT = "https://images.unsplash.com/photo-1727524366429-27de8607d5f6?crop=entropy&cs=srgb&fm=jpg&q=85";

export default function StoryPage() {
  useEffect(() => { 
    window.scrollTo(0, 0);
    
    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main data-testid="story-page" className="bg-[#FFF4E2] min-h-screen overflow-x-hidden">
      {/* ATTENTION - Immersive Hero with 3D Scroll */}
      <AttentionHero />
      
      {/* INTEREST - Horizontal Scroll Section */}
      <InterestSection />
      
      {/* DESIRE - 3D Product Reveal */}
      <DesireSection />
      
      {/* ACTION - Final CTA */}
      <ActionSection />
      
      <FooterSection />
    </main>
  );
}

// ============================================
// ATTENTION - Cinematic Hero with Scroll Effects
// ============================================
function AttentionHero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(imageRef.current, {
        yPercent: 50,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Text fade and move up
      gsap.to(textRef.current, {
        yPercent: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        }
      });

      // Letter by letter reveal on initial load
      gsap.from(".hero-letter", {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="hero-letter inline-block" style={{ transformOrigin: "bottom" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Fixed hero content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image with parallax */}
        <div 
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        >
          <img 
            src={HERO_LEATHER} 
            alt="Leather craftsmanship" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E2]/50 via-transparent to-[#FFF4E2]" />
        </div>

        {/* Hero text */}
        <div 
          ref={textRef}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
          style={{ perspective: "1000px" }}
        >
          <p className="text-[#D3AB80] uppercase tracking-[0.5em] text-xs mb-8 overflow-hidden">
            <span className="hero-letter inline-block">T</span>
            <span className="hero-letter inline-block">H</span>
            <span className="hero-letter inline-block">E</span>
            <span className="hero-letter inline-block">&nbsp;</span>
            <span className="hero-letter inline-block">L</span>
            <span className="hero-letter inline-block">H</span>
            <span className="hero-letter inline-block">E</span>
            <span className="hero-letter inline-block">A</span>
            <span className="hero-letter inline-block">T</span>
            <span className="hero-letter inline-block">H</span>
            <span className="hero-letter inline-block">E</span>
            <span className="hero-letter inline-block">R</span>
            <span className="hero-letter inline-block">&nbsp;</span>
            <span className="hero-letter inline-block">S</span>
            <span className="hero-letter inline-block">T</span>
            <span className="hero-letter inline-block">O</span>
            <span className="hero-letter inline-block">R</span>
            <span className="hero-letter inline-block">Y</span>
          </p>
          
          <h1 
            data-testid="story-title"
            className="font-agatho text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] text-[#472825] leading-[0.9] text-center overflow-hidden"
          >
            <div className="overflow-hidden">
              {splitText("What If Your")}
            </div>
            <div className="overflow-hidden mt-2">
              {splitText("Jacket")}
            </div>
            <div className="overflow-hidden mt-2 text-[#D3AB80]">
              {splitText("Outlived You?")}
            </div>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-20 flex flex-col items-center gap-4"
          >
            <span className="text-[#5a3d38] text-xs uppercase tracking-[0.3em]">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown size={20} className="text-[#5a3d38]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// INTEREST - Horizontal Scroll Storytelling
// ============================================
function InterestSection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollRef.current;
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animate each panel as it comes into view
      gsap.utils.toArray(".scroll-panel").forEach((panel, i) => {
        gsap.from(panel.querySelector(".panel-content"), {
          opacity: 0,
          y: 50,
          scale: 0.9,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getById("horizontalScroll"),
            start: "left center",
            end: "center center",
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      label: "The Problem",
      title: "Fashion Became Fast",
      subtitle: "Quality Became Optional",
      description: "The average leather jacket today lasts 3-5 years. A century ago, they lasted generations.",
      image: WORKSHOP_1,
      stat: { value: "3-5", unit: "Years", label: "Average jacket lifespan today" }
    },
    {
      label: "The Realization", 
      title: "We Watched",
      subtitle: "As Mastery Disappeared",
      description: "Mass production replaced craftsmanship. Synthetic replaced genuine. New replaced lasting.",
      image: WORKSHOP_2,
      stat: { value: "90", unit: "%", label: "Of leather goods mass-produced" }
    },
    {
      label: "The Question",
      title: "What If We",
      subtitle: "Refused To Participate?",
      description: "What if we built for the rider who measures quality in decades, not seasons?",
      image: DETAIL_IMG,
      stat: { value: "50+", unit: "Years", label: "Built to last" }
    },
    {
      label: "The Answer",
      title: "LHEATHER",
      subtitle: "Was Born",
      description: "A singular focus: create something that outlasts its maker. No seasons. No trends.",
      image: LEGACY_IMG,
      stat: { value: "2024", unit: "", label: "Chennai, India" }
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#472825]">
      <div 
        ref={scrollRef}
        className="flex h-screen"
        style={{ width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel, index) => (
          <div 
            key={index}
            className="scroll-panel relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img 
                src={panel.image} 
                alt={panel.title}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#472825] via-[#472825]/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="panel-content relative z-10 max-w-6xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#D3AB80] uppercase tracking-[0.4em] text-xs mb-6">
                  {String(index + 1).padStart(2, '0')} — {panel.label}
                </p>
                <h2 className="font-agatho text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFF4E2] leading-[0.95] mb-4">
                  {panel.title}
                </h2>
                <h3 className="font-agatho text-2xl sm:text-3xl md:text-4xl text-[#D3AB80] leading-tight mb-8">
                  {panel.subtitle}
                </h3>
                <p className="text-[#FDE4BC]/70 text-lg leading-relaxed max-w-md">
                  {panel.description}
                </p>
              </div>

              {/* Stat card */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-[#FFF4E2]/10 backdrop-blur-sm border border-[#D3AB80]/30 p-12 text-center">
                  <p className="font-agatho text-6xl md:text-8xl text-[#FFF4E2] mb-2">
                    {panel.stat.value}
                    <span className="text-[#D3AB80] text-2xl md:text-3xl ml-2">{panel.stat.unit}</span>
                  </p>
                  <p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs mt-4">
                    {panel.stat.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Panel number */}
            <div className="absolute bottom-8 right-8 text-[#FFF4E2]/10 font-agatho text-[15rem] leading-none pointer-events-none">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// DESIRE - 3D Product Showcase with Scroll
// ============================================
function DesireSection() {
  const containerRef = useRef(null);
  const jacketRef = useRef(null);
  const textRefs = useRef([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scale jacket
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      // Jacket rotation and scale animation
      tl.fromTo(jacketRef.current, 
        { 
          scale: 0.5, 
          rotateY: -30,
          rotateX: 15,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1 
        }
      )
      .to(jacketRef.current, {
        scale: 1.2,
        rotateY: 15,
        duration: 1
      })
      .to(jacketRef.current, {
        scale: 1,
        rotateY: 0,
        rotateX: -10,
        duration: 1
      });

      // Text reveals
      textRefs.current.forEach((ref, i) => {
        gsap.from(ref, {
          opacity: 0,
          y: 100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${25 * i}% center`,
            end: `${25 * (i + 1)}% center`,
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: "Single-Origin Leather", desc: "Hand-selected from heritage tanneries" },
    { title: "One Craftsman", desc: "40–50 hours per jacket" },
    { title: "50 Per Year", desc: "Limited by craft, not marketing" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative h-screen bg-[#FDE4BC] overflow-hidden"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23472825' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Jacket Image */}
          <div 
            ref={jacketRef}
            className="relative aspect-[3/4] max-h-[70vh] mx-auto lg:mx-0"
            style={{ 
              perspective: "1500px",
              transformStyle: "preserve-3d",
            }}
          >
            <img 
              src={JACKET_FRONT}
              alt="The Legacy Jacket"
              className="w-full h-full object-cover shadow-2xl"
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "0 50px 100px rgba(71,40,37,0.3), 0 20px 50px rgba(71,40,37,0.2)"
              }}
            />
            
            {/* Floating badge */}
            <div 
              className="absolute -bottom-4 -right-4 bg-[#472825] text-[#FFF4E2] px-6 py-4"
              style={{ transform: "translateZ(50px)" }}
            >
              <p className="font-agatho text-xl">₹28,000</p>
              <p className="text-[#D3AB80] text-xs uppercase tracking-wider">The Legacy</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-12">
            <div>
              <p className="text-[#D3AB80] uppercase tracking-[0.4em] text-xs mb-4">The LHEATHER Difference</p>
              <h2 className="font-agatho text-4xl sm:text-5xl md:text-6xl text-[#472825] leading-[0.95]">
                We Build For<br />
                <span className="italic">The Long Game</span>
              </h2>
            </div>

            {features.map((feature, i) => (
              <div 
                key={feature.title}
                ref={el => textRefs.current[i] = el}
                className="border-l-2 border-[#D3AB80] pl-6"
              >
                <h3 className="font-agatho text-2xl text-[#472825] mb-2">{feature.title}</h3>
                <p className="text-[#96786F]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ACTION - Final CTA with Scroll Reveal
// ============================================
function ActionSection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.from(contentRef.current.children, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Background parallax
      gsap.to(".action-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#472825] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="action-bg absolute inset-0">
        <img 
          src={CRAFT_IMG}
          alt="Craftsman"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#472825]/80 to-[#472825]" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <p className="text-[#D3AB80] uppercase tracking-[0.5em] text-xs mb-8">
          Your Turn
        </p>
        
        <h2 className="font-agatho text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFF4E2] leading-[0.95] mb-8">
          Ready to Own<br />
          <span className="text-[#D3AB80]">Something Permanent?</span>
        </h2>
        
        <p className="text-[#FDE4BC]/70 text-lg md:text-xl max-w-xl mx-auto mb-12">
          Join the waitlist for our next collection drop, or explore our current pieces.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Link 
            to="/waitlist"
            className="group relative inline-flex items-center gap-3 bg-[#FFF4E2] text-[#472825] hover:bg-[#D3AB80] transition-all duration-500 px-10 py-5 uppercase tracking-[0.2em] text-sm overflow-hidden"
          >
            <span className="relative z-10">Join the Waitlist</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link 
            to="/collection"
            className="group inline-flex items-center gap-3 border border-[#D3AB80] text-[#FFF4E2] hover:bg-[#FFF4E2]/10 transition-all duration-500 px-10 py-5 uppercase tracking-[0.2em] text-sm"
          >
            <span>View Collection</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-[#D3AB80]/30 pt-12">
          {[
            { value: "50+", label: "Year Build Quality" },
            { value: "40-50", label: "Hours Per Jacket" },
            { value: "1", label: "Craftsman Per Piece" },
            { value: "∞", label: "Lifetime Support" }
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-agatho text-3xl md:text-4xl text-[#FFF4E2] mb-2">{item.value}</p>
              <p className="text-[#D3AB80] text-xs uppercase tracking-[0.15em]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative quote */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="font-agatho-narrow italic text-[#D3AB80]/50 text-sm tracking-wide">
          "The marks become the memory."
        </p>
      </div>
    </section>
  );
}

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, Html, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Jacket Layer Component
function JacketLayer({ 
  position = [0, 0, 0], 
  color = "#472825", 
  explodeOffset = [0, 0, 0],
  rotationOffset = [0, 0, 0],
  scrollProgress = 0,
  children,
  opacity = 1,
  metalness = 0.1,
  roughness = 0.8
}) {
  const meshRef = useRef();
  
  // Calculate exploded position based on scroll
  const explodedPosition = useMemo(() => {
    return [
      position[0] + explodeOffset[0] * scrollProgress,
      position[1] + explodeOffset[1] * scrollProgress,
      position[2] + explodeOffset[2] * scrollProgress,
    ];
  }, [position, explodeOffset, scrollProgress]);

  const explodedRotation = useMemo(() => {
    return [
      rotationOffset[0] * scrollProgress,
      rotationOffset[1] * scrollProgress,
      rotationOffset[2] * scrollProgress,
    ];
  }, [rotationOffset, scrollProgress]);

  return (
    <group position={explodedPosition} rotation={explodedRotation}>
      {children || (
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={color} 
            metalness={metalness}
            roughness={roughness}
            transparent
            opacity={opacity}
          />
        </mesh>
      )}
    </group>
  );
}

// Main Jacket Body - Leather Exterior
function LeatherExterior({ scrollProgress }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + scrollProgress * Math.PI * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <JacketLayer 
        position={[0, 0, 0]} 
        color="#3a201d"
        explodeOffset={[0, 0, -1.5]}
        scrollProgress={scrollProgress}
        metalness={0.2}
        roughness={0.7}
      >
        <mesh castShadow>
          {/* Torso */}
          <boxGeometry args={[2.2, 2.8, 0.8]} />
          <meshStandardMaterial 
            color="#3a201d" 
            metalness={0.15}
            roughness={0.75}
          />
        </mesh>
      </JacketLayer>

      {/* Left sleeve */}
      <JacketLayer 
        position={[-1.4, 0.2, 0]} 
        color="#472825"
        explodeOffset={[-1.2, 0.3, -0.5]}
        rotationOffset={[0, 0, -0.3]}
        scrollProgress={scrollProgress}
      >
        <mesh castShadow rotation={[0, 0, 0.15]}>
          <boxGeometry args={[1.2, 2.4, 0.6]} />
          <meshStandardMaterial 
            color="#472825" 
            metalness={0.15}
            roughness={0.75}
          />
        </mesh>
      </JacketLayer>

      {/* Right sleeve */}
      <JacketLayer 
        position={[1.4, 0.2, 0]} 
        color="#472825"
        explodeOffset={[1.2, 0.3, -0.5]}
        rotationOffset={[0, 0, 0.3]}
        scrollProgress={scrollProgress}
      >
        <mesh castShadow rotation={[0, 0, -0.15]}>
          <boxGeometry args={[1.2, 2.4, 0.6]} />
          <meshStandardMaterial 
            color="#472825" 
            metalness={0.15}
            roughness={0.75}
          />
        </mesh>
      </JacketLayer>

      {/* Collar */}
      <JacketLayer 
        position={[0, 1.6, 0.1]} 
        color="#2a1815"
        explodeOffset={[0, 1, -0.8]}
        scrollProgress={scrollProgress}
      >
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.5, 0.9]} />
          <meshStandardMaterial 
            color="#2a1815" 
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      </JacketLayer>
    </group>
  );
}

// Inner Lining Layer
function InnerLining({ scrollProgress }) {
  return (
    <JacketLayer 
      position={[0, 0, 0.35]} 
      color="#D3AB80"
      explodeOffset={[0, 0, 1.5]}
      scrollProgress={scrollProgress}
      opacity={0.3 + scrollProgress * 0.7}
    >
      <mesh>
        <boxGeometry args={[2, 2.6, 0.1]} />
        <meshStandardMaterial 
          color="#D3AB80" 
          metalness={0.05}
          roughness={0.9}
          transparent
          opacity={0.3 + scrollProgress * 0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Lining label */}
      {scrollProgress > 0.3 && (
        <Html position={[0, 0.5, 0.1]} center>
          <div className="bg-[#472825] text-[#FFF4E2] px-3 py-1 text-xs font-medium tracking-wider whitespace-nowrap opacity-90">
            VISCOSE LINING
          </div>
        </Html>
      )}
    </JacketLayer>
  );
}

// Hardware Components (Zippers, Buttons)
function Hardware({ scrollProgress }) {
  const hardwareColor = "#B8860B"; // Gold/brass color

  return (
    <group>
      {/* Main zipper */}
      <JacketLayer 
        position={[0, 0, 0.45]} 
        color={hardwareColor}
        explodeOffset={[0, 0, 2.5]}
        scrollProgress={scrollProgress}
      >
        <group>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[0, -1.2 + i * 0.35, 0]} castShadow>
              <boxGeometry args={[0.15, 0.1, 0.08]} />
              <meshStandardMaterial 
                color={hardwareColor} 
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          ))}
          {/* Zipper pull */}
          <mesh position={[0, 1.5, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.25, 0.1]} />
            <meshStandardMaterial 
              color={hardwareColor} 
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        </group>
        {scrollProgress > 0.5 && (
          <Html position={[0.5, 0, 0.1]} center>
            <div className="bg-[#472825] text-[#FFF4E2] px-3 py-1 text-xs font-medium tracking-wider whitespace-nowrap opacity-90">
              YKK BRASS ZIPPER
            </div>
          </Html>
        )}
      </JacketLayer>

      {/* Pocket zippers */}
      <JacketLayer 
        position={[-0.6, -0.5, 0.45]} 
        color={hardwareColor}
        explodeOffset={[-0.8, -0.3, 2]}
        rotationOffset={[0, 0, 0.2]}
        scrollProgress={scrollProgress}
      >
        <mesh rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.6, 0.06, 0.05]} />
          <meshStandardMaterial 
            color={hardwareColor} 
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </JacketLayer>

      <JacketLayer 
        position={[0.6, -0.5, 0.45]} 
        color={hardwareColor}
        explodeOffset={[0.8, -0.3, 2]}
        rotationOffset={[0, 0, -0.2]}
        scrollProgress={scrollProgress}
      >
        <mesh rotation={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.6, 0.06, 0.05]} />
          <meshStandardMaterial 
            color={hardwareColor} 
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </JacketLayer>

      {/* Snap buttons on collar */}
      {[[-0.4, 1.6, 0.5], [0.4, 1.6, 0.5]].map((pos, i) => (
        <JacketLayer 
          key={i}
          position={pos} 
          color={hardwareColor}
          explodeOffset={[i === 0 ? -0.5 : 0.5, 0.8, 1.8]}
          scrollProgress={scrollProgress}
        >
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
            <meshStandardMaterial 
              color={hardwareColor} 
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        </JacketLayer>
      ))}
    </group>
  );
}

// Stitching Details (visible on explode)
function StitchingDetails({ scrollProgress }) {
  if (scrollProgress < 0.2) return null;
  
  const opacity = Math.min((scrollProgress - 0.2) / 0.3, 1);
  
  return (
    <group>
      {/* Seam lines represented as thin boxes */}
      {[
        { pos: [-1.1, 0, 0], rot: [0, 0, 0], size: [0.02, 2.8, 0.82] },
        { pos: [1.1, 0, 0], rot: [0, 0, 0], size: [0.02, 2.8, 0.82] },
        { pos: [0, -1.35, 0], rot: [0, 0, 0], size: [2.2, 0.02, 0.82] },
      ].map((seam, i) => (
        <JacketLayer 
          key={i}
          position={seam.pos} 
          color="#1a0f0d"
          explodeOffset={[0, 0, -1.6]}
          scrollProgress={scrollProgress}
          opacity={opacity * 0.7}
        >
          <mesh rotation={seam.rot}>
            <boxGeometry args={seam.size} />
            <meshStandardMaterial 
              color="#1a0f0d"
              transparent
              opacity={opacity * 0.7}
            />
          </mesh>
        </JacketLayer>
      ))}
      
      {scrollProgress > 0.4 && (
        <Html position={[-1.5, 0, 0]} center>
          <div className="bg-[#472825] text-[#FFF4E2] px-3 py-1 text-xs font-medium tracking-wider whitespace-nowrap opacity-90">
            DOUBLE STITCHED
          </div>
        </Html>
      )}
    </group>
  );
}

// Scene Controller with Scroll
function JacketScene({ scrollProgress }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Adjust camera based on scroll
    camera.position.z = 6 - scrollProgress * 1.5;
    camera.position.y = scrollProgress * 1;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
      <spotLight 
        position={[0, 5, 0]} 
        intensity={0.5} 
        angle={0.5}
        penumbra={1}
      />

      {/* Jacket Components */}
      <group position={[0, -0.5, 0]}>
        <LeatherExterior scrollProgress={scrollProgress} />
        <InnerLining scrollProgress={scrollProgress} />
        <Hardware scrollProgress={scrollProgress} />
        <StitchingDetails scrollProgress={scrollProgress} />
      </group>

      {/* Environment */}
      <Environment preset="studio" />
    </>
  );
}

// Main Component with Scroll Container
export default function Jacket3DExplode({ className = "" }) {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate progress from when element enters viewport to when it leaves
      const startTrigger = windowHeight;
      const endTrigger = -elementHeight;
      const totalDistance = startTrigger - endTrigger;
      const currentPosition = startTrigger - rect.top;
      
      const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <JacketScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Standalone page version with UI
export function Jacket3DPage() {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layers = [
    { name: "Exterior Leather", desc: "Full-grain cowhide, hand-selected", progress: 0 },
    { name: "Inner Lining", desc: "Breathable viscose blend", progress: 0.3 },
    { name: "Hardware", desc: "YKK brass zippers & snaps", progress: 0.5 },
    { name: "Stitching", desc: "Double-stitched stress points", progress: 0.7 },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#FFF4E2]">
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 6], fov: 45 }}
          style={{ background: "linear-gradient(to bottom, #FFF4E2, #FDE4BC)" }}
        >
          <Suspense fallback={null}>
            <JacketScene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-20 hidden md:block">
        <div className="space-y-4">
          {layers.map((layer, i) => (
            <div 
              key={layer.name}
              className={`flex items-center gap-3 transition-opacity duration-500 ${
                scrollProgress >= layer.progress ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                scrollProgress >= layer.progress ? "bg-[#472825]" : "bg-[#D3AB80]"
              }`} />
              <div className="text-right">
                <p className={`text-xs font-medium transition-colors duration-300 ${
                  scrollProgress >= layer.progress ? "text-[#472825]" : "text-[#96786F]"
                }`}>
                  {layer.name}
                </p>
                {scrollProgress >= layer.progress && (
                  <motion.p 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] text-[#96786F]"
                  >
                    {layer.desc}
                  </motion.p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 pointer-events-none">
        {/* Hero */}
        <section className="h-screen flex items-center justify-center">
          <div className="text-center pointer-events-auto">
            <p className="text-[#96786F] uppercase tracking-[0.4em] text-xs mb-4">Anatomy of</p>
            <h1 className="font-agatho text-5xl md:text-7xl text-[#472825] mb-4">The Legacy</h1>
            <p className="text-[#96786F] text-sm">Scroll to explore the layers</p>
          </div>
        </section>

        {/* Layer sections */}
        {layers.map((layer, i) => (
          <section key={layer.name} className="h-screen flex items-center">
            <div className={`max-w-md mx-auto px-8 pointer-events-auto ${i % 2 === 0 ? "ml-8 md:ml-20" : "mr-8 md:mr-20 ml-auto text-right"}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-2">0{i + 1}</p>
                <h2 className="font-agatho text-3xl md:text-4xl text-[#472825] mb-4">{layer.name}</h2>
                <p className="text-[#96786F] text-sm leading-relaxed">{layer.desc}</p>
              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

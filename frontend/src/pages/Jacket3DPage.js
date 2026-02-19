import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import * as THREE from "three";
import FooterSection from "@/components/FooterSection";

// Vanilla Three.js Jacket Scene
function useJacketScene(containerRef, scrollProgress) {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const jacketGroupRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFF4E2);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 8, 0);
    spotLight.angle = 0.6;
    spotLight.penumbra = 1;
    scene.add(spotLight);

    // Materials
    const leatherMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3a201d, 
      metalness: 0.15, 
      roughness: 0.75 
    });
    const leatherDarkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x472825, 
      metalness: 0.1, 
      roughness: 0.8 
    });
    const collarMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2a1815, 
      metalness: 0.2, 
      roughness: 0.7 
    });
    const liningMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD3AB80, 
      metalness: 0.05, 
      roughness: 0.9,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const brassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xB8860B, 
      metalness: 0.95, 
      roughness: 0.15 
    });

    // Create jacket group
    const jacketGroup = new THREE.Group();
    jacketGroup.position.set(0, -0.5, 0);
    jacketGroup.scale.set(0.9, 0.9, 0.9);
    jacketGroupRef.current = jacketGroup;

    // Main body
    const bodyGroup = new THREE.Group();
    const bodyGeometry = new THREE.BoxGeometry(2.4, 3, 0.9);
    const body = new THREE.Mesh(bodyGeometry, leatherMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    bodyGroup.add(body);

    const panelGeometry = new THREE.BoxGeometry(0.9, 2.8, 0.05);
    const leftPanel = new THREE.Mesh(panelGeometry, leatherDarkMaterial);
    leftPanel.position.set(-0.5, 0, 0.46);
    leftPanel.castShadow = true;
    bodyGroup.add(leftPanel);

    const rightPanel = new THREE.Mesh(panelGeometry, leatherDarkMaterial);
    rightPanel.position.set(0.5, 0, 0.46);
    rightPanel.castShadow = true;
    bodyGroup.add(rightPanel);
    bodyGroup.userData = { explodeOffset: [0, 0, -2] };
    jacketGroup.add(bodyGroup);

    // Left sleeve
    const leftSleeveGroup = new THREE.Group();
    leftSleeveGroup.position.set(-1.6, 0.1, 0);
    const sleeveGeometry = new THREE.BoxGeometry(1.4, 2.6, 0.7);
    const leftSleeve = new THREE.Mesh(sleeveGeometry, leatherDarkMaterial);
    leftSleeve.rotation.set(0, 0, 0.2);
    leftSleeve.castShadow = true;
    leftSleeveGroup.add(leftSleeve);
    const cuffGeometry = new THREE.BoxGeometry(1.5, 0.3, 0.75);
    const leftCuff = new THREE.Mesh(cuffGeometry, collarMaterial);
    leftCuff.position.set(0, -1.4, 0);
    leftCuff.castShadow = true;
    leftSleeveGroup.add(leftCuff);
    leftSleeveGroup.userData = { explodeOffset: [-1.5, 0.4, -1], rotationOffset: [0, 0, -0.4] };
    jacketGroup.add(leftSleeveGroup);

    // Right sleeve
    const rightSleeveGroup = new THREE.Group();
    rightSleeveGroup.position.set(1.6, 0.1, 0);
    const rightSleeve = new THREE.Mesh(sleeveGeometry, leatherDarkMaterial);
    rightSleeve.rotation.set(0, 0, -0.2);
    rightSleeve.castShadow = true;
    rightSleeveGroup.add(rightSleeve);
    const rightCuff = new THREE.Mesh(cuffGeometry, collarMaterial);
    rightCuff.position.set(0, -1.4, 0);
    rightCuff.castShadow = true;
    rightSleeveGroup.add(rightCuff);
    rightSleeveGroup.userData = { explodeOffset: [1.5, 0.4, -1], rotationOffset: [0, 0, 0.4] };
    jacketGroup.add(rightSleeveGroup);

    // Collar
    const collarGroup = new THREE.Group();
    collarGroup.position.set(0, 1.7, 0.15);
    const collarGeometry = new THREE.BoxGeometry(2, 0.6, 1);
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.castShadow = true;
    collarGroup.add(collar);
    const collarFlapGeometry = new THREE.BoxGeometry(0.7, 0.5, 0.15);
    const leftFlap = new THREE.Mesh(collarFlapGeometry, collarMaterial);
    leftFlap.position.set(-0.6, 0.1, 0.4);
    leftFlap.rotation.set(0.3, 0, -0.2);
    leftFlap.castShadow = true;
    collarGroup.add(leftFlap);
    const rightFlap = new THREE.Mesh(collarFlapGeometry, collarMaterial);
    rightFlap.position.set(0.6, 0.1, 0.4);
    rightFlap.rotation.set(0.3, 0, 0.2);
    rightFlap.castShadow = true;
    collarGroup.add(rightFlap);
    collarGroup.userData = { explodeOffset: [0, 1.2, -1.2] };
    jacketGroup.add(collarGroup);

    // Lining
    const liningGroup = new THREE.Group();
    liningGroup.position.set(0, 0, 0.4);
    const liningGeometry = new THREE.BoxGeometry(2.2, 2.8, 0.08);
    const lining = new THREE.Mesh(liningGeometry, liningMaterial);
    liningGroup.add(lining);
    liningGroup.userData = { explodeOffset: [0, 0, 2], isSoft: true };
    jacketGroup.add(liningGroup);

    // Hardware - Main zipper
    const hardwareGroup = new THREE.Group();
    hardwareGroup.position.set(0, 0, 0.5);
    for (let i = 0; i < 12; i++) {
      const toothGeometry = new THREE.BoxGeometry(0.18, 0.08, 0.06);
      const tooth = new THREE.Mesh(toothGeometry, brassMaterial);
      tooth.position.set(0, -1.3 + i * 0.25, 0);
      tooth.castShadow = true;
      hardwareGroup.add(tooth);
    }
    const pullGeometry = new THREE.BoxGeometry(0.15, 0.35, 0.12);
    const pull = new THREE.Mesh(pullGeometry, brassMaterial);
    pull.position.set(0, 1.6, 0.08);
    pull.castShadow = true;
    hardwareGroup.add(pull);
    hardwareGroup.userData = { explodeOffset: [0, 0, 3] };
    jacketGroup.add(hardwareGroup);

    scene.add(jacketGroup);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Rotate jacket gently
      if (jacketGroup) {
        jacketGroup.rotation.y = Math.sin(Date.now() * 0.0003) * 0.15;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update based on scroll
  useEffect(() => {
    if (!jacketGroupRef.current || !cameraRef.current) return;

    const jacketGroup = jacketGroupRef.current;
    const camera = cameraRef.current;

    // Update camera
    camera.position.z = 7 - scrollProgress * 2;
    camera.position.y = scrollProgress * 1.5;
    camera.position.x = Math.sin(scrollProgress * Math.PI) * 1;

    // Update explode effect
    jacketGroup.children.forEach(child => {
      if (child.userData.explodeOffset) {
        const [x, y, z] = child.userData.explodeOffset;
        child.position.x = (child.userData.originalX || child.position.x) + x * scrollProgress;
        child.position.y = (child.userData.originalY || child.position.y) + y * scrollProgress;
        child.position.z = (child.userData.originalZ || child.position.z) + z * scrollProgress;
        
        if (!child.userData.originalX) {
          child.userData.originalX = child.position.x - x * scrollProgress;
          child.userData.originalY = child.position.y - y * scrollProgress;
          child.userData.originalZ = child.position.z - z * scrollProgress;
        }
      }
      if (child.userData.rotationOffset) {
        const [rx, ry, rz] = child.userData.rotationOffset;
        child.rotation.x = rx * scrollProgress;
        child.rotation.y = ry * scrollProgress;
        child.rotation.z = rz * scrollProgress;
      }
      if (child.userData.isSoft && child.children[0]) {
        child.children[0].material.opacity = 0.2 + scrollProgress * 0.8;
      }
    });

    // Add rotation based on scroll
    jacketGroup.rotation.y += scrollProgress * Math.PI * 0.3;
  }, [scrollProgress]);
}

// Main Page
export default function Jacket3DPage() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useJacketScene(containerRef, scrollProgress);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const layers = [
    { name: "Full-Grain Leather", desc: "Hand-selected cowhide, naturally tanned for durability.", icon: "01" },
    { name: "Viscose Lining", desc: "Breathable, temperature-regulating interior.", icon: "02" },
    { name: "Brass Hardware", desc: "YKK zippers, custom snaps built to last.", icon: "03" },
    { name: "Double Stitching", desc: "Reinforced seams at every stress point.", icon: "04" },
  ];

  return (
    <main className="bg-[#FFF4E2] min-h-[500vh] relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-[#FFF4E2] flex items-center justify-center">
          <div className="text-[#472825] text-sm font-medium tracking-wider">Loading 3D Experience...</div>
        </div>
      )}

      {/* 3D Canvas Container */}
      <div ref={containerRef} className="fixed inset-0 z-0" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#FDE4BC] z-50">
        <div className="h-full bg-[#472825]" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* Layer Indicator */}
      <div className="fixed top-1/2 right-6 md:right-10 -translate-y-1/2 z-20 hidden md:block">
        <div className="space-y-6">
          {layers.map((layer, i) => {
            const layerProgress = i / (layers.length - 1);
            const isActive = scrollProgress >= layerProgress - 0.1;
            const isCurrent = scrollProgress >= layerProgress - 0.1 && scrollProgress < layerProgress + 0.2;
            return (
              <div key={layer.name} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-30"}`}>
                <div className={`w-8 h-8 flex items-center justify-center border-2 text-xs font-medium ${
                  isCurrent ? "border-[#472825] bg-[#472825] text-[#FFF4E2]" : isActive ? "border-[#472825] text-[#472825]" : "border-[#D3AB80] text-[#D3AB80]"
                }`}>{layer.icon}</div>
                <div className="text-right max-w-[150px]">
                  <div className={`text-xs font-medium ${isActive ? "text-[#472825]" : "text-[#96786F]"}`}>{layer.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pointer-events-none">
        {/* Hero */}
        <section className="h-screen flex items-center justify-center">
          <div className="text-center pointer-events-auto px-6">
            <div className="text-[#96786F] uppercase tracking-[0.5em] text-xs mb-4">Anatomy of Excellence</div>
            <h1 className="font-agatho text-5xl md:text-7xl lg:text-8xl text-[#472825] mb-6">The Legacy</h1>
            <div className="text-[#5a3d38] text-sm md:text-base max-w-md mx-auto mb-8">
              40–50 hours of craftsmanship. Scroll to explore what goes into building a jacket meant to outlive you.
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="text-[#96786F] text-xs uppercase tracking-[0.3em]">Scroll to Explore</div>
              <ArrowDown size={20} className="text-[#96786F] animate-bounce" />
            </div>
          </div>
        </section>

        {/* Layer Sections */}
        {layers.map((layer, i) => (
          <section key={layer.name} className="h-screen flex items-center">
            <div className={`max-w-sm pointer-events-auto px-6 md:px-12 ${i % 2 === 0 ? "mr-auto" : "ml-auto text-right"}`}>
              <div className="text-[#D3AB80] text-6xl md:text-8xl font-agatho opacity-30">{layer.icon}</div>
              <h2 className="font-agatho text-2xl md:text-3xl lg:text-4xl text-[#472825] mb-4 -mt-4">{layer.name}</h2>
              <div className="text-[#5a3d38] text-sm md:text-base leading-relaxed">{layer.desc}</div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="h-screen flex items-center justify-center">
          <div className="text-center pointer-events-auto px-6">
            <h2 className="font-agatho text-3xl md:text-5xl text-[#472825] mb-6">
              Every Layer. Every Detail.<br /><span className="text-[#D3AB80]">Built for Decades.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/collection" className="group inline-flex items-center gap-3 bg-[#472825] text-[#FFF4E2] hover:bg-[#5a3d38] px-8 py-4 uppercase tracking-[0.2em] text-sm">
                View Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/waitlist" className="group inline-flex items-center gap-3 border border-[#472825] text-[#472825] hover:bg-[#472825] hover:text-[#FFF4E2] px-8 py-4 uppercase tracking-[0.2em] text-sm">
                Join Waitlist <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-20 bg-[#FFF4E2]">
        <FooterSection />
      </div>
    </main>
  );
}

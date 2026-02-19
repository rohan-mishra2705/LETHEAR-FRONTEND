import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import CollectionPage from "@/pages/CollectionPage";
import CraftsmanshipPage from "@/pages/CraftsmanshipPage";
import StoryPage from "@/pages/StoryPage";
import WaitlistPage from "@/pages/WaitlistPage";
import ContactPage from "@/pages/ContactPage";
import FindYourFitPage from "@/pages/FindYourFitPage";
import ProductPage from "@/pages/ProductPage";
import AdminPage from "@/pages/AdminPage";
import Jacket3DPage from "@/pages/Jacket3DPage";
import Navigation from "@/components/Navigation";

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="grain-overlay min-h-screen">
      <div
        className="cursor-glow hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/find-your-fit" element={<FindYourFitPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/jacket-3d" element={<Jacket3DPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import HeroTitle from "@/components/HeroTitle";
import ImageMarquee from "@/components/ImageMarquee";
import ProjectShowcase from "@/components/ProjectShowcase";
import AIArchiveSection from "@/components/AIArchiveSection";
import ServicesModule from "@/components/ServicesModule";
import SliderWithText from "@/components/SliderWithText";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import AboutDrawer from "@/components/AboutDrawer";
import { opinionStormData } from "@/data/opinion-storm";
import { sensitiveLightData } from "@/data/sensitive-light";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Skip Lenis when drawer is open
      autoResize: true,
    });

    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    function raf(time: number) {
      // Check if drawer is open; if so, skip Lenis raf
      if (document.documentElement.dataset.drawerOpen === "true") {
        requestAnimationFrame(raf);
        return;
      }
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main
      id="swup"
      className="swup-wrap transition-slide page animate-ready bg-background"
    >
      <Header onAboutClick={() => setAboutOpen(true)} />
      <HeroTitle />

      <ImageMarquee />

      <ThemeToggle />
      <div id="storm">
        <ProjectShowcase data={opinionStormData} />
      </div>
      <div id="light">
        <ProjectShowcase data={sensitiveLightData} />
      </div>
      <div id="aigc">
        <AIArchiveSection />
      </div>
      <div id="skills">
        <ServicesModule />
      </div>
      <div id="tools">
        <SliderWithText />
      </div>
      <Footer />

      {aboutOpen && <AboutDrawer onClose={() => setAboutOpen(false)} />}
    </main>
  );
}

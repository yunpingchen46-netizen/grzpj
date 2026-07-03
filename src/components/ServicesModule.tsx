"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CapabilityDrawer from "@/components/CapabilityDrawer";
import { CAPABILITIES } from "@/data/capabilities";

export default function ServicesModule() {
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];

  return (
    <section className="services_module py-[80px] md:py-[120px] bg-background text-foreground">
      <div className="max-w-[1600px] mx-auto px-[8px]">
        <h2 className="font-[family-name:var(--font-text)] text-[clamp(36px,3.8vw,56px)] font-medium leading-[0.95] tracking-[-0.02em] mb-[100px]" id="skills-section">
          能力领域
        </h2>

        <div className="relative">
          {/* LEFT: Preview */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[720px] aspect-video pointer-events-none z-10 hidden md:block">
            <div className="absolute inset-0 bg-neutral-200 dark:bg-[#111] overflow-hidden">
              {active.preview.src && !active.preview.placeholder ? (
                <img src={active.preview.src} alt={active.preview.alt || active.title} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[#0a0a0a]" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)" }} />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white/[0.05] text-sm tracking-[0.3em]">{active.title} · 占位素材</span>
                  </div>
                </>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-[11px] tracking-[0.3em] text-red-500 mb-1">{active.index} / {active.englishLabel}</p>
              <h3 className="text-[24px] md:text-[32px] font-[family-name:var(--font-heading)] font-medium mb-2">{active.title}</h3>
              <p className="text-[13px] md:text-[14px] text-foreground/50 leading-relaxed mb-3 max-w-lg">{active.description}</p>
              <p className="text-[11px] text-foreground/25 mb-2">{active.tools.join(" · ")}</p>
              <button className="text-[12px] text-foreground/40 hover:text-red-500 transition-colors pointer-events-auto" onClick={() => setDrawerOpen(true)}>
                查看 {active.caseStudy ? "AI 创作与开发能力" : `${active.items.length} 个作品`} →
              </button>
            </div>
          </div>

          {/* RIGHT: Text List */}
          <div className="flex flex-col items-end">
            {CAPABILITIES.map((cap) => (
              <div key={cap.id} className="group flex items-center py-1.5 md:py-2 cursor-pointer"
                onMouseEnter={() => setActiveId(cap.id)}
                onClick={() => { setActiveId(cap.id); setDrawerOpen(true); }}>
                <span className={`font-[family-name:var(--font-heading)] text-[clamp(28px,3.5vw,48px)] font-medium leading-[1.2] tracking-[-0.01em] transition-all duration-500 ease-out inline-block origin-right group-hover:scale-125 ${
                  activeId === cap.id ? "text-foreground" : "text-foreground/40"
                }`}>{cap.title}</span>
                <span className={`ml-4 font-[family-name:var(--font-text)] text-[16px] transition-all duration-300 ${
                  activeId === cap.id ? "text-red-500" : "text-foreground/0 group-hover:text-foreground/20"
                }`}>→</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 md:hidden text-center">
          <p className="text-[12px] text-foreground/30">点击能力名称查看作品</p>
        </div>
      </div>

      {/* Drawer — clean Portal component */}
      <AnimatePresence>
        {drawerOpen && (
          <CapabilityDrawer capability={active} onClose={() => setDrawerOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

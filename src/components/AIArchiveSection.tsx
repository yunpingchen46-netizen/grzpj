"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  AI_ARCHIVE_TITLE,
  AI_ARCHIVE_ENGLISH,
  AI_ARCHIVE_SUBTITLE,
  AI_ARCHIVE_PERIODS,
  AI_CAPABILITIES,
  AI_ALL_TOOLS,
  AI_WORKFLOW,
  AI_FILTERS,
  type AIArchiveItem,
  type AIArchivePeriod,
} from "@/data/ai-archive";

const easeOut = [0.16, 1, 0.3, 1] as const;

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduce;
}

function SectionFade({
  children, delay = 0, className = "", style,
}: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={reduce ? {} : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: easeOut }}>
      {children}
    </motion.div>
  );
}

function PlaceholderVisual({ item, className = "" }: { item: AIArchiveItem; className?: string }) {
  const pattern = item.id.charCodeAt(item.id.length - 1) % 5;
  const patterns = [
    "radial-gradient(circle at 30% 40%, #1a1a1a 0%, #0a0a0a 100%)",
    "linear-gradient(135deg, #111 0%, #1a1a1a 40%, #0d0d0d 100%)",
    "linear-gradient(200deg, #0d0d0d 0%, #151515 50%, #0a0a0a 100%)",
    "radial-gradient(ellipse at 60% 50%, #1a1a1a 0%, #0a0a0a 100%)",
    "linear-gradient(45deg, #0a0a0a 0%, #1a1a1a 60%, #111 100%)",
  ];

  // Show real image if available
  if (!item.placeholder && item.src) {
    return (
      <div className={`relative overflow-hidden bg-neutral-950 dark:bg-[#0a0a0a] ${className}`}>
        <img src={item.src} alt={item.alt} className="w-full h-full object-contain" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-950 dark:bg-[#0a0a0a] ${className}`}
      style={{ background: patterns[pattern] }}>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white/[0.06] text-[10px] md:text-[12px] tracking-[0.3em]">{item.id}</span>
        <span className="text-white/[0.04] text-[8px] md:text-[9px] tracking-[0.2em] mt-1">{item.title}</span>
        {item.type === "video" && <span className="text-white/[0.06] text-[20px] mt-2">▶</span>}
      </div>
    </div>
  );
}

// ---- Gallery Modal ----
function GalleryModal({ period, items, startIndex, onClose }: {
  period: AIArchivePeriod; items: AIArchiveItem[]; startIndex: number; onClose: () => void;
}) {
  const safeStart = items.length > 0 ? Math.min(startIndex, items.length - 1) : 0;
  const [index, setIndex] = useState(safeStart);
  const safeIdx = items.length > 0 ? Math.min(index, items.length - 1) : 0;
  const item = items.length > 0 ? items[safeIdx] : null;

  useEffect(() => {
    if (items.length === 0) onClose();
  }, [items.length, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight") setIndex((i) => (i < items.length - 1 ? i + 1 : i));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [items.length, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-6" onClick={onClose}>
      <div className="relative w-full max-w-[90vw] flex flex-col md:flex-row gap-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex-[2] aspect-video bg-neutral-950 overflow-hidden">
          <PlaceholderVisual item={item} className="w-full h-full" />
        </div>
        <div className="md:w-60 shrink-0 text-foreground">
          <p className="text-[11px] tracking-[0.2em] text-foreground/30 mb-1">
            作品 {String(safeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <h3 className="text-[20px] font-medium mb-1">{item.title}</h3>
          <p className="text-[12px] text-foreground/40 mb-4">{item.description}</p>
          <div className="text-[11px] text-foreground/30 space-y-1">
            <p>{item.category.join(" / ")}</p>
            <p>{item.tools.join(" · ")}</p>
            <p className="text-red-500/50">{item.placeholder ? "占位素材" : "已完成"}</p>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setIndex((i) => (i > 0 ? i - 1 : i))} disabled={safeIdx === 0}
              className="w-8 h-8 border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-20 transition-colors" aria-label="上一个">←</button>
            <button onClick={() => setIndex((i) => (i < items.length - 1 ? i + 1 : i))} disabled={safeIdx === items.length - 1}
              className="w-8 h-8 border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-20 transition-colors" aria-label="下一个">→</button>
          </div>
        </div>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/40 hover:text-white text-xs tracking-wider">关闭</button>
      </div>
    </div>
  );
}

// ---- Main ----
export default function AIArchiveSection() {
  const [activePeriodId, setActivePeriodId] = useState(AI_ARCHIVE_PERIODS[AI_ARCHIVE_PERIODS.length - 1].id);
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [hintDimmed, setHintDimmed] = useState(false);
  const lastMoveRef = useRef(0);
  const prevIdxRef = useRef(0);
  const previewRef = useRef<HTMLDivElement>(null);
  // Mobile touch
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const activePeriod = AI_ARCHIVE_PERIODS.find((p) => p.id === activePeriodId) || AI_ARCHIVE_PERIODS[0];

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return activePeriod.items;
    return activePeriod.items.filter((item) => item.type === activeFilter);
  }, [activePeriod, activeFilter]);

  const safeIdx = Math.min(activeItemIdx, Math.max(0, filteredItems.length - 1));
  const currentItem = filteredItems.length > 0 ? filteredItems[safeIdx] : null;

  useEffect(() => { setActiveItemIdx(0); prevIdxRef.current = 0; }, [activePeriodId, activeFilter]);

  // Dim hint after first successful switch
  useEffect(() => {
    if (safeIdx !== 0 && !hintDimmed) {
      const t = setTimeout(() => setHintDimmed(true), 2000);
      return () => clearTimeout(t);
    }
  }, [safeIdx, hintDimmed]);

  // Horizontal mouse move on preview area
  const handlePreviewMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastMoveRef.current < 60) return;
    lastMoveRef.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const count = filteredItems.length;
    if (count === 0) return;
    const newIdx = Math.min(Math.floor(relX * count), count - 1);
    if (newIdx !== prevIdxRef.current) {
      prevIdxRef.current = newIdx;
      setActiveItemIdx(newIdx);
    }
  }, [filteredItems.length]);

  const handlePreviewLeave = useCallback(() => {
    // Keep current item, don't reset
  }, []);

  // Mobile touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only handle horizontal swipes
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx < 0 && safeIdx < filteredItems.length - 1) {
        setActiveItemIdx(safeIdx + 1);
      } else if (dx > 0 && safeIdx > 0) {
        setActiveItemIdx(safeIdx - 1);
      }
    }
  }, [safeIdx, filteredItems.length]);

  // Keyboard
  const handlePreviewKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && safeIdx > 0) {
      setActiveItemIdx(safeIdx - 1);
    } else if (e.key === "ArrowRight" && safeIdx < filteredItems.length - 1) {
      setActiveItemIdx(safeIdx + 1);
    } else if (e.key === "Enter") {
      setGalleryOpen(true);
    }
  }, [safeIdx, filteredItems.length]);

  return (
    <section className="relative w-full bg-background text-foreground overflow-hidden" style={{ minHeight: "100svh" }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-foreground/10" />

      <div className="h-full max-w-[1600px] mx-auto px-[8px] md:px-[40px] flex flex-col"
        style={{ paddingTop: "clamp(32px, 4vw, 56px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}>

        {/* ===== HEADER ===== */}
        <SectionFade className="shrink-0" delay={0}>
          <div className="flex items-start justify-between mb-[clamp(24px,3vw,40px)]">
            <div>
              <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-foreground/30 mb-2">03 / AI ARCHIVE</p>
              <h2 className="text-[clamp(36px,5vw,72px)] font-[family-name:var(--font-heading)] font-semibold leading-[1.05] tracking-[-0.02em] mb-1">{AI_ARCHIVE_TITLE}</h2>
              <p className="text-[clamp(12px,1.2vw,16px)] text-foreground/40">{AI_ARCHIVE_SUBTITLE}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[14px] md:text-[16px] tracking-[0.2em] text-foreground/40 font-medium mb-2">2025—NOW</p>
              <p className="text-[9px] md:text-[10px] tracking-[0.2em] text-foreground/15">{AI_ARCHIVE_ENGLISH}</p>
              <p className="text-[9px] md:text-[10px] text-foreground/15 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1 align-middle" />持续更新
              </p>
            </div>
          </div>
        </SectionFade>

        {/* ===== FILTER ===== */}
        <SectionFade delay={0.1} className="flex gap-4 shrink-0 mb-[clamp(12px,1.5vw,20px)]">
          {AI_FILTERS.map((f) => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)}
              className={`text-[12px] md:text-[13px] transition-colors ${activeFilter === f.key ? "text-red-500 border-b border-red-500 pb-0.5" : "text-foreground/25 hover:text-foreground/50"}`}>{f.label}</button>
          ))}
        </SectionFade>

        {/* ===== MIDDLE ===== */}
        <div className="flex-1 flex flex-col md:flex-row gap-[clamp(16px,2vw,32px)] min-h-0" style={{ height: "62%" }}>

          {/* LEFT: Preview — horizontal browse area */}
          <div className="md:w-[60%] flex flex-col gap-[clamp(8px,1vw,12px)] min-h-0 justify-center">
            <SectionFade delay={0.15}>
              <div
                ref={previewRef}
                className="relative w-full aspect-video bg-neutral-950 overflow-hidden cursor-ew-resize group"
                style={{ cursor: "ew-resize" }}
                tabIndex={0}
                role="region"
                aria-label={`作品预览，共 ${filteredItems.length} 张，左右移动浏览`}
                onMouseMove={handlePreviewMove}
                onMouseLeave={handlePreviewLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onKeyDown={handlePreviewKey}
                onClick={() => currentItem && setGalleryOpen(true)}
              >
                {/* Image transition */}
                <div className="absolute inset-0 transition-opacity duration-300">
                  {currentItem && <PlaceholderVisual item={currentItem} className="w-full h-full" />}
                </div>

                {/* "View gallery" hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 text-white/50 text-[11px] tracking-[0.3em] transition-opacity">点击查看图集</span>
                </div>

                {/* Browse hint — bottom-left */}
                <div className={`absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 px-2 py-1 rounded transition-opacity duration-700 ${hintDimmed ? "opacity-30" : "opacity-70"}`}>
                  <span className="text-white/60 text-[10px]">↔</span>
                  <span className="text-white/50 text-[10px] hidden md:inline">左右移动鼠标浏览</span>
                  <span className="text-white/50 text-[10px] md:hidden">左右滑动浏览</span>
                </div>

                {/* Progress indicator — bottom-right */}
                <div className="absolute bottom-3 right-3 flex items-center gap-3">
                  <span className="text-white/40 text-[10px]">{String(safeIdx + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}</span>
                  <div className="flex gap-1">
                    {filteredItems.map((_, i) => (
                      <span key={i}
                        className={`block h-[2px] w-6 transition-colors duration-300 ${i === safeIdx ? "bg-red-500" : "bg-white/15"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </SectionFade>

            {/* File info */}
            {currentItem && (
              <SectionFade delay={0.2} className="shrink-0 flex items-center justify-between text-[11px] md:text-[12px]">
                <div className="flex items-center gap-3">
                  <span className="text-foreground/20">作品 {String(safeIdx + 1).padStart(2, "0")} / {activePeriod.timeLabel.split(" / ")[0]}</span>
                  <span className="text-foreground/60">{currentItem.title}</span>
                  <span className="text-foreground/20">{currentItem.category.join(" / ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  {currentItem.tools.map((t) => (
                    <span key={t} className="text-foreground/15 text-[9px]">{t}</span>
                  ))}
                  <span className="text-red-500/40 text-[10px]">{currentItem.placeholder ? "占位素材" : "已完成"}</span>
                </div>
              </SectionFade>
            )}
          </div>

          {/* RIGHT: File Rack */}
          <SectionFade delay={0.2} className="md:w-[40%] flex flex-col min-h-0">
            <div className="flex flex-col justify-between h-full">
              {AI_ARCHIVE_PERIODS.map((period) => {
                const isActive = period.id === activePeriodId;
                const filterCount = (activeFilter === "all" ? period.items
                  : period.items.filter((item) => item.type === activeFilter)).length;
                const dimmed = filterCount === 0;

                return (
                  <div key={period.id}
                    className={`relative shrink-0 px-4 py-[clamp(14px,1.5vw,22px)] border-l-2 cursor-pointer transition-all duration-400 flex-1 flex flex-col justify-center ${
                      isActive
                        ? "border-red-500 bg-foreground/[0.03] -translate-x-4 md:-translate-x-5"
                        : dimmed ? "border-foreground/5 opacity-25" : "border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.01] hover:-translate-x-1"
                    }`}
                    onMouseEnter={() => { if (!dimmed) setActivePeriodId(period.id); }}
                    onClick={() => {
                      if (period.items.length === 0) return;
                      setActivePeriodId(period.id);
                      setGalleryOpen(true);
                    }}>
                    <p className={`text-[11px] md:text-[12px] tracking-[0.15em] ${isActive ? "text-foreground/40" : "text-foreground/25"}`}>{period.timeLabel}</p>
                    <p className={`text-[16px] md:text-[18px] font-medium mt-1 ${isActive ? "text-foreground" : "text-foreground/40"}`}>{period.title}</p>
                    <p className="text-[10px] md:text-[11px] text-foreground/15 mt-2 leading-relaxed">{period.models.join(" · ")}</p>
                  </div>
                );
              })}
            </div>
          </SectionFade>
        </div>

        {/* ===== CAPABILITIES & TOOLS ===== */}
        <SectionFade className="shrink-0 border-t border-foreground/10 flex flex-wrap items-center gap-x-3 gap-y-1 py-3" delay={0.3}>
          <span className="text-[10px] tracking-[0.2em] text-red-500 mr-2">创作能力</span>
          {AI_CAPABILITIES.slice(0, 6).map((c) => (
            <span key={c} className="text-[11px] text-foreground/25">{c}</span>
          ))}
          <span className="text-foreground/10 mx-2">|</span>
          <span className="text-[10px] tracking-[0.2em] text-foreground/25 mr-1">使用工具</span>
          {AI_ALL_TOOLS.map((t) => (
            <span key={t} className="text-[11px] text-foreground/20">{t}</span>
          ))}
        </SectionFade>

        {/* ===== BOTTOM: Workflow ===== */}
        <SectionFade className="shrink-0 border-t border-foreground/10" delay={0.4}
          style={{ paddingTop: "clamp(16px, 2vw, 28px)", marginTop: "clamp(16px, 2vw, 28px)" }}>
          <div className="flex flex-nowrap md:flex-row flex-col gap-4 md:gap-0 justify-between">
            {AI_WORKFLOW.map((step) => (
              <div key={step.index} className="flex items-center gap-2 md:gap-3 md:flex-col md:items-start">
                <span className="text-[18px] md:text-[22px] font-[family-name:var(--font-heading)] font-semibold text-red-500 shrink-0">{step.index}</span>
                <span className="hidden md:block w-full h-[1px] bg-foreground/10 my-1" />
                <div>
                  <p className="text-[13px] md:text-[14px] tracking-[0.2em] text-foreground/30">{step.title}</p>
                  <p className="text-[15px] md:text-[16px] text-foreground/60 leading-snug">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionFade>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground/10" />

      {galleryOpen && filteredItems.length > 0 && (
        <GalleryModal period={activePeriod} items={filteredItems}
          startIndex={safeIdx}
          onClose={() => setGalleryOpen(false)} />
      )}
    </section>
  );
}

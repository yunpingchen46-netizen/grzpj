"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { ProjectShowcaseData } from "@/types/project";

const easeOut = [0.16, 1, 0.3, 1] as const;

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduce;
}

// ---- Sub-components ----

function SectionFade({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduce ? {} : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function VideoPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTip, setShowTip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.play().then(() => setHasPlayed(true)).catch(() => {});
    };
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    // Fallback: show video after 4s even if not playing
    const t = setTimeout(() => setHasPlayed(true), 4000);
    return () => {
      el.removeEventListener("canplay", tryPlay);
      clearTimeout(t);
    };
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  return (
    <>
      {/* Main video */}
      <div
        className="relative w-full aspect-video bg-neutral-900 dark:bg-[#111] overflow-hidden cursor-pointer group"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onClick={openModal}
      >
        {!hasPlayed && poster && (
          <img
            src={poster}
            alt="Video poster"
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {/* View full demo tip */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center z-20 transition-opacity duration-300 ${
            showTip ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white/80 text-xs tracking-[0.25em] border border-white/30 px-4 py-2">
            VIEW FULL DEMO
          </span>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[90vw] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm tracking-wider"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ToolChip({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  const [showDesc, setShowDesc] = useState(false);
  const reduce = useReducedMotion();

  return (
    <span
      className="relative inline-flex items-center cursor-default"
      onMouseEnter={() => setShowDesc(true)}
      onMouseLeave={() => setShowDesc(false)}
    >
      <span className="text-[14px] md:text-[16px] tracking-wider text-foreground/60 hover:text-foreground transition-colors">
        {name}
      </span>
      {description && showDesc && (
        <span
          className={`absolute bottom-full left-0 mb-2 px-2 py-1 bg-neutral-900 dark:bg-[#1a1a1a] border border-neutral-800 dark:border-[#2a2a2a] text-[11px] text-foreground/50 leading-relaxed whitespace-nowrap ${
            reduce ? "" : "animate-in fade-in duration-200"
          }`}
        >
          {description}
        </span>
      )}
    </span>
  );
}

// ---- ImageStrip ----

function ImageStrip({ images }: { images: { src: string; alt: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  useEffect(() => {
    if (lightboxIdx !== null) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxIdx(null);
        if (e.key === "ArrowLeft" && lightboxIdx > 0) setLightboxIdx(lightboxIdx - 1);
        if (e.key === "ArrowRight" && lightboxIdx < images.length - 1) setLightboxIdx(lightboxIdx + 1);
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    }
  }, [lightboxIdx, images.length]);

  const currentLightbox = lightboxIdx !== null ? images[lightboxIdx] : null;

  return (
    <SectionFade delay={0.25}>
      <div
        ref={ref}
        className="flex gap-[clamp(6px,1vw,12px)] overflow-x-auto"
        style={{ height: "clamp(100px, 13vw, 180px)" }}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className="flex-shrink-0 relative h-full bg-neutral-200 dark:bg-[#111] overflow-hidden group cursor-pointer"
            style={{ aspectRatio: "16/9" }}
            onClick={() => setLightboxIdx(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
              <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-white/50">
                {img.label}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Lightbox with hover nav */}
      {currentLightbox && (
        <div className="fixed inset-0 z-[1001] bg-black/95 flex items-center justify-center p-4 md:p-8 group/box"
          onClick={() => setLightboxIdx(null)}>
          {/* Left nav area */}
          {lightboxIdx !== null && lightboxIdx > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 w-[40%] z-10 flex items-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}>
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center ml-6">
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" stroke="black" strokeWidth="2" fill="none"/></svg>
              </div>
            </div>
          )}
          {/* Right nav area */}
          {lightboxIdx !== null && lightboxIdx < images.length - 1 && (
            <div
              className="absolute right-0 top-0 bottom-0 w-[40%] z-10 flex items-center justify-end cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}>
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center mr-6">
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" stroke="black" strokeWidth="2" fill="none"/></svg>
              </div>
            </div>
          )}
          <img src={currentLightbox.src} alt={currentLightbox.alt}
            className="max-w-full max-h-[85vh] object-contain" />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs">
            {lightboxIdx! + 1} / {images.length}
          </span>
          <button onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 text-white/40 hover:text-white text-xs tracking-wider">关闭</button>
        </div>
      )}
    </SectionFade>
  );
}

// ---- Main Component ----

export default function ProjectShowcase({
  data,
}: {
  data: ProjectShowcaseData;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background text-foreground overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-foreground/10" />

      <div className="h-full max-w-[1600px] mx-auto px-[8px] md:px-[40px] flex flex-col"
        style={{ paddingTop: "clamp(32px, 4vw, 56px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}>
        {/* ===== TOP HEADER ===== */}
        <SectionFade className="shrink-0" delay={0}>
          <div className="flex items-start justify-between mb-[clamp(24px,3vw,48px)]">
            {/* Left: number + title */}
            <div>
              <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-foreground/30 mb-2">
                {data.index} / {data.category}
              </p>
              <h2 className="text-[clamp(36px,5vw,72px)] font-[family-name:var(--font-heading)] font-semibold leading-[1.05] tracking-[-0.02em] mb-2">
                {data.title}
              </h2>
              {data.englishTitle && (
                <p className="text-[clamp(14px,1.5vw,20px)] tracking-[0.15em] text-foreground/25 mb-1 font-[family-name:var(--font-heading)]">
                  {data.englishTitle}
                  {data.slogan && (
                    <span className="text-foreground/10"> · {data.slogan}</span>
                  )}
                </p>
              )}
              <p className="text-[clamp(14px,1.2vw,18px)] text-foreground/40 leading-relaxed">
                {data.subtitle}
              </p>
            </div>

            {/* Right: year + tags */}
            <div className="text-right shrink-0">
              <p className="text-[14px] md:text-[16px] tracking-[0.2em] text-red-500 font-medium mb-3">
                {data.year}
              </p>
              {data.tags.map((tag) => (
                <p key={tag} className="text-[10px] md:text-[11px] tracking-[0.25em] text-foreground/20 leading-loose">
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </SectionFade>

        {/* ===== MIDDLE CONTENT ===== */}
        <div className="flex-1 flex flex-col md:flex-row gap-[clamp(16px,2vw,40px)] min-h-0"
          style={{ height: "64%" }}>
          {/* LEFT: Video + Images (62%) */}
          <div className="md:w-[62%] flex flex-col gap-[clamp(8px,1vw,16px)] min-h-0">
            <SectionFade className="flex-1 min-h-0" delay={0.15}>
              <VideoPlayer
                src={data.video}
                poster={data.videoPoster}
              />
            </SectionFade>

            {/* Bottom: scrollable image strip */}
            {(data.onlineImages || data.images.length > 0) && (
              <ImageStrip images={[...(data.onlineImages || []), ...data.images]} />
            )}
          </div>

          {/* RIGHT: Info (38%) */}
          <div className="md:w-[38%] flex flex-col gap-[clamp(16px,2.5vw,32px)] overflow-y-auto min-h-0">
            {/* Project Overview */}
            <SectionFade delay={0.2}>
              <h4 className="text-[20px] md:text-[24px] tracking-wider text-red-500 mb-3 font-medium">
                项目概述
              </h4>
              <div className="space-y-3">
                {data.overview.map((p, i) => (
                  <p
                    key={i}
                    className="text-[14px] md:text-[16px] text-foreground/50 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </SectionFade>

            {/* Stages (for projects that have them) */}
            {data.stages && (
              <SectionFade delay={0.25}>
                <h4 className="text-[20px] md:text-[24px] tracking-wider text-red-500 mb-3 font-medium">
                  体验流程
                </h4>
                <div className="space-y-3">
                  {data.stages.map((stage) => (
                    <div key={stage.index} className="flex gap-3">
                      <span className="text-[14px] md:text-[15px] text-red-500 font-medium shrink-0 mt-0.5">
                        {stage.index}
                      </span>
                      <p className="text-[14px] md:text-[16px] text-foreground/50 leading-snug">
                        <span className="text-foreground/70 font-medium">{stage.subtitle}</span>
                        {" "}{stage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionFade>
            )}

            {/* My Role */}
            <SectionFade delay={data.stages ? 0.3 : 0.3}>
              <h4 className="text-[20px] md:text-[24px] tracking-wider text-red-500 mb-3 font-medium">
                个人职责
                {data.teamNote && (
                  <span className="text-[12px] md:text-[13px] text-foreground/25 ml-3 font-normal tracking-normal">
                    {data.teamNote}
                  </span>
                )}
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {data.roles.map((role) => (
                  <div key={role.label}>
                    <p className="text-[10px] md:text-[11px] tracking-[0.15em] text-foreground/25 mb-0.5">
                      {role.label}
                    </p>
                    <p className="text-[13px] md:text-[15px] text-foreground/55 leading-snug">
                      {role.content}
                    </p>
                  </div>
                ))}
              </div>
            </SectionFade>

            {/* Tools & Technology */}
            <SectionFade delay={0.4}>
              <h4 className="text-[20px] md:text-[24px] tracking-wider text-red-500 mb-3 font-medium">
                软件与技术
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {data.tools.map((tool) => (
                  <ToolChip key={tool.name} {...tool} />
                ))}
              </div>
              {data.qrcode && (
                <div className="mt-24 flex justify-center">
                  <img src={data.qrcode} alt="线上体验二维码" className="w-[140px] h-[140px] object-contain" />
                </div>
              )}
            </SectionFade>
          </div>
        </div>

        {/* ===== BOTTOM: Route ===== */}
        <SectionFade
          className="shrink-0 border-t border-foreground/10"
          delay={0.5}
          style={{
            paddingTop: "clamp(16px, 2vw, 28px)",
            marginTop: "clamp(16px, 2vw, 28px)",
          }}
        >
          <div className="flex flex-nowrap md:flex-row flex-col gap-4 md:gap-0 justify-between">
            {data.route.map((step, i) => (
              <div
                key={step.index}
                className="flex items-center gap-2 md:gap-3 md:flex-col md:items-start"
              >
                <span className="text-[18px] md:text-[22px] font-[family-name:var(--font-heading)] font-semibold text-red-500 shrink-0">
                  {step.index}
                </span>
                <span className="hidden md:block w-full h-[1px] bg-foreground/10 my-1" />
                <div>
                  <p className="text-[13px] md:text-[14px] tracking-[0.2em] text-foreground/30">
                    {step.title}
                  </p>
                  <p className="text-[15px] md:text-[16px] text-foreground/60 leading-snug">
                    {step.subtitle}
                  </p>
                  <p className="text-[14px] md:text-[15px] text-foreground/30 leading-snug mt-0.5">
                    {step.description}
                  </p>
                </div>
                {i < data.route.length - 1 && (
                  <span className="text-foreground/10 hidden md:block md:absolute md:right-0">
                    {/* dot connector handled by border */}
                  </span>
                )}
              </div>
            ))}
          </div>
        </SectionFade>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground/10" />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import type { Capability, CapabilityItem } from "@/data/capabilities";
import MediaViewer, { type MediaItem } from "@/components/MediaViewer";

// ---- Helpers ----

function buildMediaList(capability: Capability): MediaItem[] {
  const list: MediaItem[] = [];
  const cs = capability.caseStudy;

  // From items — main media first (matching itemMediaIdxMap order)
  for (const item of capability.items) {
    if (!item.placeholder && item.src) {
      list.push({ type: item.mediaType, src: item.src, title: item.title, alt: item.alt });
    }
  }
  // Then extra images, boards, posters
  for (const item of capability.items) {
    for (const img of item.extraImages || []) {
      if (!img.placeholder && img.src) {
        list.push({ type: "image", src: img.src, title: img.alt, alt: img.alt });
      }
    }
    if (item.board) {
      list.push({ type: "image", src: item.board, title: `${item.title} 完整展板`, alt: item.title });
    }
    if (item.posterImage) {
      list.push({ type: "image", src: item.posterImage, title: `${item.title} 宣传海报`, alt: item.title });
    }
  }

  // From case study media sections
  if (cs) {
    for (const section of cs.sections) {
      if (section.type === "media" && section.items) {
        for (const it of section.items) {
          if (it.src && !it.placeholder) {
            const isVid = it.src.match(/\.(mp4|webm|mov|avi)(\?|$)/i);
            list.push({ type: isVid ? "video" : "image", src: it.src, title: it.alt || section.title, alt: it.alt });
          }
        }
      }
    }
  }

  return list;
}

// ---- Sub-components ----

function ClickableMedia({
  children, mediaIndex, onClick, hint,
}: { children: React.ReactNode; mediaIndex: number; onClick: (idx: number) => void; hint?: string }) {
  return (
    <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onClick(mediaIndex)}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        const overlay = target.querySelector(".media-hover-hint") as HTMLElement;
        if (overlay) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        const overlay = target.querySelector(".media-hover-hint") as HTMLElement;
        if (overlay) overlay.style.opacity = "0";
      }}>
      {children}
      <div className="media-hover-hint" style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.35)", opacity: 0, transition: "opacity 0.2s", pointerEvents: "none",
      }}>
        <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, letterSpacing: "0.15em" }}>{hint || "点击放大查看 ↗"}</span>
      </div>
    </div>
  );
}

function ItemMedia({ item, mediaIdx, onMediaClick }: { item: CapabilityItem; mediaIdx: number; onMediaClick: (idx: number) => void }) {
  const isBilibili = item.src?.includes("player.bilibili.com");
  const isVideo = !isBilibili && item.mediaType === "video" && !item.placeholder && item.src;
  const isImage = item.mediaType === "image" && !item.placeholder && item.src;
  const showReal = isBilibili || isVideo || isImage;

  const content = (
    <div style={{ position: "relative", aspectRatio: "16/9", background: "#111", overflow: "hidden", marginBottom: 12 }}>
      {isBilibili ? (
        <iframe src={item.src} allowFullScreen style={{ width: "100%", height: "100%", border: "none" }} />
      ) : isVideo ? (
        <video src={item.src} autoPlay muted loop playsInline preload="none" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : isImage ? (
        <img src={item.src} alt={item.alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ color: "rgba(255,255,255,0.05)", fontSize: 10, letterSpacing: "0.3em" }}>{item.id}</span>
          <span style={{ color: "rgba(255,255,255,0.03)", fontSize: 8, marginTop: 4 }}>{item.title}</span>
          <span style={{ color: "rgba(255,255,255,0.04)", fontSize: 6, marginTop: 4, letterSpacing: "0.1em" }}>占位素材</span>
        </div>
      )}
    </div>
  );

  if (!showReal) return content;
  return (
    <ClickableMedia mediaIndex={mediaIdx} onClick={onMediaClick} hint={isBilibili ? "点击观看 Bilibili ▶" : isVideo ? "点击播放完整视频 ▶" : "点击放大查看 ↗"}>
      {content}
    </ClickableMedia>
  );
}

function ItemInfo({ item }: { item: CapabilityItem }) {
  return (
    <>
      {item.subtitle && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>{item.subtitle}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>
        <span style={{ fontSize: 13 }}>{item.type}{item.year ? " / " + item.year : ""}</span>
        {item.team && <><span style={{ color: "rgba(255,255,255,0.1)" }}>|</span><span style={{ color: "#ef4444" }}>{item.team}</span></>}
        {item.duration && <><span style={{ color: "rgba(255,255,255,0.1)" }}>|</span><span>{item.duration}</span></>}
      </div>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 8 }}>{item.description}</p>
      {item.concept && <div style={{ marginBottom: 8, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}><p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>创作思路</p><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{item.concept}</p></div>}
      {item.myRole && item.myRole.length > 0 && <div style={{ marginBottom: 8 }}><p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>我的职责</p><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{item.myRole.map((r) => <span key={r} style={{ padding: "4px 12px", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{r}</span>)}</div></div>}
      {item.metaphorGroups && item.metaphorGroups.length > 0 && <div style={{ marginBottom: 8, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}><p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>核心隐喻</p>{item.metaphorGroups.map((m, j) => <div key={j} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 160 }}>{m.from}</span><span style={{ color: "#ef4444", fontSize: 14 }}>→</span><span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{m.to}</span></div>)}</div>}
      {item.features && item.features.length > 0 && <div style={{ marginBottom: 8, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>{item.features.map((f, j) => <div key={j} style={{ marginBottom: 10 }}><p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{f.label}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{f.items.map((s, k) => <span key={k} style={{ padding: "3px 10px", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{s}</span>)}</div></div>)}</div>}
      {item.designNotes && <div style={{ marginBottom: 8, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}><p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>设计说明</p><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{item.designNotes}</p></div>}
      {item.extraImages && item.extraImages.length > 0 && <div><p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>作品图片</p></div>}
      {item.tools.length > 0 && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>{item.tools.join(" · ")}</p>}
    </>
  );
}

// ---- Main ----

export default function CapabilityDrawer({ capability, onClose }: { capability: Capability; onClose: () => void }) {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaStartIdx, setMediaStartIdx] = useState(0);

  const allMedia = useMemo(() => buildMediaList(capability), [capability]);

  const handleMediaClick = useCallback((idx: number) => {
    setMediaStartIdx(idx);
    setMediaViewerOpen(true);
  }, []);

  const closeMediaViewer = useCallback(() => {
    setMediaViewerOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.drawerOpen = "true";
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !mediaViewerOpen) onClose(); };
    document.addEventListener("keydown", onKey);
    const overlay = overlayRef.current;
    const scrollEl = drawerBodyRef.current;
    if (!overlay || !scrollEl) return;
    const handleWheel = (e: WheelEvent) => { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); scrollEl.scrollTop += e.deltaY; };
    overlay.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    const handleWindowWheel = (e: WheelEvent) => { const t = e.target as HTMLElement; if (overlay.contains(t)) { e.preventDefault(); e.stopImmediatePropagation(); scrollEl.scrollTop += e.deltaY; } };
    window.addEventListener("wheel", handleWindowWheel, { capture: true, passive: false });
    return () => {
      document.documentElement.dataset.drawerOpen = "";
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      overlay.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("wheel", handleWindowWheel, { capture: true });
    };
  }, [onClose, mediaViewerOpen]);

  const scrollToProject = (targetId: string) => {
    onClose();
    setTimeout(() => {
      for (const s of document.querySelectorAll("section")) {
        if (targetId === "ai-archive" && s.textContent?.includes("AI 创作档案")) { s.scrollIntoView({ behavior: "smooth" }); return; }
        if ((targetId === "opinion-storm" || targetId === "opinion-storm-project") && s.textContent?.includes("舆论中的风暴")) { s.scrollIntoView({ behavior: "smooth" }); return; }
        if ((targetId === "sensitive-light" || targetId === "sensitive-light-project") && s.textContent?.includes("敏感的光")) { s.scrollIntoView({ behavior: "smooth" }); return; }
      }
    }, 500);
  };

  // Compute media index offsets per item
  let mediaIdxCounter = 0;
  const itemMediaIdxMap = new Map<string, number>();
  for (const item of capability.items) {
    if (!item.placeholder && item.src) {
      itemMediaIdxMap.set(item.id + "-main", mediaIdxCounter++);
    }
  }
  // extraImages after main
  const itemExtraStartMap = new Map<string, number>();
  for (const item of capability.items) {
    let start = -1;
    for (const img of item.extraImages || []) {
      if (!img.placeholder && img.src) {
        if (start === -1) start = mediaIdxCounter;
        mediaIdxCounter++;
      }
    }
    if (start >= 0) itemExtraStartMap.set(item.id, start);
    if (item.board) {
      itemMediaIdxMap.set(item.id + "-board", mediaIdxCounter++);
    }
    if (item.posterImage) {
      itemMediaIdxMap.set(item.id + "-poster", mediaIdxCounter++);
    }
  }

  const items = capability.items;
  const cs = capability.caseStudy;

  const drawer = (
    <div ref={overlayRef} className="capability-drawer-overlay"
      style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.72)", overflow: "hidden" }}
      onClick={(e: React.MouseEvent) => { if (e.target === e.currentTarget) onClose(); }}>
      <aside className="capability-drawer"
        style={{ position: "absolute", top: 0, right: 0, width: "min(84vw, 1400px)", height: "100dvh", display: "grid", gridTemplateRows: "auto minmax(0, 1fr)", background: "#050505", overflow: "hidden" }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <header className="capability-drawer-header" style={{ position: "relative", zIndex: 2, background: "#050505", flexShrink: 0, padding: "clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px) 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, color: "rgba(255,255,255,0.4)", fontSize: 14, letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}>关闭<span style={{ fontSize: 20, marginLeft: 4 }}>×</span></button>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{capability.index} / CAPABILITY</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff" }}>{capability.title}</h2>
        </header>
        <div ref={drawerBodyRef} className="capability-drawer-body" id="capability-drawer-body"
          style={{ minHeight: 0, overflowY: "scroll", overflowX: "hidden", overscrollBehaviorY: "contain", WebkitOverflowScrolling: "touch", touchAction: "pan-y", padding: "clamp(16px, 2vw, 32px) clamp(24px, 4vw, 48px) 80px" }}>
          <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 24, maxWidth: 640 }}>{capability.description}</p>

          {cs ? (
            <>
              <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontFamily: "var(--font-heading)", fontWeight: 600, marginBottom: 8, color: "#fff" }}>{cs.projectName}</h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{cs.subtitle}</p>
                <div style={{ display: "flex", gap: 24, fontSize: 12, color: "rgba(255,255,255,0.25)", alignItems: "center" }}>
                  <span>{cs.year}</span><span style={{ color: "rgba(255,255,255,0.1)" }}>|</span><span style={{ color: "#ef4444" }}>{cs.team}</span>
                </div>
              </div>
              {cs.sections.map((s) => {
                if (s.type === "text") return <div key={s.id} style={{ marginBottom: 40 }}><h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-heading)" }}>{s.title}</h3>{s.content && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 640, marginBottom: 16 }}>{s.content}</p>}{s.items?.map((it, i) => <div key={i} style={{ marginBottom: 8 }}>{it.label && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginRight: 8 }}>{it.label}</span>}<span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{it.text}</span></div>)}</div>;
                if (s.type === "highlight") return <div key={s.id} style={{ marginBottom: 40 }}><h3 style={{ fontSize: 13, letterSpacing: "0.2em", color: "#ef4444", marginBottom: 16 }}>{s.title}</h3><div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>{s.items?.map((it, i) => <span key={i} style={{ padding: "6px 16px", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14, color: "rgba(255,255,255,0.6)", borderRadius: 2 }}>{it.text}</span>)}</div>{s.content && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 560 }}>{s.content}</p>}</div>;
                if (s.type === "grid") return <div key={s.id} style={{ marginBottom: 40 }}><h3 style={{ fontSize: 13, letterSpacing: "0.2em", color: "#ef4444", marginBottom: 16 }}>{s.title}</h3><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>{s.items?.map((it, i) => <div key={i} style={{ padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>{it.label && <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>{it.label}</p>}{it.text && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{it.text}</p>}</div>)}</div></div>;
                if (s.type === "list") return <div key={s.id} style={{ marginBottom: 40 }}><h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-heading)" }}>{s.title}</h3>{s.items?.map((it, i) => <p key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 4 }}>{it.text}</p>)}</div>;
                if (s.type === "level-list") return <div key={s.id} style={{ marginBottom: 40 }}><h3 style={{ fontSize: 13, letterSpacing: "0.2em", color: "#ef4444", marginBottom: 16 }}>{s.title}</h3><div style={{ border: "1px solid rgba(255,255,255,0.08)" }}>{s.items?.map((it, i) => <div key={i} style={{ display: "flex", padding: "12px 16px", borderBottom: i < (s.items?.length || 1) - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "baseline", gap: 12 }}><span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", minWidth: 200 }}>{it.label}</span><span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{it.text}</span></div>)}</div></div>;
                if (s.type === "insight-map") return <div key={s.id} style={{ marginBottom: 40 }}><h3 style={{ fontSize: 13, letterSpacing: "0.2em", color: "#ef4444", marginBottom: 16 }}>{s.title}</h3><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{s.items?.map((it, i) => <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", minWidth: 200, flexShrink: 0 }}>{it.label}</span><span style={{ color: "#ef4444", fontSize: 14, flexShrink: 0 }}>→</span><span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{it.text}</span></div>)}</div></div>;
                if (s.type === "media") {
                  // Find the starting index for case study media
                  let csMediaStart = 0;
                  for (const item of capability.items) {
                    if (!item.placeholder && item.src) csMediaStart++;
                    for (const img of item.extraImages || []) { if (!img.placeholder && img.src) csMediaStart++; }
                    if (item.board) csMediaStart++;
                    if (item.posterImage) csMediaStart++;
                  }
                  let csOffset = 0;
                  for (const prevSection of cs.sections) {
                    if (prevSection.id === s.id) break;
                    if (prevSection.type === "media" && prevSection.items) {
                      csOffset += prevSection.items.filter(it => it.src && !it.placeholder).length;
                    }
                  }
                  const finalStart = csMediaStart + csOffset;
                  return (
                    <div key={s.id} style={{ marginBottom: 40 }}>
                      <h3 style={{ fontSize: 13, letterSpacing: "0.2em", color: "#ef4444", marginBottom: 16 }}>{s.title}</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                        {s.items?.map((it, i) => {
                          const realImg = it.src && !it.placeholder;
                          const idx = finalStart + (s.items?.slice(0, i).filter(x => x.src && !x.placeholder).length || 0);
                          const isBili = realImg && it.src && it.src.includes("player.bilibili.com");
                          const isVideo = !isBili && realImg && it.src && it.src.match(/\.(mp4|webm|mov|avi)(\?|$)/i);
                          const inner = (
                            <div style={{ aspectRatio: "16/9", background: "#111", overflow: "hidden", position: "relative" }}>
                              {isBili ? (
                                <iframe src={it.src} allowFullScreen style={{ width: "100%", height: "100%", border: "none" }} />
                              ) : isVideo ? (
                                <video src={it.src} autoPlay muted loop playsInline preload="none" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                              ) : realImg ? (
                                <img src={it.src} alt={it.alt || ""} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                              ) : (
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><span style={{ color: "rgba(255,255,255,0.05)", fontSize: 10, letterSpacing: "0.3em" }}>{it.alt}</span><span style={{ color: "rgba(255,255,255,0.03)", fontSize: 8, marginTop: 4 }}>占位素材</span></div>
                              )}
                            </div>
                          );
                          if (!realImg) return <div key={i}>{inner}</div>;
                          return (
                            <ClickableMedia key={i} mediaIndex={idx} onClick={handleMediaClick} hint={isBili ? "点击观看 Bilibili ▶" : isVideo ? "点击播放完整视频 ▶" : "点击放大查看 ↗"}>
                              {inner}
                            </ClickableMedia>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </>
          ) : (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 40 }}>
                <span>{items.length} 件{capability.id === "video" ? "团队" : capability.id === "motion" ? "个人" : ""}作品</span>
                {capability.tools.length > 0 && <><span style={{ color: "rgba(255,255,255,0.1)" }}>|</span><span>{capability.tools.join(" · ")}</span></>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
                {items.map((item, i) => (
                  <div key={item.id + "-" + i}>
                    {(!item.placeholder || item.src) && (
                      <ItemMedia item={item} mediaIdx={itemMediaIdxMap.get(item.id + "-main") ?? 0} onMediaClick={handleMediaClick} />
                    )}
                    <ItemInfo item={item} />
                    {/* Extra images */}
                    {item.extraImages && item.extraImages.length > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 8 }}>
                        {item.extraImages.map((img, j) => {
                          const showReal = !img.placeholder && img.src;
                          const extraStart = itemExtraStartMap.get(item.id) ?? 0;
                          const idx = extraStart + (item.extraImages?.slice(0, j).filter(x => !x.placeholder && x.src).length || 0);
                          const inner = (
                            <div style={{ aspectRatio: "16/9", background: "#111", overflow: "hidden", position: "relative" }}>
                              {showReal ? <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "rgba(255,255,255,0.06)", fontSize: 8, letterSpacing: "0.2em" }}>{img.alt}</span></div>}
                            </div>
                          );
                          if (!showReal) return <div key={j}>{inner}</div>;
                          return (
                            <ClickableMedia key={j} mediaIndex={idx} onClick={handleMediaClick} hint="点击放大查看 ↗">
                              {inner}
                            </ClickableMedia>
                          );
                        })}
                      </div>
                    )}
                    {/* Board */}
                    {item.board && (
                      <ClickableMedia mediaIndex={itemMediaIdxMap.get(item.id + "-board") ?? 0} onClick={handleMediaClick} hint="点击放大查看 ↗">
                        <div style={{ marginTop: 12, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>完整展板</p>
                          <div style={{ aspectRatio: "16/10", background: "#111", overflow: "hidden", position: "relative" }}>
                            <img src={item.board} alt="完整展板" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                          </div>
                        </div>
                      </ClickableMedia>
                    )}
                    {/* Poster */}
                    {item.posterImage && (
                      <ClickableMedia mediaIndex={itemMediaIdxMap.get(item.id + "-poster") ?? 0} onClick={handleMediaClick} hint="点击放大查看 ↗">
                        <div style={{ marginTop: 12, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>宣传海报</p>
                          <div style={{ aspectRatio: "16/10", background: "#111", overflow: "hidden", position: "relative" }}>
                            <img src={item.posterImage} alt="宣传海报" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                          </div>
                        </div>
                      </ClickableMedia>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {capability.relatedProjects && capability.relatedProjects.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: 13, letterSpacing: "0.3em", color: "#ef4444", marginBottom: 16 }}>查看完整项目</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {capability.relatedProjects.map((proj) => (
                  <button key={proj.title} onClick={() => scrollToProject(proj.targetId)}
                    style={{ textAlign: "left", fontSize: 16, color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                    {proj.title} <span style={{ color: "#ef4444" }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

    </div>
  );

  const portal = (
    <>
      {drawer}
      {/* Media Viewer — sibling level, outside drawer overlay */}
      {mediaViewerOpen && allMedia.length > 0 && (
        <MediaViewer items={allMedia} startIndex={mediaStartIdx} onClose={closeMediaViewer} />
      )}
    </>
  );

  if (typeof window === "undefined") return null;
  return createPortal(portal, document.body);
}

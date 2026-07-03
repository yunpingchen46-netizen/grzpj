"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ABOUT_DATA } from "@/data/about";

export default function AboutDrawer({ onClose }: { onClose: () => void }) {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.drawerOpen = "true";
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
  }, [onClose]);

  const d = ABOUT_DATA;

  const drawer = (
    <div ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.72)", overflow: "hidden" }}
      onClick={(e: React.MouseEvent) => { if (e.target === e.currentTarget) onClose(); }}>
      <aside
        style={{ position: "absolute", top: 0, right: 0, width: "min(84vw, 1400px)", height: "100dvh", display: "grid", gridTemplateRows: "auto minmax(0, 1fr)", background: "#050505", overflow: "hidden" }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {/* Header */}
        <header style={{ position: "relative", zIndex: 2, background: "#050505", flexShrink: 0, padding: "clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px) 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, color: "rgba(255,255,255,0.4)", fontSize: 14, letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}>关闭<span style={{ fontSize: 20, marginLeft: 4 }}>×</span></button>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>ABOUT</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff" }}>{d.name}</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{d.role}</p>
        </header>

        {/* Body */}
        <div ref={drawerBodyRef} style={{ minHeight: 0, overflowY: "scroll", overflowX: "hidden", overscrollBehaviorY: "contain", touchAction: "pan-y", padding: "clamp(16px, 2vw, 32px) clamp(24px, 4vw, 48px) 80px" }}>
          {/* Contact */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginBottom: 40, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            {d.contact.map((c) => (
              <span key={c.label}><span style={{ color: "rgba(255,255,255,0.2)" }}>{c.label}</span> {c.value}</span>
            ))}
          </div>

          {/* Sections */}
          {d.sections.map((section) => (
            <div key={section.id} style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 13, letterSpacing: "0.2em", color: "#ef4444", marginBottom: 16 }}>{section.title}</h3>

              {section.type === "info" && section.items?.map((item, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{item.label}</span>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{item.content}</p>
                </div>
              ))}

              {section.type === "text" && (
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 640 }}>{section.content}</p>
              )}

              {section.type === "skills" && section.items?.map((item, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>{item.label}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.tags?.map((tag) => (
                      <span key={tag} style={{ padding: "3px 10px", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}

              {section.type === "experience" && section.items?.map((item, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>{item.content}</p>
                  {item.tags?.map((tag) => (
                    <p key={tag} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>{tag}</p>
                  ))}
                </div>
              ))}

              {section.type === "projects" && section.items?.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", minWidth: 200 }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.content}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(drawer, document.body);
}

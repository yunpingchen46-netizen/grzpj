"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

export interface MediaItem {
  id?: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title?: string;
  alt?: string;
}

export default function MediaViewer({
  items,
  startIndex,
  onClose,
}: {
  items: MediaItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const safeStart = Math.min(startIndex, Math.max(0, items.length - 1));
  const [index, setIndex] = useState(safeStart);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const item = items.length > 0 ? items[Math.min(index, items.length - 1)] : null;
  const isBilibili = item?.src?.includes("player.bilibili.com");
  const isVideo = !isBilibili && item?.type === "video";
  const isImage = !isBilibili && item?.type === "image";

  const goNext = useCallback(() => {
    if (index < items.length - 1) {
      if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
      setIndex(index + 1);
    }
  }, [index, items.length]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
      setIndex(index - 1);
    }
  }, [index]);

  const handleClose = useCallback(() => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    onClose();
  }, [onClose]);

  // Keyboard — stop propagation so drawer doesn't also receive ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); handleClose(); return; }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey, true); // capture phase
    // Focus close button
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey, true);
    };
  }, [handleClose, goPrev, goNext]);

  if (!item) return null;

  const hasMultiple = items.length > 1;

  const drawer = (
    <div
      className="media-viewer-overlay"
      style={{
        position: "fixed", inset: 0, zIndex: 100000,
        background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column",
      }}
      onClick={(e: React.MouseEvent) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleClose(); }}
        aria-label="关闭媒体查看器"
        style={{
          position: "absolute", top: 24, right: 24, zIndex: 10,
          color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: "0.1em",
          background: "none", border: "none", cursor: "pointer",
        }}
      >
        关闭 <span style={{ fontSize: 20, marginLeft: 4 }}>×</span>
      </button>

      {/* Title */}
      {item.title && (
        <p style={{
          position: "absolute", top: 24, left: 24, zIndex: 10,
          color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.15em",
        }}>
          {item.title}
          {hasMultiple && <span style={{ marginLeft: 12, color: "rgba(255,255,255,0.25)" }}>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>}
        </p>
      )}

      {/* Media */}
      <div style={{ maxWidth: "92vw", maxHeight: "88dvh", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={(e) => e.stopPropagation()}>
        {isBilibili ? (
          <iframe src={item.src} allowFullScreen
            style={{ width: "92vw", height: "85dvh", border: "none" }} />
        ) : isVideo ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            autoPlay
            style={{ maxWidth: "92vw", maxHeight: "85dvh", objectFit: "contain" }}
          />
        ) : isImage ? (
          <div ref={imageScrollRef} style={{ maxWidth: "92vw", maxHeight: "88dvh", overflowY: "auto", overflowX: "hidden", overscrollBehavior: "contain" }}>
            <img src={item.src} alt={item.alt || item.title || ""}
              style={{ display: "block", maxWidth: "92vw", height: "auto", objectFit: "contain" }} />
          </div>
        ) : null}
      </div>

      {/* Nav arrows */}
      {hasMultiple && (
        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 24, alignItems: "center" }}>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} disabled={index === 0}
            style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)", background: "none", color: index === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)", cursor: index === 0 ? "default" : "pointer", fontSize: 18 }}
            aria-label="上一项">←</button>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, minWidth: 60, textAlign: "center" }}>
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} disabled={index === items.length - 1}
            style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)", background: "none", color: index === items.length - 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)", cursor: index === items.length - 1 ? "default" : "pointer", fontSize: 18 }}
            aria-label="下一项">→</button>
        </div>
      )}
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(drawer, document.body);
}

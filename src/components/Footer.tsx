"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [qrOpen, setQrOpen] = useState<"wechat" | "xhs" | null>(null);

  useEffect(() => {
    if (!qrOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setQrOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [qrOpen]);

  const qrSrc = qrOpen === "wechat" ? "/assets/contact/wechat-qr.webp" : qrOpen === "xhs" ? "/assets/contact/xiaohongshu-qr.webp" : "";
  const qrTitle = qrOpen === "wechat" ? "微信" : "小红书";

  return (
    <footer id="page-footer" className="page-footer py-[60px] bg-background text-foreground border-t border-[#1d1d1d]">
      <div className="max-w-[1600px] mx-auto px-[8px]">
        {/* Top row: Logo + Social Links */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-[60px]">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="CLM Studio">
            <span className="font-[family-name:var(--font-heading)] text-[24px] font-semibold tracking-[-0.02em] text-foreground">
              CLM<span className="text-foreground/30">.</span>
            </span>
          </Link>

          {/* Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <button onClick={() => setQrOpen("xhs")} className="font-[family-name:var(--font-heading)] text-[14px] text-foreground/60 hover:text-foreground transition-colors cursor-pointer">小红书</button>
            <button onClick={() => setQrOpen("wechat")} className="font-[family-name:var(--font-heading)] text-[14px] text-foreground/60 hover:text-foreground transition-colors cursor-pointer">微信</button>
          </div>
        </div>

        {/* Bottom row: Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-[#1d1d1d]">
          <p className="font-[family-name:var(--font-text)] text-[14px] text-foreground/40">
            © {new Date().getFullYear()} CLM Studio. AI × Design.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-[family-name:var(--font-text)] text-[14px] text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="font-[family-name:var(--font-text)] text-[14px] text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              服务条款
            </Link>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-[100000] bg-black/90 flex items-center justify-center"
          onClick={() => setQrOpen(null)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQrOpen(null)}
              className="absolute -top-10 right-0 text-white/40 hover:text-white text-xs tracking-wider">关闭</button>
            <p className="text-center text-white/40 text-xs tracking-[0.2em] mb-4">{qrTitle}</p>
            <img src={qrSrc} alt={qrTitle}
              className="max-w-[560px] max-h-[560px] object-contain bg-white p-4" />
          </div>
        </div>
      )}
    </footer>
  );
}

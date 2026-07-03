"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CONTACT_QR = "/assets/contact/wechat-qr.png";

const DROPDOWN_ITEMS = [
  { label: "舆论中的风暴", href: "#storm" },
  { label: "敏感的光", href: "#light" },
  { label: "AI 创作档案", href: "#aigc" },
  { label: "能力领域", href: "#skills" },
  { label: "工作技能", href: "#tools" },
];

const NAV_ITEMS = [
  { label: "作品", href: "#", hasDropdown: true, type: "link" as const },
  { label: "关于我", href: "#", type: "about" as const },
  { label: "联系", href: "/contact", type: "button" as const },
];

function scrollToAnchor(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (t: number, o?: object) => void } | undefined;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    if (lenis) {
      lenis.scrollTo(top, { duration: 1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export default function Header({ onAboutClick }: { onAboutClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!qrOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setQrOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [qrOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ease-in-out",
          "bg-background",
          isScrolled ? "py-3" : "pt-[21px] pb-[34px]"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-[8px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="nav-logo block shrink-0"
            aria-label="CLM Studio"
          >
            <span className="font-[family-name:var(--font-heading)] text-[24px] font-semibold tracking-[-0.02em] text-foreground">
              CLM<span className="text-foreground/30">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav hidden md:block">
            <ul className="flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="single-item relative">
                  {item.type === "button" ? (
                    <button
                      onClick={() => setQrOpen(true)}
                      className="btn btn-primary btn-fill inline-block rounded-full border-2 border-foreground/20 px-5 py-2.5 font-[family-name:var(--font-text)] text-[14px] font-medium leading-[1.12] text-foreground transition-all duration-300 hover:border-foreground cursor-pointer"
                    >
                      <span className="fill-overlay" />
                      <span>{item.label}</span>
                    </button>
                  ) : item.type === "about" ? (
                    <span
                      className="single-item-link relative text-foreground font-[family-name:var(--font-heading)] text-[20px] font-normal leading-[1.2] hover:opacity-70 transition-opacity cursor-pointer"
                      onClick={() => onAboutClick?.()}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <div
                      className="relative"
                      onMouseEnter={item.hasDropdown ? handleDropdownEnter : undefined}
                      onMouseLeave={item.hasDropdown ? handleDropdownLeave : undefined}
                    >
                      <span
                        className="single-item-link relative text-foreground font-[family-name:var(--font-heading)] text-[20px] font-normal leading-[1.2] hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <span className="inline-block ml-1 text-xs align-middle">▾</span>
                        )}
                      </span>

                      {/* Dropdown */}
                      {item.hasDropdown && dropdownOpen && (
                        <div
                          className="absolute top-full left-0 pt-2 z-50"
                        >
                          <div className="bg-background border border-foreground/10 shadow-lg min-w-[200px]">
                            {DROPDOWN_ITEMS.map((d) => (
                              <button
                                key={d.href}
                                onClick={() => { scrollToAnchor(d.href); setDropdownOpen(false); }}
                                className="block w-full text-left px-4 py-2.5 text-[14px] text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-colors group"
                                title="点击查看"
                              >
                                {d.label}
                                <span className="ml-2 text-[10px] text-foreground/0 group-hover:text-foreground/20 transition-colors">→</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger md:hidden relative w-8 h-6 flex flex-col justify-between"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block h-[2px] bg-foreground transition-all duration-300 origin-center",
                isMenuOpen && "rotate-45 translate-y-[5px]"
              )}
            />
            <span
              className={cn(
                "block h-[2px] bg-foreground transition-all duration-300",
                isMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-[2px] bg-foreground transition-all duration-300 origin-center",
                isMenuOpen && "-rotate-45 -translate-y-[5px]"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[998] bg-black flex flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item) =>
            item.type === "button" ? (
              <button
                key={item.label}
                onClick={() => { setQrOpen(true); setIsMenuOpen(false); }}
                className="btn btn-primary btn-fill rounded-full border-2 border-foreground px-8 py-3 font-[family-name:var(--font-text)] text-[16px] font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
              >
                {item.label}
              </button>
            ) : item.type === "about" ? (
              <span
                key={item.label}
                className="text-white font-[family-name:var(--font-heading)] text-[32px] font-medium hover:opacity-70 transition-opacity cursor-pointer"
                onClick={() => { onAboutClick?.(); setIsMenuOpen(false); }}
              >
                {item.label}
              </span>
            ) : item.hasDropdown ? (
              <div key={item.label} className="flex flex-col items-center gap-4">
                <span className="text-white font-[family-name:var(--font-heading)] text-[20px] font-medium">
                  {item.label}
                </span>
                {DROPDOWN_ITEMS.map((d) => (
                  <button
                    key={d.href}
                    onClick={() => { scrollToAnchor(d.href); setIsMenuOpen(false); }}
                    className="text-white/40 font-[family-name:var(--font-heading)] text-[18px] hover:text-white transition-colors"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-white font-[family-name:var(--font-heading)] text-[32px] font-medium hover:opacity-70 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}

      {/* Contact QR Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-[100001] bg-black/90 flex items-center justify-center"
          onClick={() => setQrOpen(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQrOpen(false)}
              className="absolute -top-10 right-0 text-white/40 hover:text-white text-xs tracking-wider">关闭</button>
            <p className="text-center text-white/40 text-xs tracking-[0.2em] mb-4">微信</p>
            <img src={CONTACT_QR} alt="微信二维码"
              className="max-w-[560px] max-h-[560px] object-contain bg-white p-4" />
          </div>
        </div>
      )}
    </>
  );
}

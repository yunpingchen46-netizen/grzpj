"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;
const flipWords = ["设计", "开发", "创意", "体验", "产品"];

interface SplitLineProps {
  children: React.ReactNode;
  delay?: number;
  size?: "lg" | "md" | "sm";
}

const sizeClasses = {
  lg: "pt-[24px] pb-[28px] -mt-[24px] -mb-[32px]",
  md: "pt-[16px] pb-[18px] -mt-[16px] -mb-[22px]",
  sm: "pt-[10px] pb-[12px] -mt-[10px] -mb-[16px]",
};

function SplitLine({ children, delay = 0, size = "lg" }: SplitLineProps) {
  return (
    <div
      className={`split-line-wrapper overflow-hidden relative ${sizeClasses[size]}`}
      aria-hidden={false}
    >
      <motion.div
        className="relative block"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: easeOut }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function HeroTitle() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % flipWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero_title pt-[182px] pb-[60px] bg-background text-foreground">
      <div className="container max-w-[1600px] mx-auto px-[8px]">
        <h1 className="title font-[family-name:var(--font-heading)] text-[clamp(48px,7.5vw,108px)] font-semibold leading-[1.1] tracking-[-0.02em] pb-2">
          <span className="block">
            <SplitLine delay={0}>陈雷鸣</SplitLine>
            <SplitLine delay={0.1}>
              <span className="flex items-baseline pl-[120px]" style={{ gap: "0.3em" }}>
                <span>AI ×</span>
                <span
                  className="relative inline-block overflow-hidden text-red-500 pt-2 -mt-2"
                  style={{ minWidth: "1.5em" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      className="inline-block"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeOut }}
                    >
                      {flipWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </SplitLine>
            <SplitLine delay={0.3} size="md">
              <span className="text-[clamp(48px,6.5vw,88px)] font-medium">
                交互设计 / AIGC
              </span>
            </SplitLine>
          </span>
        </h1>

        <motion.p
          className="font-[family-name:var(--font-text)] text-[clamp(16px,1.4vw,22px)] text-foreground/50 mt-[96px] leading-[1.4]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeOut }}
        >
          关注智能工具、内容生成与沉浸式交互体验
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="font-[family-name:var(--font-text)] text-[clamp(16px,1.4vw,22px)] text-foreground/50 mt-1 leading-[1.4] whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: easeOut }}
        >
          探索人工智能与视觉设计的交汇点 — 创造超越想象的数字体验
        </motion.p>
      </div>
    </section>
  );
}

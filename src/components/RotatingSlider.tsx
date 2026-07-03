"use client";

import { useState, useEffect } from "react";

const ROTATING_ITEMS = [
  { text: "AI 驱动的品牌识别", image: "/images/slider/slide-1.jpg" },
  { text: "生成式视觉系统", image: "/images/slider/slide-2.jpg" },
  { text: "智能交互体验", image: "/images/slider/slide-3.jpg" },
  { text: "数据叙事设计", image: "/images/slider/slide-4.jpg" },
  { text: "动态视觉实验", image: "/images/slider/slide-5.jpg" },
  { text: "参数化创意工具", image: "/images/slider/slide-6.jpg" },
  { text: "跨媒介品牌策略", image: "/images/slider/slide-7.jpg" },
  { text: "AI 协作创作流程", image: "/images/slider/slide-8.jpg" },
];

export default function RotatingSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATING_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="rotating_slider py-[80px] md:py-[120px] bg-black text-foreground overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-[25px]">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-20">
          {/* Text */}
          <div className="md:w-1/2 shrink-0">
            <p className="font-[family-name:var(--font-heading)] text-[clamp(24px,2.5vw,36px)] font-medium leading-[1.2] tracking-[-0.01em] max-w-[500px]">
              不接重复的案子。每个项目都是一次全新的 AI × 设计的实验 — 探索机器智能与人类审美的化学反应。
            </p>
          </div>

          {/* Rotating Items */}
          <div className="md:w-1/2 relative h-[200px] md:h-[300px]">
            {ROTATING_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
              >
                <div className="text-center">
                  <div className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-lg bg-[#1d1d1d] mx-auto mb-4 flex items-center justify-center text-foreground/10 text-4xl">
                    ⚡
                  </div>
                  <p className="font-[family-name:var(--font-heading)] text-[20px] md:text-[28px] font-medium text-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {ROTATING_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-white w-6"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`切换到第 ${index + 1} 项`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Neural Brand System",
    category: "AI 品牌设计",
    thumbnailUrl: "/images/featured/neural-brand.webp",
    href: "/portfolio/neural-brand",
  },
  {
    id: 2,
    title: "GenType 字体生成器",
    category: "AI 工具",
    thumbnailUrl: "/images/featured/gentype.webp",
    href: "/portfolio/gentype",
  },
  {
    id: 3,
    title: "DreamSpace 空间设计",
    category: "AI + 3D",
    thumbnailUrl: "/images/featured/dreamspace.webp",
    href: "/portfolio/dreamspace",
  },
  {
    id: 4,
    title: "DataViz 数据可视化",
    category: "信息设计",
    thumbnailUrl: "/images/featured/dataviz.webp",
    href: "/portfolio/dataviz",
  },
  {
    id: 5,
    title: "PromptCraft 提示词工程",
    category: "AI 创作",
    thumbnailUrl: "/images/featured/promptcraft.webp",
    href: "/portfolio/promptcraft",
  },
  {
    id: 6,
    title: "Motion × AI 动态实验",
    category: "动态设计",
    thumbnailUrl: "/images/featured/motion-ai.webp",
    href: "/portfolio/motion-ai",
  },
  {
    id: 7,
    title: "BrandLab 品牌实验室",
    category: "品牌策略",
    thumbnailUrl: "/images/featured/brandlab.webp",
    href: "/portfolio/brandlab",
  },
  {
    id: 8,
    title: "SonicForm 声音可视化",
    category: "实验项目",
    thumbnailUrl: "/images/featured/sonicform.webp",
    href: "/portfolio/sonicform",
  },
];

export default function FeaturedWorkSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToProject = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft - 100,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="featured_work_slider py-[80px] md:py-[120px] bg-background text-foreground">
      <div className="max-w-[1600px] mx-auto px-[8px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-[100px] gap-6">
          <h2 className="font-[family-name:var(--font-text)] text-[clamp(36px,3.8vw,56px)] font-medium leading-[0.95] tracking-[-0.02em] mb-4">
            精选作品
          </h2>
          <Link
            href="/portfolio"
            className="font-[family-name:var(--font-text)] text-[22px] font-medium leading-[1.2] tracking-[-0.01em] text-foreground hover:opacity-70 transition-opacity inline-flex items-center gap-2"
          >
            查看全部作品
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Project Cards Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          {FEATURED_PROJECTS.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              className="flex-shrink-0 w-[280px] md:w-[360px] snap-start group"
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="video-thumbnail rounded-lg overflow-hidden aspect-[3/4] bg-[#1d1d1d] mb-4 flex flex-col items-center justify-center">
                <span className="text-foreground/10 text-4xl mb-2">⚡</span>
                <span className="text-foreground/10 text-xs">{project.category}</span>
              </div>
              <h3 className="font-[family-name:var(--font-text)] text-[24px] font-medium leading-[0.92] tracking-[0.004em] text-foreground group-hover:opacity-70 transition-opacity">
                {project.title}
              </h3>
              <p className="font-[family-name:var(--font-text)] text-[14px] text-foreground/40 mt-1">
                {project.category}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

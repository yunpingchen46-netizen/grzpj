const SOFTWARE = [
  { name: "Figma", icon: "figma" },
  { name: "Photoshop", icon: "photoshop" },
  { name: "Illustrator", icon: "illustrator" },
  { name: "After Effects", icon: "aftereffects" },
  { name: "Premiere", icon: "premiere" },
  { name: "Blender", icon: "blender" },
];

const AI_TOOLS = [
  { name: "Midjourney", icon: "midjourney" },
  { name: "GPT", icon: "chatgpt" },
  { name: "Gemini", icon: "gemini" },
  { name: "即梦", icon: "jimeng.webp" },
  { name: "可灵", icon: "kling.webp" },
  { name: "Codex", icon: "codex" },
  { name: "Claude Code", icon: "claude" },
];

function ToolIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-default">
      <img
        src={`/icons/${icon}${icon.includes(".") ? "" : ".svg"}`}
        alt={name}
        className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <span className="font-[family-name:var(--font-text)] text-[13px] text-foreground/40 group-hover:text-foreground/70 transition-colors text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export default function SliderWithText() {
  return (
    <section className="py-[80px] md:py-[120px] bg-background text-foreground">
      <div className="max-w-[1600px] mx-auto px-[8px]">
        <h2 className="font-[family-name:var(--font-text)] text-[clamp(36px,3.8vw,56px)] font-medium leading-[0.95] tracking-[-0.02em] mb-[80px]">
          工作技能
        </h2>

        {/* Software Row */}
        <div className="flex flex-wrap gap-8 mb-[60px]">
          {SOFTWARE.map((tool) => (
            <ToolIcon key={tool.name} {...tool} />
          ))}
        </div>

        {/* AI Tools Row */}
        <div className="flex flex-wrap gap-8 mb-6">
          {AI_TOOLS.map((tool) => (
            <ToolIcon key={tool.name} {...tool} />
          ))}
        </div>

        <p className="font-[family-name:var(--font-text)] text-[13px] md:text-[14px] text-foreground/25 max-w-xl">
          具备 AI 驱动的完整内容生产流程能力（图像 / 视频 / 音频 / 设计 / 交互）
        </p>
      </div>
    </section>
  );
}

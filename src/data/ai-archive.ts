export interface AIArchiveItem {
  id: string;
  title: string;
  period: string;
  category: string[];
  tools: string[];
  type: "image" | "video";
  src?: string;
  poster?: string;
  alt: string;
  placeholder: boolean;
  description?: string;
}

export interface AIArchivePeriod {
  id: string;
  timeLabel: string;
  title: string;
  models: string[];
  items: AIArchiveItem[];
}

export const AI_ARCHIVE_TITLE = "AI 创作档案";
export const AI_ARCHIVE_ENGLISH = "AI CREATIVE ARCHIVE";
export const AI_ARCHIVE_SUBTITLE = "记录生成模型与视觉方法的持续演进";

export const AI_CAPABILITIES = [
  "视觉方向与风格控制",
  "提示词结构与迭代设计",
  "文生图与参考图生成",
  "局部修改、扩图与画面重构",
  "角色、场景与视觉一致性",
  "图生视频与镜头运动控制",
  "多模型与工具工作流整合",
  "剪辑、音效与成片输出",
];

export const AI_ALL_TOOLS = [
  "Midjourney",
  "GPT Image",
  "Gemini",
  "即梦",
  "可灵",
  "Photoshop",
  "Premiere Pro",
  "After Effects",
];

export const AI_WORKFLOW = [
  { index: "01", title: "CONCEPT", subtitle: "主题与视觉方向" },
  { index: "02", title: "PROMPT", subtitle: "镜头设计与生成策略" },
  { index: "03", title: "GENERATION", subtitle: "模型选择与图像生成" },
  { index: "04", title: "REFINEMENT", subtitle: "筛选、编辑与一致性控制" },
  { index: "05", title: "MOTION", subtitle: "图生视频与镜头运动" },
  { index: "06", title: "DELIVERY", subtitle: "剪辑、声音与最终成片" },
];

export const AI_FILTERS = [
  { key: "all", label: "全部" },
  { key: "image", label: "图像" },
  { key: "video", label: "视频" },
] as const;

export const AI_ARCHIVE_PERIODS: AIArchivePeriod[] = [
  {
    id: "2025-early",
    timeLabel: "2025 / EARLY",
    title: "早期视觉探索",
    models: ["Midjourney", "即梦"],
    items: [
      { id: "2025-e-01", title: "早期探索 01", period: "2025-early", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-01.webp", alt: "早期探索 01", placeholder: false, description: "人物生成早期实验" },
      { id: "2025-e-02", title: "银杏秋日", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-02.webp", alt: "银杏秋日 01", placeholder: false, description: "自然场景与细节生成" },
      { id: "2025-e-03", title: "银杏秋日 02", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-03.webp", alt: "银杏秋日 02", placeholder: false, description: "自然场景变体探索" },
      { id: "2025-e-04", title: "雪中门扉 01", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-04.webp", alt: "雪中门扉 01", placeholder: false, description: "黎明雪景与氛围营造" },
      { id: "2025-e-05", title: "雪中门扉 02", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-05.webp", alt: "雪中门扉 02", placeholder: false, description: "雪景变体与光线调整" },
      { id: "2025-e-06", title: "梅花苦寒", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-06.webp", alt: "梅花苦寒", placeholder: false, description: "意境场景与东方美学" },
      { id: "2025-e-07", title: "奇虎 01", period: "2025-early", category: ["image", "character"], tools: ["即梦"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-07.webp", alt: "奇虎 01", placeholder: false, description: "角色概念设计" },
      { id: "2025-e-08", title: "奇虎 02", period: "2025-early", category: ["image", "character"], tools: ["即梦"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-08.webp", alt: "奇虎 02", placeholder: false, description: "角色姿态变体" },
      { id: "2025-e-09", title: "奇虎 03", period: "2025-early", category: ["image", "character"], tools: ["即梦"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-09.webp", alt: "奇虎 03", placeholder: false, description: "角色风格定稿" },
      { id: "2025-e-10", title: "花 01", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-10.webp", alt: "花 01", placeholder: false, description: "花卉视觉实验" },
      { id: "2025-e-11", title: "花 02", period: "2025-early", category: ["image", "environment"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-early/2025-early-11.webp", alt: "花 02", placeholder: false, description: "花卉风格变体" },
    ],
  },
  {
    id: "2025-late",
    timeLabel: "2025 / LATE",
    title: "风格与一致性实验",
    models: ["Midjourney"],
    items: [
      { id: "2025-l-01", title: "风格探索 01", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-01.webp", alt: "风格探索 01", placeholder: false, description: "角色风格探索与一致性控制" },
      { id: "2025-l-02", title: "风格探索 02", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-02.webp", alt: "风格探索 02", placeholder: false, description: "多视角角色一致性实验" },
      { id: "2025-l-03", title: "风格探索 03", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-03.webp", alt: "风格探索 03", placeholder: false, description: "人物面部风格变体" },
      { id: "2025-l-04", title: "风格探索 04", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-04.webp", alt: "风格探索 04", placeholder: false, description: "系列角色设计迭代" },
      { id: "2025-l-05", title: "风格探索 05", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-05.webp", alt: "风格探索 05", placeholder: false, description: "人物姿态与构图研究" },
      { id: "2025-l-06", title: "风格探索 06", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-06.webp", alt: "风格探索 06", placeholder: false, description: "高清角色渲染测试" },
      { id: "2025-l-07", title: "风格探索 07", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-07.webp", alt: "风格探索 07", placeholder: false, description: "角色光影与氛围研究" },
      { id: "2025-l-08", title: "风格探索 08", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-08.webp", alt: "风格探索 08", placeholder: false, description: "服装与造型设计实验" },
      { id: "2025-l-09", title: "风格探索 09", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-09.webp", alt: "风格探索 09", placeholder: false, description: "表情与神态控制" },
      { id: "2025-l-10", title: "风格探索 10", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-10.webp", alt: "风格探索 10", placeholder: false, description: "早期风格参考实验" },
      { id: "2025-l-11", title: "风格探索 11", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-11.webp", alt: "风格探索 11", placeholder: false, description: "风格变体与混合" },
      { id: "2025-l-12", title: "风格探索 12", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-12.webp", alt: "风格探索 12", placeholder: false, description: "系列视觉一致性检查" },
      { id: "2025-l-13", title: "风格探索 13", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-13.webp", alt: "风格探索 13", placeholder: false, description: "提示词微调与效果对比" },
      { id: "2025-l-14", title: "风格探索 14", period: "2025-late", category: ["image", "character"], tools: ["Midjourney"], type: "image", src: "/assets/projects/ai-archive/2025-late/2025-late-14.webp", alt: "风格探索 14", placeholder: false, description: "最终风格锁定与批量生成" },
    ],
  },
  {
    id: "2026-early",
    timeLabel: "2026 / EARLY",
    title: "电影感与镜头实验",
    models: ["GPT Image", "Midjourney"],
    items: [
      { id: "2026-e-01", title: "电影感场景 01", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-01.webp", alt: "电影感场景 01", placeholder: false, description: "GPT Image 电影感环境生成" },
      { id: "2026-e-02", title: "电影感场景 02", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-02.webp", alt: "电影感场景 02", placeholder: false, description: "GPT Image 镜头构图研究" },
      { id: "2026-e-03", title: "电影感场景 03", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-03.webp", alt: "电影感场景 03", placeholder: false, description: "GPT Image 光影与氛围" },
      { id: "2026-e-04", title: "电影感场景 04", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-04.webp", alt: "电影感场景 04", placeholder: false, description: "GPT Image 场景光影研究" },
      { id: "2026-e-05", title: "电影感场景 05", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-05.webp", alt: "电影感场景 05", placeholder: false, description: "GPT Image 环境色彩实验" },
      { id: "2026-e-06", title: "电影感场景 06", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-06.webp", alt: "电影感场景 06", placeholder: false, description: "GPT Image 电影级构图" },
      { id: "2026-e-07", title: "电影感场景 07", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-07.webp", alt: "电影感场景 07", placeholder: false, description: "GPT Image 大场景生成" },
      { id: "2026-e-08", title: "电影感场景 08", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-08.webp", alt: "电影感场景 08", placeholder: false, description: "GPT Image 环境叙事研究" },
      { id: "2026-e-09", title: "电影感场景 09", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-09.webp", alt: "电影感场景 09", placeholder: false, description: "GPT Image 夜景氛围实验" },
      { id: "2026-e-10", title: "电影感场景 10", period: "2026-early", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-early/2026-early-10.webp", alt: "电影感场景 10", placeholder: false, description: "GPT Image 电影感综合探索" },
    ],
  },
  {
    id: "2026-current",
    timeLabel: "2026 / CURRENT",
    title: "当前生成实验",
    models: ["GPT Image", "Gemini", "Midjourney", "即梦"],
    items: [
      { id: "2026-c-01", title: "当前实验 01", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-01.webp", alt: "当前实验 01", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-02", title: "当前实验 02", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-02.webp", alt: "当前实验 02", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-03", title: "当前实验 03", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-03.webp", alt: "当前实验 03", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-04", title: "当前实验 04", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-04.webp", alt: "当前实验 04", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-05", title: "当前实验 05", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-05.webp", alt: "当前实验 05", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-06", title: "当前实验 06", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-06.webp", alt: "当前实验 06", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-07", title: "当前实验 07", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-07.webp", alt: "当前实验 07", placeholder: false, description: "GPT Image 场景生成" },
      { id: "2026-c-08", title: "当前实验 08", period: "2026-current", category: ["image", "environment"], tools: ["GPT Image"], type: "image", src: "/assets/projects/ai-archive/2026-current/2026-current-08.webp", alt: "当前实验 08", placeholder: false, description: "GPT Image 场景生成" },
    ],
  },
];

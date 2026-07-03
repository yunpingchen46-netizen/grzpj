export interface AboutSection {
  id: string;
  title: string;
  type: "info" | "text" | "skills" | "experience" | "projects" | "contact";
  items?: { label: string; content: string; tags?: string[] }[];
  content?: string;
}

export interface AboutData {
  name: string;
  role: string;
  contact: { label: string; value: string }[];
  sections: AboutSection[];
}

export const ABOUT_DATA: AboutData = {
  name: "陈雷鸣",
  role: "交互设计 / AIGC内容设计 / AI工具应用",
  contact: [
    { label: "电话", value: "15323550027" },
    { label: "邮箱", value: "3472354406@qq.com" },
    { label: "地址", value: "广东潮州" },
  ],
  sections: [
    {
      id: "about-education",
      title: "教育背景",
      type: "info",
      items: [
        { label: "汕头大学", content: "长江艺术与设计学院 · 数字媒体艺术" },
        { label: "时间", content: "2022.09 - 2026.06 · GPA 4.22" },
        { label: "主修", content: "交互设计 / UI设计 / 用户体验设计 / 数字媒体艺术" },
      ],
    },
    {
      id: "about-intro",
      title: "个人简介",
      type: "text",
      content: "具备交互设计与AIGC内容创作能力，关注AI驱动的视觉生成与内容生产流程。熟悉 AI 图像生成、视频生成、提示词设计与基础AI工作流，能够完成从概念 → 生成 → 编辑 → 输出的完整创作链路。正在深入学习 Agent / Codex / Claude Code，并尝试将AI能力与交互设计结合。",
    },
    {
      id: "about-skills",
      title: "技能能力",
      type: "skills",
      items: [
        { label: "设计能力", content: "", tags: ["UI设计", "交互设计", "用户体验设计", "信息架构", "动效设计"] },
        { label: "AI / AIGC 能力", content: "", tags: ["AI图像生成", "AI视频生成", "Prompt设计", "AI内容生产流程", "Agent基础理解"] },
        { label: "软件工具", content: "", tags: ["Figma", "Photoshop", "Illustrator", "After Effects", "Premiere", "Blender"] },
        { label: "AI 工具", content: "", tags: ["Midjourney", "GPT / GPT Image", "Gemini", "即梦", "可灵", "Codex", "Claude Code"] },
      ],
    },
    {
      id: "about-experience",
      title: "实习经历",
      type: "experience",
      items: [
        {
          label: "AI内容实习生 · 北京锦锐文化传媒有限公司",
          content: "2025.06 - 2025.09",
          tags: [
            "参与AI内容生产全流程制作",
            "使用Midjourney生成分镜与视觉素材",
            "使用AI工具生成图片与视频内容",
            "使用Premiere完成剪辑、音效与包装",
            "参与从文案到成片的完整AIGC工作流",
          ],
        },
      ],
    },
    {
      id: "about-projects",
      title: "项目经历",
      type: "projects",
      items: [
        { label: "乡村无障碍阅读APP", content: "UI / 交互设计" },
        { label: "数字媒体设计工具包", content: "信息架构 / 内容设计" },
        { label: "AIGC视觉创作实践", content: "Prompt / 视觉生成 / 视频生成" },
      ],
    },
  ],
};

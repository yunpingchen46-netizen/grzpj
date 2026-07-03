import { ProjectShowcaseData } from "@/types/project";

export const sensitiveLightData: ProjectShowcaseData = {
  index: "02",
  category: "INTERACTIVE GAME",
  year: "2025",
  title: "敏感的光",
  englishTitle: "THE SENSITIVE LIGHT",
  slogan: "PUT STRESS IN PERSPECTIVE",
  subtitle: "压力认知互动实验 / 网页游戏 / 数据可视化",
  tags: ["INTERACTIVE WEB GAME", "SOCIAL EXPERIMENT"],
  overview: [
    "《敏感的光》是一款以压力认知为主题的互动网页游戏。",
    "作品使用「光」作为压力的视觉隐喻，通过倒计时、光源衰减、声音反馈和数据对比，让玩家经历从感受压力、理解压力，到重新面对压力的过程。",
  ],
  stages: [
    {
      index: "01",
      title: "FEEL",
      subtitle: "感受压力",
      description:
        "玩家需要在倒计时内追逐不断衰减的光源。距离、时间、失败反馈和紧张音效共同制造任务压力。",
    },
    {
      index: "02",
      title: "UNDERSTAND",
      subtitle: "理解压力",
      description:
        "游戏通过个人与群体数据的对比，让玩家发现压力并非孤立的个人问题，而是一种普遍存在的社会状态。",
    },
    {
      index: "03",
      title: "RESPOND",
      subtitle: "面对压力",
      description:
        "体验逐渐从追逐和竞争转向理解与接纳，引导玩家正确认识压力，并寻找适合自己的调节方式。",
    },
  ],
  roles: [
    {
      label: "RESEARCH",
      content: "压力议题研究 / 资料收集 / 数据整理",
    },
    {
      label: "CONCEPT",
      content: "项目概念 / 三阶段叙事 / 体验结构",
    },
    {
      label: "GAME DESIGN",
      content: "关卡机制 / 倒计时 / 光源衰减 / 失败反馈",
    },
    {
      label: "VISUAL & SOUND",
      content: "光影视觉 / 界面设计 / 动效节奏 / 音效设计",
    },
    {
      label: "DEVELOPMENT",
      content: "网页搭建 / 交互实现 / 代码修改 / 功能调试",
    },
    {
      label: "TESTING",
      content: "试玩测试 / 问题修复 / 体验迭代",
    },
  ],
  tools: [
    {
      name: "Bolt",
      description: "AI辅助网站搭建与初始代码实现",
    },
    {
      name: "Cursor",
      description: "代码修改、功能调试与交互迭代",
    },
    {
      name: "Epidemic Sound",
      description: "背景音乐与游戏音效素材",
    },
  ],
  route: [
    {
      index: "01",
      title: "RESEARCH",
      subtitle: "议题研究",
      description: "压力资料与社会背景",
    },
    {
      index: "02",
      title: "CONCEPT",
      subtitle: "概念设计",
      description: "光作为压力隐喻",
    },
    {
      index: "03",
      title: "GAME SYSTEM",
      subtitle: "机制设计",
      description: "关卡、衰减与反馈",
    },
    {
      index: "04",
      title: "DEVELOPMENT",
      subtitle: "开发实现",
      description: "网页、交互与音效",
    },
    {
      index: "05",
      title: "TESTING",
      subtitle: "测试迭代",
      description: "试玩、修复与优化",
    },
  ],
  video: "/assets/projects/sensitive-light/game-demo.mp4",
  videoPoster: "/assets/projects/sensitive-light/cover.png",
  onlineImages: [
    { src: "/api/media?pathname=portfolio/sensitive-light/stage-one.gif", label: "01 / FEEL THE PRESSURE", alt: "第一关动态演示" },
    { src: "/api/media?pathname=portfolio/sensitive-light/stage-two.gif", label: "02 / UNDERSTAND", alt: "第二关动态演示" },
    { src: "/api/media?pathname=portfolio/sensitive-light/stage-two-blackhole.gif", label: "02 / BLACKHOLE", alt: "第二关黑洞效果" },
    { src: "/api/media?pathname=portfolio/sensitive-light/stage-three.gif", label: "03 / RESPOND", alt: "第三关动态演示" },
  ],
  images: [],
};

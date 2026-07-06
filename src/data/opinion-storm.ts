import { ProjectShowcaseData } from "@/types/project";

export const opinionStormData: ProjectShowcaseData = {
  index: "01",
  category: "GRADUATION PROJECT",
  year: "2026",
  title: "舆论中的风暴",
  subtitle: "网络舆论线上线下互动体验",
  tags: ["INTERACTIVE INSTALLATION", "WEB EXPERIENCE"],
  overview: [
    "作品将网络舆论中难以察觉的个体参与，转化为一次可以亲身经历的交互体验。",
    "参与者化身内容编辑，在任务压力与碎片信息中选择传播标题，并通过实体风暴、网页粒子反馈与延迟结果，看见一次语言选择如何被逐渐放大。",
  ],
  roles: [
    { label: "RESEARCH", content: "议题研究 / 用户行为分析" },
    { label: "EXPERIENCE", content: "角色任务 / 体验流程 / 反馈机制" },
    { label: "VISUAL & SPACE", content: "装置空间 / 网页界面 / 展览视觉" },
    { label: "WEB & DELIVERY", content: "AI辅助开发 / 功能调试 / 网站部署" },
  ],
  tools: [
    { name: "Gemini", description: "辅助编码、排错与功能迭代" },
    { name: "React", description: "页面结构与交互状态" },
    { name: "TypeScript", description: "类型安全与逻辑组织" },
    { name: "Howler.js", description: "网页音频播放与流程控制" },
    { name: "WebGL", description: "粒子风暴视觉反馈" },
    { name: "GSAP", description: "页面过渡与动效控制" },
  ],
  route: [
    {
      index: "01",
      title: "RESEARCH",
      subtitle: "议题研究",
      description: "网络舆论与用户行为分析",
    },
    {
      index: "02",
      title: "EXPERIENCE",
      subtitle: "体验设计",
      description: "角色任务与交互流程",
    },
    {
      index: "03",
      title: "DESIGN",
      subtitle: "视觉设计",
      description: "装置空间与网页界面",
    },
    {
      index: "04",
      title: "DEVELOPMENT",
      subtitle: "开发实现",
      description: "React / 音频 / 粒子反馈",
    },
    {
      index: "05",
      title: "DELIVERY",
      subtitle: "项目落地",
      description: "Gemini迭代 / 部署 / 展览",
    },
  ],
  video: "//player.bilibili.com/player.html?bvid=BV1jYMA6oEFF&autoplay=0",
  videoPoster: undefined,
  onlineImages: [
    { src: "/assets/projects/opinion-storm/online-01.png", label: "ONLINE EXPERIENCE 01", alt: "线上体验展示 01" },
    { src: "/assets/projects/opinion-storm/online-02.png", label: "ONLINE EXPERIENCE 02", alt: "线上体验展示 02" },
    { src: "/assets/projects/opinion-storm/online-03.png", label: "ONLINE EXPERIENCE 03", alt: "线上体验展示 03" },
  ],
  images: [
    { src: "/assets/projects/opinion-storm/installation.jpg", label: "OFFLINE INSTALLATION", alt: "线下互动装置整体空间" },
    { src: "/assets/projects/opinion-storm/audience.jpg", label: "EXHIBITION EXPERIENCE", alt: "观众进入装置或现场体验照片" },
  ],
  qrcode: "/assets/projects/opinion-storm/qrcode.png",
};

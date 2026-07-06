export interface CapabilityItem {
  id: string;
  title: string;
  type: string;
  year?: string;
  subtitle?: string;
  team?: string;
  duration?: string;
  description: string;
  tools: string[];
  mediaType: "image" | "video";
  src?: string;
  poster?: string;
  alt: string;
  placeholder?: boolean;
  myRole?: string[];
  concept?: string;
  metaphorGroups?: { from: string; to: string }[];
  extraImages?: { src: string; alt: string; placeholder?: boolean; aspectRatio?: string }[];
  board?: string;
  posterImage?: string;
  features?: { label: string; items: string[] }[];
  designNotes?: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  type: "text" | "list" | "grid" | "media" | "insight-map" | "level-list" | "highlight";
  content?: string;
  items?: { label?: string; text?: string; src?: string; alt?: string; placeholder?: boolean }[];
}

export interface CaseStudy {
  projectName: string;
  subtitle: string;
  year: string;
  team: string;
  myRole: string | null;
  coverSrc?: string;
  coverAlt?: string;
  sections: CaseStudySection[];
}

export interface Capability {
  id: string;
  index: string;
  title: string;
  englishLabel: string;
  description: string;
  tools: string[];
  preview: {
    src?: string;
    alt: string;
    placeholder?: boolean;
  };
  items: CapabilityItem[];
  relatedProjects?: {
    title: string;
    targetId: string;
  }[];
  caseStudy?: CaseStudy;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "aigc",
    index: "01",
    title: "AIGC 创作",
    englishLabel: "AIGC CREATION",
    description: "我持续学习并尝试不同类型的 AI 工具，将其应用于视觉生成、动态影像、声音制作、网站开发与交互体验等实际项目。我会根据项目需求选择合适的工具，通过多轮测试、筛选与调整，将生成结果继续推进为可以使用的作品。",
    tools: ["Claude Code", "Gemini", "Bolt", "Cursor", "Midjourney", "GPT Image", "即梦", "可灵"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/previews/preview-aigc.png", alt: "AIGC 创作", placeholder: false },
    items: [],
    relatedProjects: [
      { title: "查看完整项目《舆论中的风暴》 →", targetId: "opinion-storm-project" },
      { title: "查看完整项目《敏感的光》 →", targetId: "sensitive-light-project" },
      { title: "查看 AI 创作档案 →", targetId: "ai-archive" },
    ],
    caseStudy: {
      projectName: "AI 协作创作与开发",
      subtitle: "3 个 AI 协作开发案例 · 多类型 AI 创作工作流",
      year: "2025—NOW",
      team: "个人项目 · 团队项目",
      myRole: null,
      sections: [
        // Case 01: Portfolio
        { id: "aigc-portfolio", title: "01 个人作品集网站", type: "text", content: "围绕个人求职与作品展示需求，使用 Claude Code 持续完成作品集网站的设计、开发和内容迭代。网站将重点项目、AI 创作档案与综合能力整合到统一的视觉系统中。", items: [
          { label: "AI 工具", text: "Claude Code" },
          { label: "项目形式", text: "个人项目 · 持续迭代中" },
          { label: "我的工作", text: "信息架构 / 项目筛选 / 内容编排 / 视觉方向 / 页面布局 / 交互体验 / 需求拆解 / Claude Code 协作 / 功能实现 / 浏览器测试 / 问题定位 / 持续修改" },
        ]},
        { id: "aigc-pf-workflow", title: "AI 协作流程", type: "list", items: [
          { text: "内容规划 → 需求拆解 → Claude Code 读取现有项目 → 组件与功能实现 → 浏览器测试 → 问题定位 → 功能修复 → 内容持续填充" },
        ]},
        { id: "aigc-pf-features", title: "功能亮点", type: "highlight", items: [
          { text: "重点项目全屏编排" }, { text: "AI 创作档案文件架" }, { text: "能力领域悬停预览" },
          { text: "能力作品抽屉" }, { text: "图片放大查看" }, { text: "有声视频播放器" },
          { text: "统一媒体数据结构" }, { text: "移动端响应式适配" },
        ]},
        // Case 02: Opinion Storm
        { id: "aigc-os", title: "02 舆论中的风暴 · 线上体验", type: "text", content: "为了让线下互动装置突破展览空间限制，我将角色任务、碎片语音、标题选择、风暴反馈和结果提示重新设计为一套线上互动体验。使用 Gemini 辅助完成网站功能实现，并负责体验结构、页面设计、素材接入、功能调试和网站部署。", items: [
          { label: "AI 工具", text: "Gemini" },
          { label: "项目形式", text: "个人负责完整线上版本" },
          { label: "AI 协作重点", text: "线下体验转译为网页路径 / 角色任务与阶段推进 / 双音频播放与流程解锁 / 标题选择与隐藏路径 / 粒子风暴视觉反馈 / 结果页面与延迟提示 / 功能测试与网站部署" },
        ]},
        { id: "aigc-os-media", title: "线上体验截图与视频", type: "media", items: [
          { src: "https://grzpj.vercel.app/assets/capabilities/aigc/portfolio/portfolio-home.png", alt: "线上体验截图 01", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/aigc/portfolio/portfolio-projects.png", alt: "线上体验截图 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/aigc/portfolio/portfolio-ai-archive.png", alt: "线上体验截图 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/aigc/portfolio/portfolio-capabilities.jpg", alt: "线上体验截图 04", placeholder: false },
          { src: "//player.bilibili.com/player.html?bvid=BV1oaMA64EnU&autoplay=0", alt: "线上演示视频", placeholder: false },
          { src: "//player.bilibili.com/player.html?bvid=BV1iaMA64E2r&autoplay=0", alt: "线下标题选择网站", placeholder: false },
        ]},
        { id: "aigc-os-workflow", title: "AI 协作流程", type: "list", items: [
          { text: "装置体验拆解 → 网页流程规划 → Gemini 辅助实现 → 素材与音频接入 → 功能测试 → 视觉和交互调整 → 部署上线" },
        ]},
        // Case 03: Sensitive Light
        { id: "aigc-sl", title: "03 敏感的光 · 互动网页游戏", type: "text", content: "《敏感的光》是一款围绕压力认知设计的互动网页游戏。项目通过光源衰减、倒计时、声音反馈和数据对比，让玩家经历感受压力、理解压力和面对压力三个阶段。Bolt 用于网站搭建和初始代码生成，Cursor 用于代码修改、交互调整、功能调试与持续迭代。", items: [
          { label: "AI 工具", text: "Bolt · Cursor" },
          { label: "项目形式", text: "双人合作项目" },
        ]},
        { id: "aigc-sl-tools", title: "工具分工", type: "grid", items: [
          { label: "BOLT", text: "网站搭建 / 初始页面结构 / 基础代码生成" },
          { label: "CURSOR", text: "代码修改 / 交互逻辑调整 / 功能调试 / 问题修复" },
        ]},
        { id: "aigc-sl-workflow", title: "AI 协作流程", type: "list", items: [
          { text: "概念与玩法设计 → Bolt 搭建初始网站 → Cursor 修改交互逻辑 → 视觉与声音接入 → 功能调试 → 试玩测试 → 体验迭代" },
        ]},
        // AI Toolkit
        { id: "aigc-toolkit", title: "AI 工具与创作能力", type: "text", content: "除 AI 编程工具外，我也持续接触并使用图像、视频、配音和音效类 AI 工具。我会根据项目目标选择合适的生成方式，并将不同工具产生的内容重新整理、筛选和组合，应用到影像、交互、视觉设计和网站项目中。" },
        { id: "aigc-tool-image", title: "01 AI 图像生成", type: "grid", items: [
          { label: "说明", text: "根据画面主题、构图、镜头、光线和视觉风格设计生成提示词，并对生成结果进行多轮筛选与调整。" },
          { label: "工具", text: "Midjourney · GPT Image · Gemini · 即梦" },
          { label: "能力", text: "提示词设计 / 构图控制 / 镜头语言 / 风格探索 / 角色一致性 / 分镜图生成 / 视觉素材整理" },
        ]},
        { id: "aigc-tool-video", title: "02 AI 视频生成", type: "grid", items: [
          { label: "说明", text: "将静态画面、分镜和文字描述转化为动态镜头，并根据人物运动、摄影机变化和节奏继续调整生成结果。" },
          { label: "工具", text: "可灵 · 即梦" },
          { label: "能力", text: "文生视频 / 图生视频 / 动态分镜 / 镜头运动 / 动作调整 / 结果筛选 / 视频素材整理" },
        ]},
        { id: "aigc-tool-audio", title: "03 AI 配音与音效", type: "grid", items: [
          { label: "说明", text: "根据角色、情绪和叙事节奏选择声音方向，使用 AI 配音与 AI 音效工具生成基础声音素材。" },
          { label: "工具", text: "AI 配音工具 / AI 音效工具（待补充）" },
          { label: "能力", text: "角色配音 / 语气调整 / 声音风格选择 / 环境音效生成 / 声音素材筛选 / 视听节奏匹配" },
        ]},
        { id: "aigc-tool-code", title: "04 AI 编程与交互开发", type: "grid", items: [
          { label: "说明", text: "通过自然语言拆解页面、组件和交互需求，使用 AI 编程工具完成代码生成、修改、调试和持续迭代。" },
          { label: "工具", text: "Claude Code · Gemini · Bolt · Cursor" },
          { label: "能力", text: "需求拆解 / 页面搭建 / 组件实现 / 交互逻辑 / 代码修改 / 问题排查 / 响应式适配 / 部署与迭代" },
        ]},
        // Learning
        { id: "aigc-learning", title: "学习与适应", type: "text", content: "面对新的项目需求时，我会先判断任务适合使用哪一类工具，再通过案例测试、结果对比和实际制作快速理解工具特性。从图像与视频生成，到配音、音效和 AI 编程，我的学习过程并不止于了解软件功能，而是会继续将工具接入真实项目，并在使用过程中发现问题、调整方法和形成工作流。" },
        // Workflow
        { id: "aigc-workflow", title: "从需求到实际作品", type: "list", items: [
          { text: "明确项目目标 → 判断适合的 AI 工具 → 学习核心功能 → 小范围生成或代码测试 → 比较与筛选结果 → 调整提示词、参数或代码 → 接入真实项目 → 完成后期整理与迭代" },
        ]},
        { id: "aigc-workflow-note", title: "", type: "text", content: "我不会直接使用第一次生成的结果。我会根据内容准确性、视觉质量、交互体验和项目需求，持续筛选、修改并重新组织 AI 生成内容。生成 → 判断 → 修改 → 验证 → 整合。" },
      ],
    },
  },
  {
    id: "interaction",
    index: "02",
    title: "交互体验设计",
    englishLabel: "INTERACTION DESIGN",
    description: "从议题研究、角色任务和用户路径出发，设计具有反馈、节奏与情绪变化的数字体验。",
    tools: ["Figma", "React", "TypeScript", "Howler.js", "WebGL"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/previews/preview-interaction.png", alt: "交互体验设计", placeholder: false },
    items: [
      { id: "int-01", title: "舆论中的风暴", type: "交互装置", year: "2026", description: "线上线下互动体验，角色任务与实体风暴反馈机制。", tools: ["React", "TypeScript", "WebGL", "Howler.js"], mediaType: "image", alt: "舆论中的风暴", placeholder: true },
      { id: "int-02", title: "敏感的光", type: "网页游戏", year: "2025", description: "压力认知互动实验，三阶段体验设计与情绪引导。", tools: ["React", "Bolt", "Cursor"], mediaType: "image", alt: "敏感的光", placeholder: true },
      { id: "int-03", title: "交互流程实验", type: "交互设计", description: "任务流程设计与用户行为路径探索。", tools: ["Figma"], mediaType: "image", alt: "交互流程实验", placeholder: true },
      { id: "int-04", title: "网页体验设计", type: "界面交互", description: "从信息架构到界面状态，完整的网页交互设计。", tools: ["Figma", "React"], mediaType: "image", alt: "网页体验设计", placeholder: true },
    ],
    relatedProjects: [
      { title: "舆论中的风暴", targetId: "opinion-storm" },
      { title: "敏感的光", targetId: "sensitive-light" },
    ],
    caseStudy: {
      projectName: "心生奇旅",
      subtitle: "性教育游戏概念设计",
      year: "2025",
      team: "四人团队项目",
      myRole: null,
      coverSrc: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/interaction/interaction-cover.jpg",
      coverAlt: "心生奇旅主视觉",
      sections: [
        { id: "xs-intro", title: "项目简介", type: "text", content: "《心生奇旅》是一款面向青少年的性教育游戏概念。项目将传统性教育内容转化为一场奇幻冒险。玩家意外进入一本由动物角色构成的魔法书，在白猫的引导下寻找返回现实世界的方法。游戏以主线剧情连接六个性教育主题，并根据不同知识内容，分别使用剧情互动、探索、塔防、角色扮演、卡牌和解谜等玩法，让玩家在低压力的互动体验中主动理解身体、关系、安全与自我保护。" },
        { id: "xs-position", title: "项目定位", type: "highlight", items: [{ text: "游戏化学习" }, { text: "互动叙事" }, { text: "多机制关卡" }], content: "用游戏化解敏感，让科学知识成为青少年主动探索的冒险旅程。" },
        { id: "xs-design", title: "核心设计亮点", type: "grid", items: [
          { label: "知识与玩法绑定", text: "不同教育主题对应不同游戏机制，避免所有内容都使用答题或图文阅读。" },
          { label: "第三人称叙事", text: "玩家通过观察和介入其他角色的事件学习知识，降低敏感议题直接代入造成的不适。" },
          { label: "主线与支线结合", text: "主线负责推动冒险目标，支线负责呈现防性侵、青春期困惑和亲密关系等具体情境。" },
          { label: "家庭协作场景", text: "通过多人协作模式，为家长和孩子提供较自然的沟通入口。" },
        ]},
        { id: "xs-world", title: "世界观与角色", type: "text", content: "世界观：玩家因父母回避性相关问题而感到失望，随后意外进入一本魔法书。为了返回现实世界，玩家需要在白猫的引导下寻找黑猫，并完成不同区域的任务。", items: [
          { label: "主角", text: "误入魔法书的孩子，也是玩家在游戏中的化身。" },
          { label: "白猫", text: "游戏向导，陪伴玩家探索并理解相关知识。" },
          { label: "黑猫", text: "最终角色，象征性教育中的误解、阻碍与挑战。" },
          { label: "动物 NPC", text: "承担不同主题情境和支线任务。" },
        ]},
        { id: "xs-levels", title: "六个主题与玩法", type: "level-list", items: [
          { label: "01 关系与价值观建构", text: "玩法：剧情互动" },
          { label: "02 人体发育与生命周期", text: "玩法：剧情探索" },
          { label: "03 暴力预防与安全保障", text: "玩法：塔防" },
          { label: "04 性权利与法律保障", text: "玩法：剧本式角色扮演" },
          { label: "05 健康技能与福祉管理", text: "玩法：卡牌" },
          { label: "06 性行为与快感伦理", text: "玩法：解谜运送" },
        ]},
        { id: "xs-media", title: "项目素材", type: "media", items: [
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/interaction/interaction-cover.jpg", alt: "项目主视觉", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/interaction/interaction-world.jpg", alt: "世界观与角色", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/interaction/interaction-levels.jpg", alt: "六关总览", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/interaction/interaction-stage-03.png", alt: "第三关塔防流程", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/interaction/interaction-stage-05.png", alt: "第五关卡牌流程", placeholder: false },
        ]},
      ],
    },
  },
  {
    id: "vr",
    index: "02.5",
    title: "VR体验设计",
    englishLabel: "VR EXPERIENCE DESIGN",
    description: "通过空间、场景与交互，将文化内容转化为可探索的沉浸式体验。",
    tools: ["Unity"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-cover.png", alt: "南粤古驿道主视觉", placeholder: false },
    items: [
      {
        id: "vr-nanyue",
        title: "南粤古驿道",
        subtitle: "VR文化体验游戏 · Unity课程项目",
        type: "VR文化体验 / 空间交互",
        year: "2024.11",
        team: "个人主导项目",
        description: "《南粤古驿道》是一款基于 VR 的文化体验游戏。项目以穿越时空为背景，让玩家进入南粤古驿道的历史场景，通过空间探索和物品互动，感受传统建筑氛围并了解相关文化内容。玩家使用 VR 手柄拿起、观察和探索场景中的物品，交互设计保持简单直观。项目通过古建筑、环境细节、空间布局与背景音效，营造进入历史现场的沉浸感。",
        tools: ["Unity"],
        myRole: ["背景调研", "游戏概念设计", "场景搭建", "三维建模", "交互设计", "最终视觉呈现"],
        mediaType: "image",
        alt: "南粤古驿道主视觉",
        placeholder: true,
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-cover.png", alt: "项目主视觉", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-scene-01.png", alt: "场景全景", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-scene-02.png", alt: "建筑与环境细节", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-interaction-01.png", alt: "物品交互展示", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-modeling-01.png", alt: "建模过程", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-01.png", alt: "场景细节 01", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-02.png", alt: "场景细节 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-03.png", alt: "场景细节 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-04.png", alt: "场景细节 04", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-05.png", alt: "场景细节 05", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-06.png", alt: "场景细节 06", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-07.png", alt: "场景细节 07", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/vr-design/nanyue-ancient-road/nanyue-extra-08.png", alt: "场景细节 08", placeholder: false },
        ],
      },
    ],
  },
  {
    id: "motion",
    index: "03",
    title: "动效设计",
    englishLabel: "MOTION DESIGN",
    description: "通过文字、图形、节奏与声音的连续变化，将静态视觉转化为具有时间感的叙事体验。",
    tools: ["After Effects"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/previews/preview-motion.png", alt: "动效设计", placeholder: false },
    items: [
      {
        id: "mot-01", title: "0与1之间", type: "书籍视觉动效 / 动态排版", year: "2025",
        description: "围绕《0与1之间》的书籍主题，将文字、二进制符号、搜索界面和报纸拼贴转化为动态视觉。作品通过字体大小、版式变化、镜头推进和画面转场，表现数字信息在不同媒介之间的流动，并探索静态书籍内容在时间维度中的叙事方式。",
        tools: ["After Effects"], mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1B8MA6ZEKp&autoplay=0",
        alt: "《0与1之间》书籍视觉动效", placeholder: false,
      },
      {
        id: "mot-02", title: "再生计划", type: "品牌概念设计 / 标识动效 / 可持续发展活动策划", year: "2025",
        description: "《再生计划》是一套以区域可持续发展为主题的活动与视觉概念。项目希望通过设计建立持续循环的环保参与机制，将垃圾分类、废弃物再利用和公众传播连接为一套完整活动系统。动效以循环、生长与聚合为视觉语言，通过绿色线条和有机图形的连续变形，逐步形成\"再生计划\"标识。",
        tools: ["After Effects"], mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1B8MA6ZENm&autoplay=0",
        alt: "《再生计划》品牌概念动效", placeholder: false,
      },
      {
        id: "mot-03", title: "MING Floor Lamp", type: "灯具品牌视觉动效", year: "2025",
        description: "以灯具的结构、线条和光线关系为视觉基础，将重复纹样与线性运动转化为字体动画。画面通过线条延伸、图案排列和字形聚合，逐步形成 MING Floor Lamp 的品牌标识，表现灯具产品克制、轻盈的视觉气质。",
        tools: ["After Effects"], mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1B8MA6ZEHv&autoplay=0",
        alt: "MING Floor Lamp 品牌视觉动效", placeholder: false,
      },
    ],
  },
  {
    id: "modeling",
    index: "03.5",
    title: "建模渲染",
    englishLabel: "3D MODELING & RENDERING",
    description: "通过模型、材质、灯光与镜头，完成产品、空间与视觉概念的三维表达。",
    tools: ["Blender"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/portal-01.png", alt: "传送门渲染", placeholder: false },
    items: [
      {
        id: "mdl-portal",
        title: "传送门",
        subtitle: "科幻场景建模渲染",
        type: "场景建模 / 灯光渲染",
        team: "个人作品",
        description: "科幻风格传送门场景，使用 Blender 完成建模、材质与灯光渲染。",
        tools: ["Blender"],
        mediaType: "image",
        src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/portal-01.png",
        alt: "传送门渲染",
        placeholder: false,
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/portal-02.png", alt: "传送门 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/portal-03.png", alt: "传送门 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/portal-04.png", alt: "传送门 04", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/portal-05.png", alt: "传送门 05", placeholder: false },
        ],
      },
      {
        id: "mdl-planet",
        title: "星球",
        subtitle: "太空场景渲染",
        type: "场景渲染 / 材质表现",
        team: "个人作品",
        description: "太空星球场景，通过 Blender 材质节点与灯光完成表面质感表现。",
        tools: ["Blender"],
        mediaType: "image",
        src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/planet-01.png",
        alt: "星球渲染",
        placeholder: false,
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/planet-02.png", alt: "星球 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/planet-03.png", alt: "星球 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/planet-04.png", alt: "星球 04", placeholder: false },
        ],
      },
      {
        id: "mdl-earth",
        title: "类地行星",
        subtitle: "行星表面渲染",
        type: "场景渲染",
        team: "个人作品",
        description: "类地行星表面渲染，表现地形纹理与大气层效果。",
        tools: ["Blender"],
        mediaType: "image",
        src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/earth-01.png",
        alt: "类地行星渲染",
        placeholder: false,
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/earth-02.png", alt: "类地行星 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/earth-03.png", alt: "类地行星 03", placeholder: false },
        ],
      },
      {
        id: "mdl-web",
        title: "蜘蛛网",
        subtitle: "细节材质渲染",
        type: "材质表现 / 细节渲染",
        team: "个人作品",
        description: "蜘蛛网细节渲染，表现半透明材质与景深效果。",
        tools: ["Blender"],
        mediaType: "image",
        src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-01.png",
        alt: "蜘蛛网渲染",
        placeholder: false,
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-02.png", alt: "蜘蛛网 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-03.png", alt: "蜘蛛网 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-04.png", alt: "蜘蛛网 04", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-05.png", alt: "蜘蛛网 05", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-06.png", alt: "蜘蛛网 06", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/modeling-rendering/web-07.png", alt: "蜘蛛网 07", placeholder: false },
        ],
      },
      {
        id: "mdl-donut",
        title: "甜甜圈",
        subtitle: "经典建模练习",
        type: "建模 / 材质 / 动画",
        team: "个人作品",
        description: "Blender 经典甜甜圈教程练习，完成建模、材质与动画渲染。",
        tools: ["Blender"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1EbMA68ELh&autoplay=0",
        alt: "甜甜圈渲染动画",
        placeholder: false,
      },
      {
        id: "mdl-render-01",
        title: "渲染作品 01",
        subtitle: "Blender 渲染",
        type: "三维渲染",
        team: "个人作品",
        description: "Blender 三维渲染作品。",
        tools: ["Blender"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1zbMA6bENg&autoplay=0",
        alt: "渲染作品 01",
        placeholder: false,
      },
      {
        id: "mdl-render-02",
        title: "渲染作品 02",
        subtitle: "Blender 渲染",
        type: "三维渲染",
        team: "个人作品",
        description: "Blender 三维渲染作品。",
        tools: ["Blender"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1EbMA68EVg&autoplay=0",
        alt: "渲染作品 02",
        placeholder: false,
      },
      {
        id: "mdl-render-03",
        title: "渲染作品 03",
        subtitle: "Blender 渲染",
        type: "三维渲染",
        team: "个人作品",
        description: "Blender 三维渲染作品。",
        tools: ["Blender"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1iYMA6dEre&autoplay=0",
        alt: "渲染作品 03",
        placeholder: false,
      },
      {
        id: "mdl-render-04",
        title: "渲染作品 04",
        subtitle: "Blender 渲染",
        type: "三维渲染",
        team: "个人作品",
        description: "Blender 三维渲染作品。",
        tools: ["Blender"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1oYMA6dEVV&autoplay=0",
        alt: "渲染作品 04",
        placeholder: false,
      },
      {
        id: "mdl-snow",
        title: "雪山",
        subtitle: "自然环境渲染",
        type: "场景渲染 / 动画",
        team: "个人作品",
        description: "雪山场景渲染，表现自然地形与大气透视效果。",
        tools: ["Blender"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1fbMA6bEiK&autoplay=0",
        alt: "雪山渲染",
        placeholder: false,
      },
    ],
  },
  {
    id: "video",
    index: "04",
    title: "影像设计",
    englishLabel: "VIDEO DESIGN",
    description: "从概念、分镜和镜头调度出发，通过构图、节奏、声音与剪辑，将故事和抽象议题转化为动态叙事。",
    tools: [],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-01.jpg", alt: "《We Need to Talk...》分镜首帧", placeholder: false },
    items: [
      {
        id: "vid-we-need-to-talk",
        title: "We Need to Talk...",
        subtitle: "一场由误会引发的追逐闹剧",
        type: "实拍叙事短片 / 黑色幽默",
        team: "六人团队项目",
        duration: "约 4 分 35 秒",
        description: "主角意外目睹一场疑似凶杀事件，却在慌乱中被\"凶手\"发现。追逐、躲藏和报警不断推动情节升级，直到故事结尾，观众才发现这一切源于一场误会。作品以信息差作为主要叙事方式，通过追逐节奏、多重视角和结尾反转，在紧张氛围中加入荒诞与黑色幽默。",
        concept: "项目在前期经历了多轮剧情调整。团队将原本偏线性的故事重新组织，把关键事件的信息延后，让观众先进入追逐，再逐步理解人物为何逃跑、地上的角色是否死亡，以及整场冲突发生的真实原因。影片通过紧张追逐与短暂放松交替控制节奏，并加入自拍视角、监控视角和环境反射等画面，让同一事件在不同观察位置中被重新理解。",
        tools: [],
        myRole: ["现场拍摄协助", "分镜制作", "道具与后勤", "项目汇报整理"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1ZbMA6bEmL&autoplay=0",
        alt: "《We Need to Talk...》实拍短片",
        placeholder: false,
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-01.jpg", alt: "分镜：开场人物进入空间", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-02.jpg", alt: "分镜：事件发生", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-03.jpg", alt: "分镜：追逐开始", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-04.jpg", alt: "分镜：追逐升级", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-05.jpg", alt: "分镜：高潮部分", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/we-need-to-talk-storyboard-06.jpg", alt: "分镜：结尾反转", placeholder: false },
        ],
      },
      {
        id: "vid-jenga",
        title: "JENGA",
        subtitle: "自然的代价",
        type: "环保主题概念影像 / 物件叙事",
        team: "四人团队项目",
        duration: "约 1 分 05 秒",
        description: "作品以叠叠乐作为自然生态系统的象征。画面中的手不断抽取木块，并使用取出的木块搭建房屋，对应人类持续开采自然资源、扩张城市的过程。随着木块不断减少，原有结构逐渐失去稳定。即使操作者已经预见倒塌的结果，索取仍未停止。最终，叠叠乐倒下，将资源消耗与生态崩塌之间的关系转化为直接的视觉结果。",
        concept: "作品没有直接使用污染、砍伐或动物死亡等常见环保画面，而是利用一个简单的日常物件建立视觉隐喻。叠叠乐本身具有脆弱的结构关系。每一次抽取都会改变整体稳定性，因此它能够直观表现个体行为如何不断累积，并最终造成无法逆转的结果。影片通过物件特写、低照度画面、动作节奏和结构倒塌，让抽象的环境议题转化为可以被观看的因果过程。",
        tools: ["Blender"],
        myRole: ["分镜设计"],
        mediaType: "video",
        src: "//player.bilibili.com/player.html?bvid=BV1EbMA68EZG&autoplay=0",
        alt: "《JENGA》概念影像",
        placeholder: false,
        metaphorGroups: [
          { from: "抽取木块", to: "自然资源被持续开采" },
          { from: "使用木块搭建房屋", to: "城市建设与人类扩张" },
          { from: "叠叠乐逐渐摇晃", to: "生态系统失去平衡" },
          { from: "结构最终倒塌", to: "无节制索取带来的环境后果" },
        ],
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/video/jenga-concept-01.jpg", alt: "JENGA 概念图 01", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/jenga-concept-02.jpg", alt: "JENGA 概念图 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/jenga-concept-03.jpg", alt: "JENGA 概念图 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/jenga-concept-04.jpg", alt: "JENGA 概念图 04", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/jenga-concept-05.jpg", alt: "JENGA 概念图 05", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/video/jenga-concept-06.jpg", alt: "JENGA 概念图 06", placeholder: false },
        ],
      },
    ],
  },
  {
    id: "ui",
    index: "05",
    title: "界面设计",
    englishLabel: "UI DESIGN",
    description: "从用户场景与信息结构出发，通过功能梳理、页面层级和视觉系统，建立清晰、连贯且具有一致性的移动端体验。",
    tools: ["Figma"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/previews/preview-ui.png", alt: "界面设计", placeholder: false },
    items: [
      {
        id: "ui-huolai",
        title: "货来",
        subtitle: "GOODS ARRIVED · 物流综合服务 App",
        type: "移动端产品设计",
        year: "2023",
        team: "两人团队项目",
        description: "《货来》是一款面向普通用户和物流从业者的综合物流服务 App。产品整合查件、寄件、派送、搬家和个人管理等功能。设计重点在于梳理多角色使用场景，将复杂的物流信息与高频操作整合为清晰、统一的移动端体验。",
        tools: ["Figma"],
        myRole: ["产品定位", "功能梳理", "产品框架", "信息架构", "用户流程", "界面视觉", "组件规范", "高保真原型", "项目展示"],
        mediaType: "image",
        alt: "《货来》主视觉",
        placeholder: false,
        src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-board.jpg",
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-tracking.jpg", alt: "查件列表与物流详情", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-map.jpg", alt: "派送租车与路线", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-send.jpg", alt: "寄件入口与信息填写", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-delivery.jpg", alt: "派送订单", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-profile.jpg", alt: "个人中心", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/huolai/huolai-framework.jpg", alt: "数据分析", placeholder: false },
        ],
      },
      {
        id: "ui-stu-academic",
        title: "汕头大学教务系统 App",
        subtitle: "校园教务移动端界面设计",
        type: "移动端界面概念设计",
        year: "2023",
        team: "个人项目",
        description: "项目围绕学生日常使用频率较高的课程、通知、成绩、考试和个人设置等场景，对传统教务系统进行移动端界面重构。设计将分散的教务功能重新分类，并通过模块化首页、清晰的功能入口和个性化视觉设置，减少复杂信息带来的操作负担。",
        tools: ["Figma"],
        myRole: ["需求梳理", "功能分类", "信息架构", "页面流程", "视觉方向", "界面设计", "组件规范", "高保真原型", "宣传视觉"],
        mediaType: "image",
        alt: "汕头大学教务系统 App 宣传海报",
        placeholder: false,
        src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-poster.png",
        extraImages: [
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-home.png", alt: "首页", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-schedule.png", alt: "我的课表", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-notice.png", alt: "通知公告", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-records.png", alt: "学生记录中心", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-services.png", alt: "登录页面", placeholder: false, aspectRatio: "9/19.5" },
          { src: "https://grzpj.vercel.app/assets/capabilities/ui/stu-academic/stu-profile.png", alt: "个人中心与设置", placeholder: false, aspectRatio: "9/19.5" },
        ],
      },
    ],
  },
  {
    id: "research",
    index: "06",
    title: "用户研究",
    englishLabel: "USER RESEARCH",
    description: "通过背景资料、用户行为、体验路径与现场反馈，将研究发现转化为具体的设计机制。",
    tools: ["Figma"],
    preview: { src: "https://grzpj.vercel.app/assets/capabilities/previews/preview-research.png", alt: "用户研究", placeholder: false },
    items: [
      { id: "res-01", title: "用户路径分析", type: "用户研究", description: "从任务流程到用户行为的路径分析。", tools: ["Figma"], mediaType: "image", alt: "用户路径分析", placeholder: true },
      { id: "res-02", title: "体验流程设计", type: "体验设计", description: "基于研究发现的体验流程优化。", tools: ["Figma"], mediaType: "image", alt: "体验流程设计", placeholder: true },
      { id: "res-03", title: "行为观察", type: "用户测试", description: "现场观察与用户行为记录分析。", tools: [], mediaType: "image", alt: "行为观察", placeholder: true },
      { id: "res-04", title: "测试与迭代", type: "设计迭代", description: "基于测试反馈的设计改进。", tools: ["Figma"], mediaType: "image", alt: "测试与迭代", placeholder: true },
    ],
    relatedProjects: [
      { title: "舆论中的风暴", targetId: "opinion-storm" },
      { title: "敏感的光", targetId: "sensitive-light" },
    ],
    caseStudy: {
      projectName: "青少年性教育需求研究",
      subtitle: "《心生奇旅》前期研究",
      year: "2025",
      team: "四人团队项目",
      myRole: null,
      coverSrc: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/心生奇旅 (1).png",
      coverAlt: "研究流程",
      sections: [
        { id: "rs-intro", title: "研究简介", type: "text", content: "项目通过背景资料、竞品分析和用户需求研究，分析青少年与家长在知识获取、内容理解和家庭沟通中的障碍。研究结果进一步转化为游戏叙事、角色表达、关卡机制与多人协作体验，为《心生奇旅》的概念设计提供依据。" },
        { id: "rs-process", title: "研究流程", type: "list", items: [
          { text: "背景研究 → 竞品分析 → 用户划分 → 使用场景 → 痛点提炼 → 需求转译 → 游戏概念" },
        ]},
        { id: "rs-subjects", title: "研究对象", type: "grid", items: [
          { label: "主要用户", text: "青少年 / 父母" },
          { label: "筛选维度", text: "年龄、性别、性教育方式、已有性教育程度" },
          { label: "年龄范围", text: "14—50 岁，男女均有" },
          { label: "教育来源", text: "学校 / 网络 / 家庭，认知程度低/中/高" },
        ]},
        { id: "rs-methods", title: "研究方法", type: "list", items: [
          { text: "文献分析" }, { text: "竞品分析" }, { text: "观察" }, { text: "经验总结" }, { text: "用户分类与需求归纳" },
        ]},
        { id: "rs-competitor", title: "竞品分析", type: "text", content: "现有性教育产品主要包括：答题式科普、图文解释、线上书籍、线下讲座、社区内容、咨询平台。主要问题：形式较单一、互动性不足、内容表达较生硬、家庭参与弱、部分服务受地域限制、难以适配不同年龄和学习阶段。", items: [
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/research-competitor-map.jpg", alt: "竞品坐标图", placeholder: true },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/research-radar.jpg", alt: "竞品雷达分析", placeholder: true },
        ]},
        { id: "rs-insights", title: "核心用户洞察", type: "grid", items: [
          { label: "家庭沟通存在障碍", text: "部分家长因观念束缚或知识不足回避相关话题，青少年也可能对青春期教育产生回避和敏感反应。" },
          { label: "传统科普吸引力不足", text: "图文、答题和讲座能够传递知识，但内容往往偏生硬，缺少持续参与和主动探索。" },
          { label: "不同角色的需求不同", text: "青少年更关注内容是否有趣、易懂和能够自主学习；父母更关注内容可靠性与亲子沟通方法。" },
          { label: "不同学习阶段需求会变化", text: "初次接触时，用户更需要漫画、互动和游戏等低压力形式；随着认知深入，会逐渐需要更专业、系统的内容。" },
          { label: "内容需要与真实场景结合", text: "用户更容易在具体情境、角色事件和生活问题中理解知识，而不是只接受抽象定义。" },
        ]},
        { id: "rs-translation", title: "研究到设计的转化", type: "insight-map", items: [
          { label: "敏感议题容易回避", text: "使用奇幻世界和动物角色间接表达" },
          { label: "传统科普互动不足", text: "转化为剧情探索和多种游戏机制" },
          { label: "青少年认知较碎片化", text: "使用短任务和阶段性成就反馈" },
          { label: "家庭沟通困难", text: "加入家庭协作和多人模式" },
          { label: "不同知识内容差异较大", text: "六个主题分别匹配不同玩法" },
          { label: "第一人称代入可能造成不适", text: "使用第三人称叙事观察角色事件" },
        ]},
        { id: "rs-media", title: "研究素材", type: "media", items: [
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/1234.png", alt: "研究图表 01", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/daec6138920e411ae607b8cf476e5cc.jpg", alt: "研究图表 02", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/image.png", alt: "研究图表 03", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/image (1).png", alt: "研究图表 04", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/image (2).png", alt: "研究图表 05", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/心生奇旅 (1).png", alt: "心生奇旅 01", placeholder: false },
          { src: "https://grzpj.vercel.app/assets/capabilities/xinsheng-journey/research/竞品2.png", alt: "竞品分析", placeholder: false },
        ]},
      ],
    },
  },
];

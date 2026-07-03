import { put } from "@vercel/blob";
import { readFileSync, existsSync } from "fs";

const uploads = [
  // 动效设计
  { file: "public/assets/capabilities/motion/zero-and-one.mov", path: "portfolio/motion/zero-and-one.mov" },
  { file: "public/assets/capabilities/motion/regeneration-plan.mp4", path: "portfolio/motion/regeneration-plan.mp4" },
  { file: "public/assets/capabilities/motion/ming-floor-lamp.mp4", path: "portfolio/motion/ming-floor-lamp.mp4" },
  // 影像设计
  { file: "public/assets/capabilities/video/we-need-to-talk.mp4", path: "portfolio/video/we-need-to-talk.mp4" },
  { file: "public/assets/capabilities/video/jenga.mp4", path: "portfolio/video/jenga.mp4" },
  // 建模渲染
  { file: "public/assets/capabilities/modeling-rendering/甜甜圈10001-0300.mp4", path: "portfolio/modeling-rendering/donut.mp4" },
  { file: "public/assets/capabilities/modeling-rendering/小鸟生胖气(有音乐).mp4", path: "portfolio/modeling-rendering/bird.mp4" },
  { file: "public/assets/capabilities/modeling-rendering/雪山.mov", path: "portfolio/modeling-rendering/snow-mountain.mov" },
  { file: "public/assets/capabilities/modeling-rendering/7月2日.mov", path: "portfolio/modeling-rendering/render-01.mov" },
  { file: "public/assets/capabilities/modeling-rendering/7月2日(1).mov", path: "portfolio/modeling-rendering/render-02.mov" },
  { file: "public/assets/capabilities/modeling-rendering/7月2日(2).mov", path: "portfolio/modeling-rendering/render-03.mov" },
  { file: "public/assets/capabilities/modeling-rendering/7月2日(3).mov", path: "portfolio/modeling-rendering/render-04.mov" },
  // AIGC
  { file: "public/assets/capabilities/aigc/portfolio/线上演示视频.mp4", path: "portfolio/aigc/demo-online.mp4" },
  { file: "public/assets/capabilities/aigc/portfolio/线下标题选择网站.mp4", path: "portfolio/aigc/demo-offline-title.mp4" },
  // Opinion Storm
  { file: "public/assets/projects/opinion-storm/online-demo.webm", path: "portfolio/opinion-storm/online-demo.webm" },
  // GIFs
  { file: "public/assets/projects/sensitive-light/stage-one.gif", path: "portfolio/sensitive-light/stage-one.gif" },
  { file: "public/assets/projects/sensitive-light/stage-two.gif", path: "portfolio/sensitive-light/stage-two.gif" },
  { file: "public/assets/projects/sensitive-light/stage-two-blackhole.gif", path: "portfolio/sensitive-light/stage-two-blackhole.gif" },
  { file: "public/assets/projects/sensitive-light/stage-three.gif", path: "portfolio/sensitive-light/stage-three.gif" },
];

let success = 0;
for (const u of uploads) {
  if (!existsSync(u.file)) {
    console.log("MISSING:", u.file);
    continue;
  }
  process.stdout.write(u.path + " ... ");
  try {
    const data = readFileSync(u.file);
    await put(u.path, data, { access: "private" });
    console.log("OK (" + (data.length / 1024 / 1024).toFixed(1) + "MB)");
    success++;
  } catch (e) {
    console.log("FAIL:", e.message);
  }
}
console.log("\nDone:", success, "/", uploads.length, "uploaded");

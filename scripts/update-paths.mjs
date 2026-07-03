import { readFileSync, writeFileSync } from "fs";

// capabilities.ts updates
let cap = readFileSync("src/data/capabilities.ts", "utf-8");
const capReplacements = {
  "/assets/capabilities/motion/zero-and-one.mov": "/api/media?pathname=portfolio/motion/zero-and-one.mov",
  "/assets/capabilities/motion/regeneration-plan.mp4": "/api/media?pathname=portfolio/motion/regeneration-plan.mp4",
  "/assets/capabilities/motion/ming-floor-lamp.mp4": "/api/media?pathname=portfolio/motion/ming-floor-lamp.mp4",
  "/assets/capabilities/video/we-need-to-talk.mp4": "/api/media?pathname=portfolio/video/we-need-to-talk.mp4",
  "/assets/capabilities/video/jenga.mp4": "/api/media?pathname=portfolio/video/jenga.mp4",
  "/assets/capabilities/modeling-rendering/甜甜圈10001-0300.mp4": "/api/media?pathname=portfolio/modeling-rendering/donut.mp4",
  "/assets/capabilities/modeling-rendering/小鸟生胖气(有音乐).mp4": "/api/media?pathname=portfolio/modeling-rendering/bird.mp4",
  "/assets/capabilities/modeling-rendering/雪山.mov": "/api/media?pathname=portfolio/modeling-rendering/snow-mountain.mov",
  "/assets/capabilities/modeling-rendering/7月2日.mov": "/api/media?pathname=portfolio/modeling-rendering/render-01.mov",
  "/assets/capabilities/modeling-rendering/7月2日(1).mov": "/api/media?pathname=portfolio/modeling-rendering/render-02.mov",
  "/assets/capabilities/modeling-rendering/7月2日(2).mov": "/api/media?pathname=portfolio/modeling-rendering/render-03.mov",
  "/assets/capabilities/modeling-rendering/7月2日(3).mov": "/api/media?pathname=portfolio/modeling-rendering/render-04.mov",
  "/assets/capabilities/aigc/portfolio/线上演示视频.mp4": "/api/media?pathname=portfolio/aigc/demo-online.mp4",
  "/assets/capabilities/aigc/portfolio/线下标题选择网站.mp4": "/api/media?pathname=portfolio/aigc/demo-offline-title.mp4",
};
for (const [old, nu] of Object.entries(capReplacements)) {
  if (cap.includes(old)) {
    cap = cap.replaceAll(old, nu);
    console.log("capabilities: OK " + old.split("/").pop());
  } else {
    console.log("capabilities: MISSING " + old.split("/").pop());
  }
}
writeFileSync("src/data/capabilities.ts", cap);

// opinion-storm
let os = readFileSync("src/data/opinion-storm.ts", "utf-8");
os = os.replaceAll("/assets/projects/opinion-storm/online-demo.webm", "/api/media?pathname=portfolio/opinion-storm/online-demo.webm");
writeFileSync("src/data/opinion-storm.ts", os);
console.log("opinion-storm: OK");

// sensitive-light
let sl = readFileSync("src/data/sensitive-light.ts", "utf-8");
sl = sl.replaceAll("/assets/projects/sensitive-light/stage-one.gif", "/api/media?pathname=portfolio/sensitive-light/stage-one.gif");
sl = sl.replaceAll("/assets/projects/sensitive-light/stage-two-blackhole.gif", "/api/media?pathname=portfolio/sensitive-light/stage-two-blackhole.gif");
sl = sl.replaceAll("/assets/projects/sensitive-light/stage-three.gif", "/api/media?pathname=portfolio/sensitive-light/stage-three.gif");
sl = sl.replaceAll("/assets/projects/sensitive-light/stage-two.gif", "/api/media?pathname=portfolio/sensitive-light/stage-two.gif");
writeFileSync("src/data/sensitive-light.ts", sl);
console.log("sensitive-light: OK");

console.log("\nDone");

import { readFileSync, writeFileSync } from "fs";

// Revert all /api/media paths back to local paths
const files = [
  "src/data/capabilities.ts",
  "src/data/opinion-storm.ts",
  "src/data/sensitive-light.ts",
];

for (const f of files) {
  let content = readFileSync(f, "utf-8");
  // Replace API paths back to local
  content = content.replace(/\/api\/media\?pathname=portfolio\/motion\//g, "/assets/capabilities/motion/");
  content = content.replace(/\/api\/media\?pathname=portfolio\/video\//g, "/assets/capabilities/video/");
  content = content.replace(/\/api\/media\?pathname=portfolio\/modeling-rendering\//g, "/assets/capabilities/modeling-rendering/");
  content = content.replace(/\/api\/media\?pathname=portfolio\/aigc\//g, "/assets/capabilities/aigc/portfolio/");
  content = content.replace(/\/api\/media\?pathname=portfolio\/opinion-storm\//g, "/assets/projects/opinion-storm/");
  content = content.replace(/\/api\/media\?pathname=portfolio\/sensitive-light\//g, "/assets/projects/sensitive-light/");
  writeFileSync(f, content);
  console.log("Updated:", f);
}
console.log("Done");

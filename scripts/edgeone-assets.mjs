import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const VERCEL = "https://grzpj.vercel.app";

function walk(dir) {
  const files = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { files.push(...walk(p)); }
    else if (f.endsWith(".ts") || f.endsWith(".tsx")) { files.push(p); }
  }
  return files;
}

const files = walk("src");
let total = 0;
for (const f of files) {
  let c = readFileSync(f, "utf-8");
  let count = 0;
  c = c.replace(/["']\/assets\//g, (m) => {
    count++;
    return m[0] + VERCEL + "/assets/";
  });
  c = c.replace(/["']\/images\//g, (m) => {
    count++;
    return m[0] + VERCEL + "/images/";
  });
  if (count > 0) {
    writeFileSync(f, c);
    console.log(f, ":", count, "paths");
    total += count;
  }
}
console.log("\nTotal:", total, "paths updated to", VERCEL);

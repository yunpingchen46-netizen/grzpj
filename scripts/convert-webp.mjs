import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, existsSync } from "fs";
import { join, extname } from "path";

const QUALITY = 80;

async function walk(dir) {
  const files = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (f.startsWith(".")) continue;
    if (statSync(p).isDirectory()) { files.push(...await walk(p)); }
    else {
      const ext = extname(f).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) files.push(p);
    }
  }
  return files;
}

const dirs = [
  "public/assets/capabilities",
  "public/assets/projects",
  "public/assets/contact",
  "public/images/marquee",
  "public/images/skills",
];

let total = 0, converted = 0, saved = 0;
for (const dir of dirs) {
  try {
    const files = await walk(dir);
    for (const f of files) {
      total++;
      const origSize = statSync(f).size;
      const webp = f.replace(/\.(png|jpg|jpeg)$/i, ".webp");

      // Skip if webp already exists and is smaller
      if (existsSync(webp) && statSync(webp).size < origSize) {
        unlinkSync(f);
        saved += origSize;
        converted++;
        console.log("Skipped:", f.split("/").pop(), "(webp already exists)");
        continue;
      }

      try {
        await sharp(f).webp({ quality: QUALITY }).toFile(f + ".webp");
        const newSize = statSync(f + ".webp").size;
        if (newSize < origSize) {
          unlinkSync(f);
          const { renameSync } = await import("fs");
          renameSync(f + ".webp", webp);
          saved += origSize - newSize;
          converted++;
          console.log(f.split("/").pop(), (origSize/1024).toFixed(0) + "KB -> " + (newSize/1024).toFixed(0) + "KB WebP");
        } else {
          unlinkSync(f + ".webp");
          console.log("Skip:", f.split("/").pop(), "(webp not smaller)");
        }
      } catch (e) {
        try { require("fs").unlinkSync(f + ".webp"); } catch {}
      }
    }
  } catch {}
}

console.log("\nConverted:", converted, "/", total, "Saved:", (saved / 1024 / 1024).toFixed(1) + "MB");

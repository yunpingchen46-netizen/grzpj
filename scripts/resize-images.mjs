import sharp from "sharp";
import { readdirSync, statSync, renameSync } from "fs";
import { join, extname } from "path";

const MAX = 1920;
const QUALITY = 80;

async function walk(dir) {
  const files = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (f.startsWith(".")) continue;
    if (statSync(p).isDirectory()) { files.push(...await walk(p)); }
    else {
      const ext = extname(f).toLowerCase();
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) files.push(p);
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

let total = 0, resized = 0, saved = 0;
for (const dir of dirs) {
  try {
    const files = await walk(dir);
    for (const f of files) {
      total++;
      const origSize = statSync(f).size;
      try {
        const img = sharp(f);
        const meta = await img.metadata();
        if (meta.width <= MAX && (meta.height || 0) <= MAX) continue;

        const tmp = f + ".tmp";
        await img.resize(MAX, MAX, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: QUALITY }).toFile(tmp);
        const newSize = statSync(tmp).size;
        if (newSize < origSize) {
          renameSync(tmp, f);
          saved += origSize - newSize;
          resized++;
          console.log(f.split("/").pop(), meta.width + "x" + meta.height, "->", (newSize / 1024).toFixed(0) + "KB", "saved", ((origSize - newSize) / 1024).toFixed(0) + "KB");
        } else {
          // Not smaller, keep original
          try { require("fs").unlinkSync(tmp); } catch {}
        }
      } catch (e) {
        // Skip problematic files
      }
    }
  } catch {}
}

// Also compress PNGs that are over 1MB
for (const dir of dirs) {
  try {
    const files = await walk(dir);
    for (const f of files) {
      const origSize = statSync(f).size;
      const ext = extname(f).toLowerCase();
      if (origSize < 500 * 1024) continue;
      if (ext === ".jpg" || ext === ".jpeg") continue; // already handled

      try {
        const tmp = f + ".tmp2";
        await sharp(f).resize(MAX, MAX, { fit: "inside", withoutEnlargement: true })
          .png({ quality: 70, compressionLevel: 9 }).toFile(tmp);
        const newSize = statSync(tmp).size;
        if (newSize < origSize) {
          renameSync(tmp, f);
          saved += origSize - newSize;
          resized++;
          console.log(f.split("/").pop(), ext, (origSize / 1024).toFixed(0) + "KB -> " + (newSize / 1024).toFixed(0) + "KB");
        } else {
          try { require("fs").unlinkSync(tmp); } catch {}
        }
      } catch {}
    }
  } catch {}
}

console.log("\nTotal:", total, "Resized:", resized, "Saved:", (saved / 1024 / 1024).toFixed(1) + "MB");

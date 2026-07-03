#!/usr/bin/env node
/**
 * Vercel Blob helper — list, upload, delete media.
 *
 * Usage:
 *   node scripts/blob.mjs list
 *   node scripts/blob.mjs upload <localFile> <blobPathname>
 *   node scripts/blob.mjs upload-dir <localDir> <blobPrefix>
 *   node scripts/blob.mjs del <pathname>
 */

import { put, list, del } from "@vercel/blob";
import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, basename } from "path";

async function main() {
  const cmd = process.argv[2];
  if (!cmd) { console.log("Commands: list | upload | upload-dir | del"); process.exit(1); }

  if (cmd === "list") {
    const result = await list();
    console.log(`${result.blobs.length} blobs:`);
    for (const b of result.blobs) {
      console.log(`  ${b.pathname}  ${(b.size / 1024 / 1024).toFixed(1)}MB`);
    }
  } else if (cmd === "upload") {
    const file = process.argv[3];
    const pathname = process.argv[4] || `portfolio/${basename(file)}`;
    if (!file) { console.log("Usage: upload <file> [pathname]"); process.exit(1); }
    const { url } = await put(pathname, readFileSync(file), { access: "public" });
    console.log(`Uploaded: ${pathname}`);
    console.log(`URL: ${url}`);
  } else if (cmd === "upload-dir") {
    const dir = process.argv[3];
    const prefix = process.argv[4] || "portfolio/";
    if (!dir) { console.log("Usage: upload-dir <dir> [prefix]"); process.exit(1); }
    const files = readdirSync(dir).filter(f => !f.startsWith("."));
    for (const f of files) {
      const fp = resolve(dir, f);
      if (statSync(fp).isFile()) {
        const pathname = prefix + f;
        process.stdout.write(`Uploading ${f} -> ${pathname} ... `);
        try {
          await put(pathname, readFileSync(fp), { access: "public" });
          console.log("OK");
        } catch (e) {
          console.log("FAIL:", e.message);
        }
      }
    }
  } else if (cmd === "del") {
    const pathname = process.argv[3];
    if (!pathname) { console.log("Usage: del <pathname>"); process.exit(1); }
    await del(pathname);
    console.log(`Deleted: ${pathname}`);
  }
}

main().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});

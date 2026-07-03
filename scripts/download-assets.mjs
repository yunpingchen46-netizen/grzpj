#!/usr/bin/env node
/**
 * Downloads all discovered assets from the target website to public/.
 * Usage: node scripts/download-assets.mjs <assets-json-file>
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';
import { createWriteStream } from 'fs';
import { get } from 'https';
import { request } from 'http';
import { URL } from 'url';

const PUBLIC_DIR = resolve(process.cwd(), 'public');
const CONCURRENCY = 4;

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const proto = parsed.protocol === 'https:' ? get : request;

    const file = createWriteStream(destPath);
    proto(url, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', (err) => {
      file.close();
      reject(err);
    });
  });
}

async function downloadBatch(items, getDestPathFn) {
  const results = [];
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.allSettled(
      batch.map(async (item) => {
        const url = typeof item === 'string' ? item : item.src || item.url || item.href;
        if (!url || url.startsWith('data:')) return { skipped: true, reason: 'data URI or missing URL' };

        // Clean URL (remove CSS url() wrapper)
        const cleanUrl = url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

        try {
          const destPath = getDestPathFn(cleanUrl, item);
          if (existsSync(destPath)) {
            return { skipped: true, reason: 'already exists', path: destPath };
          }
          mkdirSync(dirname(destPath), { recursive: true });
          await downloadFile(cleanUrl, destPath);
          return { downloaded: true, url: cleanUrl, path: destPath };
        } catch (e) {
          return { error: e.message, url: cleanUrl };
        }
      })
    );
    results.push(...batchResults.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason?.message }));
  }
  return results;
}

async function main() {
  const assetsFile = process.argv[2];
  if (!assetsFile) {
    console.error('Usage: node scripts/download-assets.mjs <assets-json-file>');
    process.exit(1);
  }

  const assets = JSON.parse(await import('fs').then(fs => fs.readFileSync(assetsFile, 'utf-8')));
  const allResults = [];

  // Download images
  if (assets.images?.length) {
    console.log(`Downloading ${assets.images.length} images...`);
    const results = await downloadBatch(assets.images, (url, item) => {
      const ext = extname(new URL(url).pathname).split('?')[0] || '.png';
      const name = basename(new URL(url).pathname, ext).slice(0, 40) || 'image';
      return resolve(PUBLIC_DIR, 'images', `${name}${ext}`);
    });
    allResults.push({ type: 'images', results });
  }

  // Download videos
  if (assets.videos?.length) {
    console.log(`Downloading ${assets.videos.length} videos...`);
    const results = await downloadBatch(assets.videos, (url) => {
      const ext = extname(new URL(url).pathname).split('?')[0] || '.mp4';
      const name = basename(new URL(url).pathname, ext).slice(0, 40) || 'video';
      return resolve(PUBLIC_DIR, 'videos', `${name}${ext}`);
    });
    allResults.push({ type: 'videos', results });
  }

  // Download favicons
  if (assets.favicons?.length) {
    console.log(`Downloading ${assets.favicons.length} favicons...`);
    const results = await downloadBatch(assets.favicons, (url) => {
      const name = basename(new URL(url).pathname) || 'favicon';
      return resolve(PUBLIC_DIR, 'seo', name);
    });
    allResults.push({ type: 'favicons', results });
  }

  // Save results
  const summaryPath = resolve(process.cwd(), 'docs', 'research', 'download-results.json');
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, JSON.stringify(allResults, null, 2));
  console.log('Download summary saved to:', summaryPath);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

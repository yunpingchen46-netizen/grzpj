#!/usr/bin/env node
/**
 * Puppeteer-based browser extraction helper for clone-website skill.
 * Replaces browser MCP tools — supports screenshots, CSS extraction,
 * content extraction, asset discovery, and interaction testing.
 *
 * Usage:
 *   node scripts/extract.mjs <command> [args...]
 *
 * Commands:
 *   screenshot <url> [--fullPage] [--viewport=WxH] [--output=path]
 *   extract-css <url> <selector> [--viewport=WxH] [--output=path]
 *   extract-content <url> <selector> [--viewport=WxH] [--output=path]
 *   discover-assets <url> [--output=path]
 *   extract-fonts <url> [--output=path]
 *   extract-global-css <url> [--output=path]
 *   scroll-sweep <url> [--output=path]
 *   click-sweep <url> <selector> [--output=path]
 *   hover-styles <url> <selector> [--output=path]
 *   responsive-test <url> <selector> [--output=path]
 */

import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const CSS_PROPS = [
  'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
  'textTransform','textDecoration','backgroundColor','background',
  'backgroundImage','backgroundSize','backgroundPosition','backgroundRepeat',
  'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
  'margin','marginTop','marginRight','marginBottom','marginLeft',
  'width','height','maxWidth','minWidth','maxHeight','minHeight',
  'display','flexDirection','justifyContent','alignItems','gap',
  'gridTemplateColumns','gridTemplateRows',
  'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
  'boxShadow','overflow','overflowX','overflowY',
  'position','top','right','bottom','left','zIndex',
  'opacity','transform','transition','cursor','animation',
  'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
  'whiteSpace','textOverflow','WebkitLineClamp',
  'fontStyle','textAlign','verticalAlign',
];

function parseViewport(vp) {
  if (!vp) return { width: 1440, height: 900 };
  const [w, h] = vp.split('x').map(Number);
  return { width: w || 1440, height: h || 900 };
}

async function launchBrowser() {
  return puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });
}

// ==== Asset Discovery ====
async function cmdDiscoverAssets(url) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const assets = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      parentClasses: img.parentElement?.className?.toString().split(' ').slice(0, 5).join(' '),
      siblings: img.parentElement ? [...img.parentElement.querySelectorAll('img')].length : 0,
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex,
    }));

    const videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector('source')?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted,
    }));

    const bgImages = [...document.querySelectorAll('*')]
      .filter(el => {
        const bg = getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none';
      })
      .map(el => ({
        url: getComputedStyle(el).backgroundImage,
        element: el.tagName + '.' + (el.className?.toString().split(' ')[0] || ''),
      }));

    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({
      href: l.href,
      sizes: l.sizes?.toString() || '',
    }));

    const linkFonts = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .filter(l => l.href.includes('fonts.googleapis.com') || l.href.includes('fonts.'))
      .map(l => l.href);

    return { images: imgs, videos, backgroundImages: bgImages, svgCount: document.querySelectorAll('svg').length, favicons, linkFonts };
  });

  await browser.close();
  return assets;
}

// ==== Font Extraction ====
async function cmdExtractFonts(url) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const fonts = await page.evaluate(() => {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, li, div, body');
    const fontMap = new Map();
    const seen = new Set();

    for (const el of elements) {
      if (el.textContent?.trim().length < 3) continue;
      const cs = getComputedStyle(el);
      const key = `${cs.fontFamily}|${cs.fontSize}|${cs.fontWeight}|${cs.fontStyle}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const tag = el.tagName.toLowerCase();
      if (!fontMap.has(tag)) {
        fontMap.set(tag, {
          tag,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          fontStyle: cs.fontStyle,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          sample: el.textContent.trim().slice(0, 50),
        });
      }
    }

    const linkTags = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .filter(l => l.href.includes('fonts.googleapis.com') || l.href.includes('fonts.'));

    return {
      elements: [...fontMap.values()],
      linkTags: linkTags.map(l => l.href),
      bodyFont: getComputedStyle(document.body).fontFamily,
    };
  });

  await browser.close();
  return fonts;
}

// ==== CSS Extraction for a specific selector ====
async function cmdExtractCSS(url, selector, viewportStr) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const vp = parseViewport(viewportStr);
  await page.setViewport(vp);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const result = await page.evaluate(({ selector, props }) => {
    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach(p => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== '0s' && v !== '0deg') {
          styles[p] = v;
        }
      });
      return styles;
    }

    function walk(element, depth) {
      if (depth > 5) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        classes: element.className?.toString().split(' ').slice(0, 8).join(' '),
        text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
          ? element.textContent.trim().slice(0, 300) : null,
        styles: extractStyles(element),
        images: element.tagName === 'IMG' ? {
          src: element.src || element.currentSrc,
          alt: element.alt,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
        } : null,
        childCount: children.length,
        children: children.slice(0, 25).map(c => walk(c, depth + 1)).filter(Boolean),
      };
    }

    const el = document.querySelector(selector);
    if (!el) return { error: 'Element not found: ' + selector };
    return walk(el, 0);
  }, { selector, props: CSS_PROPS });

  await browser.close();
  return result;
}

// ==== Global CSS extraction (body, :root variables, etc.) ====
async function cmdExtractGlobalCSS(url) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const globalCSS = await page.evaluate(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const bodyStyles = getComputedStyle(document.body);

    // Extract CSS custom properties from :root
    const customProps = {};
    const allStyles = [...document.documentElement.style];
    // Also try to get computed custom properties
    const commonProps = [
      '--background', '--foreground', '--primary', '--primary-foreground',
      '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
      '--accent', '--accent-foreground', '--destructive', '--border',
      '--input', '--ring', '--radius', '--font-sans', '--font-mono',
    ];
    commonProps.forEach(p => {
      const v = rootStyles.getPropertyValue(p);
      if (v) customProps[p] = v.trim();
    });

    // Get all stylesheets and look for :root variables
    const cssVariables = {};
    try {
      [...document.styleSheets].forEach(sheet => {
        try {
          [...sheet.cssRules].forEach(rule => {
            if (rule.selectorText === ':root' || rule.selectorText === ':root, .dark' || rule.selectorText === '.dark') {
              [...rule.style].forEach(prop => {
                if (prop.startsWith('--')) {
                  cssVariables[`${rule.selectorText}|${prop}`] = rule.style.getPropertyValue(prop).trim();
                }
              });
            }
          });
        } catch (e) { /* cross-origin stylesheet */ }
      });
    } catch (e) { /* */ }

    return {
      body: {
        fontFamily: bodyStyles.fontFamily,
        fontSize: bodyStyles.fontSize,
        color: bodyStyles.color,
        backgroundColor: bodyStyles.backgroundColor,
        lineHeight: bodyStyles.lineHeight,
      },
      customProps,
      cssVariables,
      documentStyles: {
        overflow: bodyStyles.overflow,
        overflowX: bodyStyles.overflowX,
        margin: bodyStyles.margin,
        padding: bodyStyles.padding,
      },
      // Check for smooth scroll libraries
      hasLenis: !!document.querySelector('.lenis') || !!document.querySelector('[data-lenis]'),
      hasLocomotiveScroll: !!document.querySelector('[data-scroll-container]') || !!document.querySelector('.locomotive-scroll'),
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      scrollSnapType: getComputedStyle(document.documentElement).scrollSnapType || getComputedStyle(document.body).scrollSnapType,
    };
  });

  await browser.close();
  return globalCSS;
}

// ==== Scroll Sweep ====
async function cmdScrollSweep(url) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const findings = [];

  // Check header behavior
  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector('header, nav, [class*="header"], [class*="navbar"], [class*="Header"], [class*="Navbar"]');
    if (!header) return null;
    const cs = getComputedStyle(header);
    return {
      selector: header.tagName + (header.className ? '.' + header.className.toString().split(' ').slice(0, 3).join('.') : ''),
      position: cs.position,
      top: cs.top,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      width: cs.width,
    };
  });
  findings.push({ type: 'header_initial', ...headerInfo });

  // Scroll down gradually and observe
  const scrollObservations = await page.evaluate(async () => {
    const observations = [];
    const totalHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const steps = Math.min(20, Math.ceil(totalHeight / viewportHeight));

    for (let i = 0; i <= steps; i++) {
      const scrollY = Math.round((totalHeight - viewportHeight) * (i / steps));
      window.scrollTo(0, scrollY);
      await new Promise(r => setTimeout(r, 300));

      // Check header
      const header = document.querySelector('header, nav, [class*="header"], [class*="navbar"], [class*="Header"], [class*="Navbar"]');
      if (header) {
        const cs = getComputedStyle(header);
        observations.push({
          scrollY,
          header: {
            backgroundColor: cs.backgroundColor,
            boxShadow: cs.boxShadow,
            height: cs.height,
            position: cs.position,
            opacity: cs.opacity,
          },
        });
      }
    }
    return observations;
  });

  findings.push({ type: 'scroll_observations', observations: scrollObservations });

  await browser.close();
  return findings;
}

// ==== Screenshot ====
async function cmdScreenshot(url, opts = {}) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const vp = parseViewport(opts.viewport);
  await page.setViewport(vp);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  if (opts.fullPage) {
    await page.screenshot({ path: opts.output, fullPage: true });
  } else {
    await page.screenshot({ path: opts.output });
  }

  await browser.close();
  return { saved: opts.output, viewport: vp };
}

// ==== Click Sweep for interactive elements ====
async function cmdClickSweep(url, parentSelector) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Scroll element into view
  if (parentSelector) {
    await page.evaluate(sel => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, parentSelector);
    await new Promise(r => setTimeout(r, 500));
  }

  const clickableElements = await page.evaluate((parentSel) => {
    const container = parentSel ? document.querySelector(parentSel) : document;
    if (!container) return [];

    const selectors = 'button, a, [role="button"], [role="tab"], [tabindex], .tab, .pill, [class*="tab"], [class*="Tab"], [class*="pill"], [class*="Pill"], [onclick]';
    const elements = [...container.querySelectorAll(selectors)];

    return elements.map(el => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent.trim().slice(0, 50),
      classes: el.className?.toString().split(' ').slice(0, 5).join(' '),
      href: el.href || null,
      role: el.getAttribute('role'),
      ariaSelected: el.getAttribute('aria-selected'),
    }));
  }, parentSelector);

  const states = [];
  for (let i = 0; i < Math.min(clickableElements.length, 20); i++) {
    const el = clickableElements[i];
    try {
      // Click the element
      const clickResult = await page.evaluate((idx) => {
        const container = document;
        const selectors = 'button, a, [role="button"], [role="tab"], [tabindex], .tab, .pill, [class*="tab"], [class*="Tab"], [onclick]';
        const elements = [...container.querySelectorAll(selectors)];
        const el = elements[idx];
        if (!el) return null;
        el.click();
        return { clicked: true, text: el.textContent.trim().slice(0, 50) };
      }, i);

      await new Promise(r => setTimeout(r, 800));

      // Capture state after click
      const state = await page.evaluate(() => {
        // Try to capture any visible changed content
        const modals = [...document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="Modal"], [class*="popup"], [class*="Popup"]')];
        const dropdowns = [...document.querySelectorAll('[class*="dropdown"], [class*="Dropdown"], [class*="menu"], [class*="Menu"]')];
        return {
          url: window.location.href,
          visibleModals: modals.map(m => ({ classes: m.className?.toString().split(' ').slice(0, 3).join(' '), visible: m.offsetParent !== null })),
          visibleDropdowns: dropdowns.map(d => ({ classes: d.className?.toString().split(' ').slice(0, 3).join(' '), visible: d.offsetParent !== null })),
        };
      });

      states.push({ element: el, state });
    } catch (e) {
      states.push({ element: el, error: e.message });
    }
  }

  await browser.close();
  return { clickableElements, states };
}

// ==== Responsive Test ====
async function cmdResponsiveTest(url, selector) {
  const browser = await launchBrowser();
  const breakpoints = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 },
  ];

  const results = {};

  for (const bp of breakpoints) {
    const page = await browser.newPage();
    await page.setViewport({ width: bp.width, height: bp.height });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const layout = await page.evaluate(({ selector: sel, bpName }) => {
      const container = sel ? document.querySelector(sel) : document.body;
      if (!container) return { error: 'Selector not found' };

      function getLayoutInfo(el, depth = 0) {
        if (depth > 4) return null;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          classes: el.className?.toString().split(' ').slice(0, 5).join(' '),
          rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
          display: cs.display,
          flexDirection: cs.flexDirection,
          flexWrap: cs.flexWrap,
          gridTemplateColumns: cs.gridTemplateColumns,
          width: cs.width,
          maxWidth: cs.maxWidth,
          padding: cs.padding,
          children: [...el.children].slice(0, 15).map(c => getLayoutInfo(c, depth + 1)).filter(Boolean),
        };
      }

      return getLayoutInfo(container);
    }, { selector, bpName: bp.name });

    results[bp.name] = { viewport: bp, layout };
    await page.close();
  }

  await browser.close();
  return results;
}

// ==== Main ====
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log('Usage: node scripts/extract.mjs <command> [args...]');
    console.log('Commands: screenshot, extract-css, extract-content, discover-assets, extract-fonts, extract-global-css, scroll-sweep, click-sweep, hover-styles, responsive-test');
    process.exit(1);
  }

  let result;
  const url = args[1];
  const selector = args[2];

  // Parse --key=value options from remaining args
  const opts = {};
  args.slice(3).forEach(a => {
    const m = a.match(/^--(.+?)=(.+)$/);
    if (m) opts[m[1]] = m[2];
    else if (a === '--fullPage') opts.fullPage = true;
  });

  switch (command) {
    case 'screenshot':
      result = await cmdScreenshot(url, { viewport: opts.viewport, fullPage: opts.fullPage, output: opts.output });
      break;
    case 'extract-css':
      result = await cmdExtractCSS(url, selector, opts.viewport);
      break;
    case 'discover-assets':
      result = await cmdDiscoverAssets(url);
      break;
    case 'extract-fonts':
      result = await cmdExtractFonts(url);
      break;
    case 'extract-global-css':
      result = await cmdExtractGlobalCSS(url);
      break;
    case 'scroll-sweep':
      result = await cmdScrollSweep(url);
      break;
    case 'click-sweep':
      result = await cmdClickSweep(url, selector);
      break;
    case 'responsive-test':
      result = await cmdResponsiveTest(url, selector);
      break;
    default:
      console.error('Unknown command:', command);
      process.exit(1);
  }

  // Save to file if --output specified
  // Skip JSON output for screenshot command (already saved as binary)
  if (opts.output && command !== 'screenshot') {
    mkdirSync(dirname(resolve(opts.output)), { recursive: true });
    writeFileSync(opts.output, JSON.stringify(result, null, 2));
    console.log('Saved to:', opts.output);
  } else if (command === 'screenshot') {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

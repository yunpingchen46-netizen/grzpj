# Page Topology — studio-size.com

## Overall Layout
- **Background:** Black (#000000)
- **Fonts:** Neue Haas Grotesk Display (headings), Neue Haas Grotesk Text (body/buttons)
- **Smooth Scroll:** Lenis.js enabled
- **Page wrapper:** `#swup` (transition-slide, animate-ready)
- **Custom cursor:** `.mouse-frame.active` overlay

## Sections (top to bottom)

### 1. Preloader (`.preloader`)
- Full-screen preloader animation (splash screen)

### 2. Header (`#page-header`, `.page-header`)
- **Type:** Fixed overlay (position: fixed, z-index: 999)
- **Background:** Black
- **Layout:** Container with logo (left), main-nav (center/right), hamburger (right)
- **Sub-components:**
  - Logo (SVG image)
  - Navigation links (Portfolio, etc.)
  - "Get in touch" pill button (border: 2px solid #1d1d1d, border-radius: 70px)
  - Hamburger menu button
- **Dropdown menu:** `.dropdown-menu` (separate overlay)

### 3. Hero Title (`section.hero_title`)
- **Type:** Static content
- **Content:** Large split-line animated heading
  - Line 1: "Design studio"
  - Line 2: "for timeless branding strategy"
- **Typography:** 108px, weight 600, line-height 97px, letter-spacing -2.16px
- **Padding:** 182px top, 60px bottom

### 4. Video Module / Showreel (`section.video_module.no-border.inited`)
- **Type:** Video player section
- **Content:** "Showreel" video (45 sec), Vimeo-hosted
- **Has:** Play button overlay, drag interaction

### 5. Featured Work Slider (`section.featured_work_slider`)
- **Type:** Interactive slider (Splide.js)
- **Content:** "Featured Work" heading + project cards with video thumbnails
- **Projects include:** Emilie Aubry, various featured works

### 6. Simple Text (`section.simple_text`)
- **Type:** Static text section
- **Content:** "When Art and Function Collide, Design Becomes Eternal — Simple, Intuitive, and Inspiring."

### 7. Rotating Slider (`section.rotating_slider`)
- **Type:** Auto-rotating slider
- **Content:** "Our creative freedom allows us..." text + rotating images

### 8. Services Module (`section.services_module`)
- **Type:** Grid of service cards with video backgrounds
- **Services:** Branding, Brand Strategy, Motion Graphics, Video Editing, 3D Animation, Audio Production, Web Design, Photography, Naming, Packaging, Advertising, Brand Art

### 9. Slider with Text (`section.slider_with_text.inited`)
- **Type:** Image slider with accompanying text
- **Content:** Meeting room images, process descriptions (Clean concept, Random, etc.)

### 10. Background Video CTA (`section.background_video_cta_variation`)
- **Type:** CTA section with video background
- **Content:** "Create something big with Size Assets" + "Buy Assets" button

### 11. Footer (`#page-footer`, `.page-footer`)
- **Type:** Static footer
- **Content:** Social links (Instagram, Behance, Dribbble, Vimeo, YouTube, LinkedIn, Savee.it, Fonts in Use, Pinterest)

## Overlays
- Cookie consent banner (`.cky-consent-container`) — dismissable
- Custom cursor (`.mouse-frame.active`) — follows mouse
- Dropdown menu (`.dropdown-menu`) — triggered by nav

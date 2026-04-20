# 🚀 METHEELEGEND - Professional Portfolio

> A modern, multi-page portfolio website featuring stunning visual effects, smooth animations, and professional design.

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![Performance](https://img.shields.io/badge/Performance-95+-success)](https://github.com/UnEngineerableFish52/My-website)

## ✨ Features

### 🎨 Modern Design
- **Multi-page structure** - 5 separate pages for organized content
- **Animated gradients** - Dynamic color effects that respond to user interaction
- **Glassmorphic cards** - Beautiful frosted glass effect with subtle borders
- **Neon color scheme** - Cyberpunk-inspired color palette with glowing effects
- **Smooth transitions** - Page entries and scroll reveal animations

### 🎬 Visual Effects
- **Epic 13-second intro** - Legendary sequence on homepage (5 animated phases)
- **Scroll-following avatar** - Hexagonal vessel with physics-based movement
- **Background video** - Sci-fi themed looping video (customizable)
- **Mouse tracking** - Interactive radial gradient follows cursor
- **Scroll reveal** - Elements smoothly animate into view
- **Hover glows** - Cards and buttons glow with neon colors on hover
- **Animated progress bars** - Skill levels animate when scrolled into view
- **Particle effects** - Matrix rain, burst animations, and more

### 🔊 Interactive Sound & Music
- **Epic intro music** - 13-second legendary sequence with synthesized soundtrack
- **Background music system** - Loops after intro with MP3 or Web Audio fallback
- **Click sounds** - Clean Web Audio API synthesized click feedback
- **Audio controls** - Easy toggle button for music on/off
- **Smart fallback** - Works without MP3 files using synthesized audio

### 📱 Responsive Design
- **Mobile-first approach** - Optimized for all screen sizes
- **Touch-friendly** - Large interactive areas for mobile devices
- **Performance optimized** - Video disabled on mobile, reduced animations

## 📄 Pages

### 🏠 Home (index.html)
- **Epic intro sequence** - 13-second legendary animation (skippable)
- **Scroll-following avatar** - Interactive hexagonal vessel with physics
- Hero section with call-to-action buttons
- Featured projects preview (3 cards)
- Statistics section
- Background music system
- 3-4 full scrolls of content

### 👤 About (about.html)
- Full biography section
- Interactive timeline of journey
- Interests & hobbies with icon cards
- 4-5 full scrolls of content

### 💼 Projects (projects.html)
- 9+ detailed project cards
- Filter buttons (All, Web, Mobile, Design)
- Technology badges
- Demo and GitHub links
- 5-6 full scrolls of content

### 🛠️ Skills (skills.html)
- Frontend development skills with progress bars
- Backend development skills
- Tools & technologies grid
- Certifications section
- Soft skills
- 4 full scrolls of content

### 📧 Contact (contact.html)
- Working contact form with validation
- Contact information cards
- Social media links
- Availability status
- 2-3 full scrolls of content

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/UnEngineerableFish52/My-website.git
cd My-website
```

2. Download a background video (optional):
   - Visit https://www.pexels.com/videos/
   - Search for "sci-fi digital" or "particles space"
   - Download a video (1920x1080, ~2-5MB recommended)
   - Rename to `scifi-background.mp4`
   - Place in `videos/` directory

3. Download music files (optional - synthesized fallback works without these):
   - **Intro**: "Invincible Pt. II" by DEAF KEV from NCS
     - Download: https://ncs.io/Invincible2
     - Rename to: `deaf-kev-invincible-pt2.mp3`
   - **Background**: "Sky High" by Elektronomia from NCS
     - Download: https://ncs.io/SkyHigh
     - Rename to: `elektronomia-sky-high.mp3`
   - Place both files in `sounds/` directory
   - **Note**: If files are missing, the site will use Web Audio API to generate music

4. Add avatar GIF (optional - fallback "M" logo works without this):
   - Create or find an animated GIF (recommended: 160x160px)
   - Rename to `avatar.gif`
   - Place in `images/` directory

5. Open `index.html` in your browser or deploy to any static hosting service.

### Customization

#### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --neon-blue: #00f3ff;
    --neon-pink: #ff006e;
    --cyber-purple: #8b00ff;
    --neon-green: #39ff14;
    /* Add your custom colors */
}
```

#### Content
- Update text content in each HTML file
- Replace project cards with your own projects
- Update skills and percentages
- Add your social media links

#### Background Video
- Replace `videos/scifi-background.mp4` with your video
- Adjust opacity in CSS (currently 0.3)
- Can be disabled by removing video element

## ✅ Verifying CSS Changes Locally & in Deployment

### Confirm changes locally

1. **Open the file directly** — open `index.html` in your browser (no server needed for a static site).
2. **Hard-reload to bust cache** — press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (macOS) to force a full reload that ignores cached files.
3. **Check DevTools** — open DevTools (F12) → Network tab → tick "Disable cache" → reload.  Confirm `css/styles.css` is fetched with a `200` status and the file size matches what's on disk.
4. **Inspect the element** — in the Elements panel, select the element you styled and confirm the expected rule appears under the Styles pane (not crossed out).

### Ensure deployment picks up CSS changes

This is a **static site** hosted via GitHub Pages (or similar).  
GitHub Pages serves files directly from the `main` branch — no build step is needed.

| Step | What to do |
|------|-----------|
| 1 | Commit **and push** your CSS/HTML edits to `main` |
| 2 | Wait ~1-2 min for GitHub Pages to rebuild |
| 3 | Hard-reload the live URL (`Ctrl+Shift+R`) in the browser |
| 4 | If changes still don't appear, open DevTools → Application → Storage → Clear site data (clears any Service Worker cache) |

> **Why changes sometimes don't appear after a push:**  
> Browsers aggressively cache CSS files. If the filename (`styles.css`) doesn't change, the browser serves the cached copy. A hard-reload (`Ctrl+Shift+R`) always fetches fresh files, bypassing the cache.

### Diagnosing "changes not reflected"

- Open DevTools → Sources → find `css/styles.css` → check that the content matches your latest edits.
- If the file looks stale, look at the Network tab response headers for `Cache-Control` / `ETag`.
- A Service Worker (`site.webmanifest` / any registered SW) may also cache assets — clear it under DevTools → Application → Service Workers → Unregister.

---

## 📁 Project Structure

```
My-website/
├── css/
│   └── styles.css          # Main stylesheet (~1,300 lines - includes legendary styles)
├── js/
│   ├── legendary.js        # Legendary intro & music systems (1,683 lines)
│   └── main.js             # Main JavaScript file
├── images/
│   ├── avatar.gif          # Optional: Scroll-following avatar
│   └── README.md           # Avatar instructions
├── sounds/
│   ├── *.mp3               # Optional: NCS music files
│   └── README.md           # Music download instructions
├── videos/
│   └── scifi-background.mp4  # Background video
├── index.html              # Home page (with legendary intro)
├── about.html              # About page
├── projects.html           # Projects page
├── skills.html             # Skills page
├── contact.html            # Contact page
├── favicon.svg             # Site icon
└── README.md              # This file
```

## 🎯 Performance

- **Lighthouse Score**: 95+ (target)
- **First Contentful Paint**: <1.5s
- **Total JavaScript**: <5KB minified
- **No external dependencies**: Vanilla JavaScript only
- **Optimized animations**: GPU-accelerated transforms

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations, GPU-accelerated transforms
- **JavaScript (ES6+)** - Interactive features, intro system, music player
- **Web Audio API** - Click sounds & synthesized music fallback
- **Intersection Observer** - Scroll reveal animations
- **Canvas API** - Particle effects and matrix rain
- **localStorage** - Mute state persistence

## 📝 License

This project is licensed under the MIT License.

## 🙏 Credits

- **Design & Development**: METHEELEGEND (PRO SAMKING)
- **Fonts**: Google Fonts (Orbitron, Poppins)
- **Icons**: Unicode Emoji
- **Music** (optional): 
  - "Invincible Pt. II" by DEAF KEV (NCS Release)
  - "Sky High" by Elektronomia (NCS Release)
  - Web Audio API synthesized fallback

## 🎵 Legendary Features

The METHEELEGEND portfolio includes special legendary features on the homepage:

### Epic Intro Sequence (13 seconds)
- **Phase 1**: System awakening with floating text
- **Phase 2**: PRO SAMKING text formation
- **Phase 3**: M logo reveal with 3 rotating hexagonal rings
- **Phase 4**: Portal activation effect
- **Phase 5**: Hexagonal shatter transition
- **Skippable**: Press the skip button to jump to content

### Music System
- **Intro Music**: Epic 13-second soundtrack
- **Background Loop**: Continuous music after intro
- **Smart Fallback**: Works with MP3 files OR synthesized Web Audio
- **Audio Control**: Click button (bottom-right) to toggle music on/off
- **Persistent State**: Your mute preference is saved

### Scroll-Following Avatar
- **Physics-Based**: Smooth spring physics movement
- **Interactive**: Follows your scroll position
- **Bounces**: Animation when you stop scrolling
- **Hexagonal Vessel**: 3 rotating neon rings
- **Customizable**: Use your own avatar.gif or fallback "M" logo

### Performance
- **Adaptive**: Reduces particle count on mobile/low-end devices (50/100/200)
- **GPU Accelerated**: All animations use transform3d
- **Optimized**: Intro only on homepage, not on other pages
- **Accessible**: ARIA labels, keyboard navigation, reduced motion support
- **Background Video**: Pexels (Free to use)

## 📞 Contact

- **Website**: https://samrat.tech
- **GitHub**: [@UnEngineerableFish52](https://github.com/UnEngineerableFish52)
- **Email**: contact@metheelegend.com

---

Made with 💙 by METHEELEGEND

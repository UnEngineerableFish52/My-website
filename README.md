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
- **Background video** - Sci-fi themed looping video (customizable)
- **Mouse tracking** - Interactive radial gradient follows cursor
- **Scroll reveal** - Elements smoothly animate into view
- **Hover glows** - Cards and buttons glow with neon colors on hover
- **Animated progress bars** - Skill levels animate when scrolled into view

### 🔊 Interactive Sound
- **Click sounds** - Clean Web Audio API synthesized click feedback
- **No background music** - Performance-optimized, no heavy audio files
- **Lightweight** - Minimal JavaScript for maximum speed

### 📱 Responsive Design
- **Mobile-first approach** - Optimized for all screen sizes
- **Touch-friendly** - Large interactive areas for mobile devices
- **Performance optimized** - Video disabled on mobile, reduced animations

## 📄 Pages

### 🏠 Home (index.html)
- Hero section with call-to-action buttons
- Featured projects preview (3 cards)
- Statistics section
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

2. Download a background video:
   - Visit https://www.pexels.com/videos/
   - Search for "sci-fi digital" or "particles space"
   - Download a video (1920x1080, ~2-5MB recommended)
   - Rename to `scifi-background.mp4`
   - Place in `videos/` directory

3. Open `index.html` in your browser or deploy to any static hosting service.

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

## 📁 Project Structure

```
My-website/
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # Main JavaScript file
├── videos/
│   └── scifi-background.mp4  # Background video
├── index.html              # Home page
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
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive features
- **Web Audio API** - Click sound effects
- **Intersection Observer** - Scroll reveal animations

## 📝 License

This project is licensed under the MIT License.

## 🙏 Credits

- **Design & Development**: METHEELEGEND (PRO SAMKING)
- **Fonts**: Google Fonts (Orbitron, Poppins)
- **Icons**: Unicode Emoji
- **Background Video**: Pexels (Free to use)

## 📞 Contact

- **Website**: https://samrat.tech
- **GitHub**: [@UnEngineerableFish52](https://github.com/UnEngineerableFish52)
- **Email**: contact@metheelegend.com

---

Made with 💙 by METHEELEGEND

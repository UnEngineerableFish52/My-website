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

### 📱 Responsive Design
- **Mobile-first approach** - Optimized for all screen sizes
- **Touch-friendly** - Large interactive areas for mobile device 

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

## 📁 Project Structure

```
My-website/
├── css/
│   └── styles.css          # Main stylesheet ( - includes legendary styles)
├── js/
│   ├── legendary.js        # Legendary intro & music systems 
│   └── main.js             # Main JavaScript file
├── images/
│   ├── avatar.gif          # Optional: Scroll-following avatar
│   └── README.md           # Avatar instructions
├── sounds/
│   ├── *.mp3               # Optional: NCS music files
│   └── README.md           # Music download

                             #home lines
                             # About page
├── projects.html           # Projects page
├── skills.html             # Skills page
├── contact.html            # Contact page
├── favicon.svg             # Site icon
└── README.md              # This file
```

## 🎯 Performance

- **Lighthouse Score**: 90+
- **Optimized animations**: GPU-accelerated transforms

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations, GPU-accelerated transforms
- **JavaScript (ES6+)** - Interactive features, intro system, music player
- **Web Audio API** - Click sounds & synthesized music fallback
- **Intersection Observer** - Scroll reveal animations
- **Canvas API** - Particle effects and matrix rain
- **Sideways border** - Recurrsive plus attractive bordering with yellow highlights and visuals brightening and fading

## 📝 License

This project is licensed under the MIT License.

## 🙏 Credits

- **Design & Development**: METHEELEGEND (PRO SAMKING)
- **Fonts**: Google Fonts (Orbitron, Poppins)
- **Icons**: Unicode Emoji
- **Music** : 
  - Past-Lives-(Instrumental).mp3

## 🎵 Legendary Features

The METHEELEGEND portfolio includes special legendary features on the homepage:

### Epic Intro Sequence (13 seconds)
- **Phase 1**: System awakening with floating text
- **Phase 2**: PRO SAMKING text formation
- **Phase 3**: M logo reveal with 3 rotating hexagonal rings (blue, pink, purple)
- **Phase 4**: Portal activation effect
- **Phase 5**: "ENTER THE LEGEND" reveal, fade to main page

### 🔊 Music System
- **Intro Music**: Epic 13-second synthesized soundtrack
- **Background Loop**: Continuous MP3 or synthesized fallback after intro
- **Smart Fallback**: MP3 files OR Web Audio API synthesized music

### 🎭 Scroll-Following Avatar
- **Movements**: Physics-based spring following scroll position
- **Interactive**: Follows scroll with gravity-drop entrance after intro
- **Bounces**: Landing and deceleration bounce animations
- **Hexagonal Vessel**: Spinning hex ring with M logo center

### ⚙️ Technical Notes
- **Intro replay**: Plays once per browser session (sessionStorage — replays on new tab)
- **Audio**: Requires user interaction to start (browser autoplay policy)
- **Avatar**: Uses `images/avatar.gif` if present, falls back to "M" logo
- **GPU Accelerated**: All animations use CSS transforms
- **Accessible**: ARIA labels, keyboard navigation (Escape/Space skips intro), reduced motion support

## 📞 Contact

- **Website**: https://samrat.tech
- **GitHub**: [@UnEngineerableFish52](https://github.com/UnEngineerableFish52)
- **Email**: sharma@samrat.tech


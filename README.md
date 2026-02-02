# CyberSolutionsOhio

A modern, cyberpunk-themed portfolio website for Chris Heppard - Full-Stack Developer and Security Specialist based in Cincinnati, Ohio.

![CyberSolutionsOhio](https://img.shields.io/badge/CyberSolutions-Ohio-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-06B6D4?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-Latest-black?logo=three.js)

## 🚀 Live Demo

Visit the live site: [https://heppard87.github.io](https://heppard87.github.io)

## ✨ Features

- **Immersive 3D Hero Section** - Floating geometric shapes with Three.js
- **Interactive Service Cards** - 3D flip animations with detailed information
- **Apps & Games Showcase** - Categorized display of interactive applications
- **Smooth Scroll Animations** - GSAP ScrollTrigger with Lenis smooth scrolling
- **Cyberpunk Aesthetic** - Dark theme with neon accents and glassmorphism
- **Responsive Design** - Fully responsive across all devices
- **Terminal-style Contact Form** - Unique hacker-inspired contact interface

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React

## 📁 Project Structure

```
├── src/
│   ├── sections/          # Page sections
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Apps.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── games/             # Interactive games (coming soon)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/                # Static assets
├── dist/                  # Build output
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/heppard87/heppard87.github.io.git
cd heppard87.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch.

## 🎨 Customization

### Colors

The color scheme is defined in `src/index.css` using CSS variables:

```css
:root {
  --cyber-blue: 217 91% 60%;
  --cyber-purple: 262 83% 58%;
  --cyber-cyan: 187 94% 43%;
  --cyber-green: 160 84% 39%;
  --cyber-orange: 38 92% 50%;
  --cyber-red: 0 84% 60%;
  --cyber-pink: 330 81% 60%;
}
```

### Content

- **Services**: Edit `src/sections/Services.tsx`
- **Apps/Games**: Edit `src/sections/Apps.tsx`
- **About**: Edit `src/sections/About.tsx`
- **Contact**: Edit `src/sections/Contact.tsx`

## 🎮 Interactive Apps & Games

The website showcases various interactive 3D applications:

### Games
- Momentum Runner
- Rhythm Runner
- Trippy Run
- 3D Pong
- Cosmic Billiards
- Asteroid Field

### Utilities
- Voxel Painter
- DNA Visualizer
- Molecule Viewer
- Room Planner
- Zen Garden
- Solar System

### Logical Systems
- 3D Chess
- 3D Solitaire
- Memory Game
- Data Visualizer
- Cyber Dreams
- World Clock

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contact

- **Email**: chris@cybersolutionsohio.com
- **GitHub**: [@heppard87](https://github.com/heppard87)
- **Location**: Cincinnati, Ohio

---

Built with ❤️ by Chris Heppard | © 2026 CyberSolutionsOhio

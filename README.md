# 🎨 Color Playground (React + Vite)

**🔗 Live:** https://bacgroundcolorchnager.vercel.app

A modern RGB color playground built using **React** and **Vite** that allows users to dynamically change the background color using sliders, presets, and random generation — with color history tracking.

---

## 🚀 Features

- 🎚 RGB sliders with live gradient tracks for precise color control  
- 🎨 Curated 12-color palette plus Random  
- ⌨️ Editable HEX input (`#RGB` or `#RRGGBB`)  
- 📋 One-click copy of HEX / RGB values with feedback  
- 🧠 Debounced color history (last 10, saved in localStorage, clearable)  
- 🌈 Palettes from the current color: complementary, analogous, triadic, shades and tints (click to apply, copy a row)  
- 🔍 Contrast checker for any two colors with WCAG AA/AAA pass/fail for normal and large text (swap, live preview)  
- ♿ Text automatically switches between dark and white for readable contrast (ratio shown)  
- 📱 Responsive layout for phones and desktops  
- ⚡ Powered by Vite (fast HMR)
- **Installable & offline**: install it to your home screen or desktop with the **Install app** button; it keeps working without a connection
- **Light / dark theme**: follows your system by default; the toggle in the top bar remembers your choice

---

## 🛠 Tech Stack

- React 18  
- Vite  
- JavaScript (ES6+)  
- CSS  

---

## 📂 Project Structure


```
src/
├── App.jsx
├── ColorPanel.jsx
├── HistoryPanel.jsx
├── HarmonyPanel.jsx
├── ContrastChecker.jsx
├── colorUtils.js
├── App.css
├── index.css
└── main.jsx
```


---

## ▶️ Getting Started

```bash
git clone https://github.com/Prajjawalsingh87/bacgroundcolorchnager.git
cd bacgroundcolorchnager
npm install
npm run dev        # http://localhost:5173
```

## 📲 Install & offline (PWA)

`vite-plugin-pwa` generates `manifest.webmanifest` and a Workbox service worker (`sw.js`) at build time.
The service worker precaches the built app so it opens offline, and updates itself automatically when a
new version is deployed. The **Install app** button only appears when the browser offers installation
(the `beforeinstallprompt` event). Icons (`public/pwa-*.png`, maskable and Apple touch icons) are rendered
from the app's SVG logo. `vercel.json` serves `sw.js`, `registerSW.js` and the manifest with
`Cache-Control: no-cache` so updates are picked up promptly.

## 🌗 Theme

The app follows `prefers-color-scheme` until you pick a theme with the toggle (`src/shell/`); the choice is
saved in `localStorage` (`color-theme`) and applied before first paint. Dark-mode colours are CSS variables in
`src/theme.css`, wired into Tailwind by `tailwind.theme.js`, so the light design keeps Tailwind's stock colours. The browser `theme-color` keeps following the colour you mix.

## 🚀 Deployment

Deployed on **Vercel**; every push to `main` deploys to production.


## October 2026 improvements

Share the selected color through a `?color=` URL and copy a CSS custom property. The preview keeps its selected color while controls use the shared light design. Invalid saved history is ignored.


## Terminal verification and deployment

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Node.js 24 is used on Vercel. The production build is written to `dist/`.

```bash
vercel link --project bacgroundcolorchnager
vercel deploy          # preview
vercel deploy --prod   # publish production
```

The local `.vercel/` link is ignored by Git. Deployment credentials belong in
the CLI's login session, never in this repository.

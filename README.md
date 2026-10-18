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
- ♿ Text automatically switches between dark and white for readable contrast (ratio shown)  
- 📱 Responsive layout for phones and desktops  
- ⚡ Powered by Vite (fast HMR)

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

## 🚀 Deployment

Deployed on **Vercel**; every push to `main` deploys to production.

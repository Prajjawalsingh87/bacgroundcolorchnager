import { useEffect, useState, useRef, useCallback } from "react";
import ColorPanel from "./ColorPanel";
import HistoryPanel from "./HistoryPanel";
import { readableTextColor, toHex, toRgbString } from "./colorUtils";
import "./App.css";

const HISTORY_LIMIT = 10;
const HISTORY_KEY = "color-history";
const INITIAL_COLOR = { r: 99, g: 102, b: 241 };

const loadHistory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(saved) ? saved.slice(0, HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [color, setColor] = useState(INITIAL_COLOR);
  const [history, setHistory] = useState(loadHistory);

  const debounceRef = useRef(null);
  // Last color written to history (starts as the initial color so it isn't recorded).
  const lastRecordedRef = useRef(toHex(INITIAL_COLOR));

  const addHistory = useCallback((c) => {
    const hex = toHex(c);
    lastRecordedRef.current = hex;
    setHistory((prev) => {
      if (prev[0] === hex) return prev;
      return [hex, ...prev.filter((h) => h !== hex)].slice(0, HISTORY_LIMIT);
    });
  }, []);

  const updateColor = (newColor, addToHistory = false) => {
    setColor(newColor);

    if (addToHistory) {
      addHistory(newColor);
    }
  };

  // debounce slider updates
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (toHex(color) === lastRecordedRef.current) return;

    debounceRef.current = setTimeout(() => {
      addHistory(color);
    }, 800);

    return () => clearTimeout(debounceRef.current);
  }, [color, addHistory]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const hex = toHex(color);
  const text = readableTextColor(color);

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.remove();
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = hex;
    document.head.appendChild(meta);
  }, [hex]);

  return (
    <div
      className="bg-transition min-h-screen px-4 py-8 sm:px-8 lg:py-12"
      style={{ backgroundColor: toRgbString(color), color: text.color }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_400px] lg:gap-10">
        <header className="flex flex-col justify-between gap-8 lg:min-h-[calc(100vh-6rem)] lg:py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Color Playground</p>

          <div>
            <p className="font-mono text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">{hex}</p>
            <p className="mt-3 font-mono text-lg opacity-80 sm:text-xl">{toRgbString(color)}</p>
          </div>

          <p className="max-w-sm text-sm opacity-80">
            Text contrast on this color: <strong className="font-semibold">{(Math.floor(text.ratio * 10) / 10).toFixed(1)}:1</strong>{" "}
            ({text.ratio >= 7 ? "AAA" : text.ratio >= 4.5 ? "AA" : "AA large"}) using {text.isDark ? "white" : "dark"} text.
          </p>
        </header>

        <main className="flex min-w-0 flex-col gap-4">
          <ColorPanel color={color} updateColor={updateColor} />
          <HistoryPanel history={history} updateColor={updateColor} clearHistory={() => setHistory([])} />
        </main>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import ColorPanel from "./ColorPanel";
import HistoryPanel from "./HistoryPanel";
import "./App.css";

export default function App() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [history, setHistory] = useState([]);

  const debounceRef = useRef(null);

  const updateColor = (newColor, addToHistory = false) => {
    setColor(newColor);

    if (addToHistory) {
      addHistory(newColor);
    }
  };

  const addHistory = (c) => {
    const rgb = `rgb(${c.r}, ${c.g}, ${c.b})`;

    setHistory((prev) => {
      if (prev[0] === rgb) return prev;
      return [rgb, ...prev];
    });
  };

  // debounce slider updates
  useEffect(() => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      addHistory(color);
    }, 1000);

    return () => clearTimeout(debounceRef.current);
  }, [color]);

  const bgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <ColorPanel color={color} updateColor={updateColor} />
      <HistoryPanel history={history} updateColor={updateColor} />
    </div>
  );
}

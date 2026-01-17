import { useState } from "react";
import ColorPanel from "./ColorPanel";
import HistoryPanel from "./HistoryPanel";
import "./App.css";

function App() {
  const [color, setColor] = useState({ r: 142, g: 142, b: 255 });
  const [history, setHistory] = useState([]);

  const bgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

  const updateColor = (newColor, save = false) => {
    setColor(newColor);

    if (save) {
      const str = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
      setHistory((prev) =>
        prev[0] === str ? prev : [str, ...prev].slice(0, 10)
      );
    }
  };

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <ColorPanel color={color} updateColor={updateColor} />
      <HistoryPanel history={history} updateColor={updateColor} />
    </div>
  );
}

export default App;

function ColorPanel({ color, updateColor }) {
  const setPreset = (type) => {
    let newColor;

    if (type === "red") newColor = { r: 255, g: 0, b: 0 };
    if (type === "green") newColor = { r: 0, g: 255, b: 0 };
    if (type === "blue") newColor = { r: 0, g: 0, b: 255 };
    if (type === "random") {
      newColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      };
    }

    updateColor(newColor, true);
  };

  const hex = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;

  return (
    <div className="panel">
      <h2 className="title">🎨 RGB Color Playground</h2>

      <div className="controls-row">
        <div className="sliders">
          <label>R: {color.r}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={color.r}
            onChange={(e) =>
              updateColor({ ...color, r: +e.target.value })
            }
          />

          <label>G: {color.g}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={color.g}
            onChange={(e) =>
              updateColor({ ...color, g: +e.target.value })
            }
          />

          <label>B: {color.b}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={color.b}
            onChange={(e) =>
              updateColor({ ...color, b: +e.target.value })
            }
          />
        </div>

        <div className="values">
          <span>{`rgb(${color.r}, ${color.g}, ${color.b})`}</span>
          <span>{hex}</span>
        </div>
      </div>

      <div className="buttons">
        <button className="color-btn red" onClick={() => setPreset("red")}>
          Red
        </button>
        <button className="color-btn green" onClick={() => setPreset("green")}>
          Green
        </button>
        <button className="color-btn blue" onClick={() => setPreset("blue")}>
          Blue
        </button>
        <button className="color-btn random" onClick={() => setPreset("random")}>
          Random
        </button>
      </div>
    </div>
  );
}

export default ColorPanel;

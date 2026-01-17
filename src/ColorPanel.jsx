function clamp(value) {
  return Math.min(255, Math.max(0, value));
}

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
        b: Math.floor(Math.random() * 256)
      };
    }

    updateColor(newColor, true);
  };

  const updateChannel = (channel, value, save = false) => {
    updateColor(
      {
        ...color,
        [channel]: clamp(value)
      },
      save
    );
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

          {/* RED */}
          <div className="slider-row">
            <label>R</label>
            <input
              type="range"
              min="0"
              max="255"
              value={color.r}
              onChange={(e) => updateChannel("r", +e.target.value)}
              onMouseUp={(e) => updateChannel("r", +e.target.value, true)}
              onTouchEnd={(e) => updateChannel("r", +e.target.value, true)}
            />
            <input
              type="number"
              min="0"
              max="255"
              className="number-input"
              value={color.r}
              onChange={(e) => updateChannel("r", +e.target.value)}
              onBlur={(e) => updateChannel("r", +e.target.value, true)}
            />
          </div>

          {/* GREEN */}
          <div className="slider-row">
            <label>G</label>
            <input
              type="range"
              min="0"
              max="255"
              value={color.g}
              onChange={(e) => updateChannel("g", +e.target.value)}
              onMouseUp={(e) => updateChannel("g", +e.target.value, true)}
              onTouchEnd={(e) => updateChannel("g", +e.target.value, true)}
            />
            <input
              type="number"
              min="0"
              max="255"
              className="number-input"
              value={color.g}
              onChange={(e) => updateChannel("g", +e.target.value)}
              onBlur={(e) => updateChannel("g", +e.target.value, true)}
            />
          </div>

          {/* BLUE */}
          <div className="slider-row">
            <label>B</label>
            <input
              type="range"
              min="0"
              max="255"
              value={color.b}
              onChange={(e) => updateChannel("b", +e.target.value)}
              onMouseUp={(e) => updateChannel("b", +e.target.value, true)}
              onTouchEnd={(e) => updateChannel("b", +e.target.value, true)}
            />
            <input
              type="number"
              min="0"
              max="255"
              className="number-input"
              value={color.b}
              onChange={(e) => updateChannel("b", +e.target.value)}
              onBlur={(e) => updateChannel("b", +e.target.value, true)}
            />
          </div>

        </div>

        <div className="values">
          <span>{`rgb(${color.r}, ${color.g}, ${color.b})`}</span>
          <span>{hex}</span>
        </div>
      </div>

      <div className="buttons">
        <button className="color-btn red" onClick={() => setPreset("red")}>Red</button>
        <button className="color-btn green" onClick={() => setPreset("green")}>Green</button>
        <button className="color-btn blue" onClick={() => setPreset("blue")}>Blue</button>
        <button className="color-btn random" onClick={() => setPreset("random")}>Random</button>
      </div>
    </div>
  );
}

export default ColorPanel;

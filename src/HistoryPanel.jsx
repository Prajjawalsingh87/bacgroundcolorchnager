function HistoryPanel({ history, updateColor }) {
  return (
    <div className="history-panel">
      <h3>🎨 Last 10 Colors</h3>

      <div className="history-grid">
        {history.map((color, i) => (
          <div
            key={i}
            className="history-color"
            style={{ backgroundColor: color }}
            onClick={() => {
              const [r, g, b] = color.match(/\d+/g).map(Number);
              updateColor({ r, g, b });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoryPanel;

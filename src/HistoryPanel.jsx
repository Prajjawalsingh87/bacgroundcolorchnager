function HistoryPanel({ history, updateColor }) {
  return (
    <div className="history-panel">
      <h3>🎨 Last 10 Colors</h3>

      <div className="history-grid">
        {history.map((c, i) => (
          <div
            key={i}
            className="history-color"
            style={{ backgroundColor: c }}
            title={c}
            onClick={() => {
              const [r, g, b] = c.match(/\d+/g).map(Number);
              updateColor({ r, g, b }, true);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoryPanel;

import { parseHex } from "./colorUtils";

function HistoryPanel({ history, updateColor, clearHistory }) {
  return (
    <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-panel sm:p-6" aria-labelledby="history-title">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="history-title" className="text-sm font-semibold text-slate-700">
          Recent colors <span className="font-normal text-slate-500">({history.length}/10)</span>
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="rounded-md px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
          Colors you pick or mix will show up here.
        </p>
      ) : (
        <ul className="grid grid-cols-5 gap-2">
          {history.map((c) => (
            <li key={c}>
              <button
                type="button"
                title={c}
                aria-label={`Use ${c}`}
                onClick={() => updateColor(parseHex(c))}
                className="group flex w-full flex-col items-center gap-1 rounded-lg p-1 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="block h-10 w-full rounded-md ring-1 ring-inset ring-black/10" style={{ backgroundColor: c }} />
                <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-900">{c}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HistoryPanel;

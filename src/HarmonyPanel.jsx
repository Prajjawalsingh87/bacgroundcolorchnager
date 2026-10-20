import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { harmonies, toHex } from "./colorUtils";

function HarmonyPanel({ color, updateColor }) {
  const current = toHex(color);
  const [status, setStatus] = useState({ id: null, text: "" });
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyRow = async (id, name, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus({ id, text: `Copied ${name} palette.` });
    } catch {
      setStatus({ id: null, text: `Clipboard blocked. Copy this: ${value}` });
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus((s) => (s.id ? { id: null, text: "" } : s)), 1500);
  };

  return (
    <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-panel sm:p-6" aria-labelledby="harmony-title">
      <h2 id="harmony-title" className="font-semibold">Palettes from this color</h2>
      <p className="studio-note mt-1" role="status">{status.text || "Click a swatch to use it. Copy a row to get all of its HEX values."}</p>

      <div className="mt-4 space-y-4">
        {harmonies(color).map((h) => {
          const hexes = h.colors.map(toHex);
          return (
            <div key={h.id}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-700">{h.name}</h3>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  onClick={() => copyRow(h.id, h.name, hexes.join(", "))}
                  aria-label={`Copy ${h.name} palette: ${hexes.join(", ")}`}
                >
                  {status.id === h.id ? "Copied!" : "Copy"}
                </button>
              </div>
              <ul className="flex gap-2">
                {h.colors.map((c, i) => {
                  const hex = hexes[i];
                  const active = hex === current;
                  return (
                    <li key={`${hex}-${i}`} className="min-w-0 flex-1">
                      <button
                        type="button"
                        title={`Use ${hex}`}
                        aria-label={`Use ${hex}${active ? " (current color)" : ""}`}
                        onClick={() => updateColor(c, true)}
                        className="group flex w-full flex-col items-center gap-1 rounded-lg p-1 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        <span
                          className={`block h-10 w-full rounded-md ring-1 ring-inset ring-black/10 ${active ? "outline outline-2 outline-offset-2 outline-slate-900" : ""}`}
                          style={{ backgroundColor: hex }}
                        />
                        <span className="truncate font-mono text-[10px] text-slate-500 group-hover:text-slate-900">{hex}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HarmonyPanel;

HarmonyPanel.propTypes = {
  color: PropTypes.shape({ r: PropTypes.number.isRequired, g: PropTypes.number.isRequired, b: PropTypes.number.isRequired }).isRequired,
  updateColor: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { parseHex, randomColor, toHex, toRgbString } from "./colorUtils";

const PALETTE = [
  { name: "Rose", hex: "#F43F5E" },
  { name: "Orange", hex: "#F97316" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Lime", hex: "#84CC16" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Teal", hex: "#14B8A6" },
  { name: "Sky", hex: "#0EA5E9" },
  { name: "Indigo", hex: "#6366F1" },
  { name: "Violet", hex: "#8B5CF6" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Slate", hex: "#334155" },
  { name: "Cream", hex: "#FEF3C7" },
];

const CHANNELS = [
  { key: "r", label: "Red" },
  { key: "g", label: "Green" },
  { key: "b", label: "Blue" },
];

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={`Copy ${label} ${value}`}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-emerald-600"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
      )}
      <span aria-live="polite">{copied ? "Copied!" : `Copy ${label}`}</span>
    </button>
  );
}

function ColorPanel({ color, updateColor }) {
  const hex = toHex(color);
  const [hexInput, setHexInput] = useState(hex);

  useEffect(() => {
    setHexInput(hex);
  }, [hex]);

  const commitHex = () => {
    const parsed = parseHex(hexInput);
    if (parsed) updateColor(parsed, true);
    else setHexInput(hex);
  };

  const trackFor = (key) => {
    const from = { ...color, [key]: 0 };
    const to = { ...color, [key]: 255 };
    return `linear-gradient(to right, ${toRgbString(from)}, ${toRgbString(to)})`;
  };

  return (
    <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-panel sm:p-6" aria-labelledby="mixer-title">
      <div className="flex items-center gap-4">
        <span
          className="h-14 w-14 shrink-0 rounded-xl ring-1 ring-inset ring-black/10"
          style={{ backgroundColor: hex }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <h2 id="mixer-title" className="text-base font-semibold">Mix a color</h2>
          <label htmlFor="hex-input" className="sr-only">HEX value</label>
          <input
            id="hex-input"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            onBlur={commitHex}
            onKeyDown={(e) => e.key === "Enter" && commitHex()}
            spellCheck={false}
            maxLength={7}
            className="mt-1 w-full rounded-md border border-transparent bg-slate-100 px-2 py-1 font-mono text-sm uppercase text-slate-800 outline-none transition hover:border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {CHANNELS.map(({ key, label }) => (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <label htmlFor={`range-${key}`} className="font-medium text-slate-700">{label}</label>
              <span className="w-10 text-right font-mono text-slate-500">{color[key]}</span>
            </div>
            <input
              id={`range-${key}`}
              type="range"
              min="0"
              max="255"
              value={color[key]}
              className="channel-range"
              style={{ background: trackFor(key) }}
              onChange={(e) => updateColor({ ...color, [key]: +e.target.value })}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <CopyButton value={hex} label="HEX" />
        <CopyButton value={toRgbString(color)} label="RGB" />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Palette</h3>
          <button
            type="button"
            onClick={() => updateColor(randomColor(), true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 3h5v5" /><path d="M4 20L21 3" /><path d="M21 16v5h-5" /><path d="M15 15l6 6" /><path d="M4 4l5 5" /></svg>
            Random
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {PALETTE.map((p) => {
            const active = p.hex === hex;
            return (
              <button
                key={p.hex}
                type="button"
                title={`${p.name} ${p.hex}`}
                aria-label={`${p.name} ${p.hex}`}
                aria-pressed={active}
                onClick={() => updateColor(parseHex(p.hex), true)}
                className={`aspect-square rounded-lg ring-1 ring-inset ring-black/10 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  active ? "outline outline-2 outline-offset-2 outline-slate-900" : ""
                }`}
                style={{ backgroundColor: p.hex }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ColorPanel;

CopyButton.propTypes = { value: PropTypes.string.isRequired, label: PropTypes.string.isRequired };
ColorPanel.propTypes = { color: PropTypes.shape({ r: PropTypes.number.isRequired, g: PropTypes.number.isRequired, b: PropTypes.number.isRequired }).isRequired, updateColor: PropTypes.func.isRequired };

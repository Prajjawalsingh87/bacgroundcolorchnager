import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { checkContrast, formatRatio, parseHex, toHex } from "./colorUtils";

function ColorField({ id, label, value, onChange, onUseCurrent }) {
  const [text, setText] = useState(value);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setText(value);
    setInvalid(false);
  }, [value]);

  const commit = () => {
    const parsed = parseHex(text);
    if (parsed) onChange(toHex(parsed));
    else {
      setInvalid(true);
      setText(value);
    }
  };

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="color"
          value={value.toLowerCase()}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          aria-label={`${label} color picker`}
          className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-slate-200 bg-white p-0.5"
        />
        <input
          id={id}
          value={text}
          onChange={(e) => { setText(e.target.value); setInvalid(false); }}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          spellCheck={false}
          maxLength={7}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className="studio-input w-full px-3 py-2 font-mono text-sm uppercase"
        />
      </div>
      {invalid && <p id={`${id}-error`} className="mt-1 text-xs text-rose-700">Use a HEX value like #1E293B.</p>}
      <button type="button" onClick={onUseCurrent} className="mt-1 rounded px-1 text-xs font-medium text-indigo-700 hover:underline">
        Use current color
      </button>
    </div>
  );
}

function Result({ label, pass }) {
  return (
    <li className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${pass ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}>
      <span>{label}</span>
      <strong className="font-semibold">{pass ? "Pass" : "Fail"}</strong>
    </li>
  );
}

function ContrastChecker({ color }) {
  const current = toHex(color);
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState(current);
  const result = checkContrast(parseHex(fg), parseHex(bg));

  return (
    <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-panel sm:p-6" aria-labelledby="contrast-title">
      <h2 id="contrast-title" className="font-semibold">Contrast checker</h2>
      <p className="studio-note mt-1">Check if text is easy to read on a background (WCAG 2).</p>

      <div className="mt-4 grid grid-cols-1 items-start gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <ColorField id="contrast-fg" label="Text" value={fg} onChange={setFg} onUseCurrent={() => setFg(current)} />
        <button
          type="button"
          onClick={() => { setFg(bg); setBg(fg); }}
          className="studio-button justify-self-center px-2.5 sm:mt-6"
          aria-label="Swap text and background colors"
          title="Swap"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 4L3 8l4 4" /><path d="M3 8h18" /><path d="M17 20l4-4-4-4" /><path d="M21 16H3" /></svg>
        </button>
        <ColorField id="contrast-bg" label="Background" value={bg} onChange={setBg} onUseCurrent={() => setBg(current)} />
      </div>

      <div className="mt-4 rounded-xl p-4 ring-1 ring-inset ring-black/10" style={{ backgroundColor: bg, color: fg }}>
        <p className="text-sm">Normal text: The quick brown fox jumps over the lazy dog.</p>
        <p className="mt-2 text-2xl font-bold">Large text sample</p>
      </div>

      <p className="mt-4 text-sm text-slate-700" aria-live="polite">
        Contrast ratio: <strong className="font-mono text-lg text-slate-900">{formatRatio(result.ratio)}</strong>
      </p>
      <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Result label="AA normal text" pass={result.aaNormal} />
        <Result label="AA large text" pass={result.aaLarge} />
        <Result label="AAA normal text" pass={result.aaaNormal} />
        <Result label="AAA large text" pass={result.aaaLarge} />
      </ul>
      <p className="studio-note mt-2">Large text is 24px, or 18.66px bold. AA needs 4.5:1 (3:1 large); AAA needs 7:1 (4.5:1 large).</p>
    </section>
  );
}

export default ContrastChecker;

ColorField.propTypes = { id: PropTypes.string.isRequired, label: PropTypes.string.isRequired, value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired, onUseCurrent: PropTypes.func.isRequired };
Result.propTypes = { label: PropTypes.string.isRequired, pass: PropTypes.bool.isRequired };
ContrastChecker.propTypes = { color: PropTypes.shape({ r: PropTypes.number.isRequired, g: PropTypes.number.isRequired, b: PropTypes.number.isRequired }).isRequired };

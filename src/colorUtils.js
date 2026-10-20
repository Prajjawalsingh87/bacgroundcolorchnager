export const toHex = ({ r, g, b }) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;

export const toRgbString = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

export const parseHex = (value) => {
  let hex = value.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const channel = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export const luminance = ({ r, g, b }) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

export const contrastRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

// Pick whichever of near-black / white reads better on the given color.
export const readableTextColor = (color) => {
  const l = luminance(color);
  const dark = { hex: "#0F172A", l: 0.0099 };
  const light = { hex: "#FFFFFF", l: 1 };
  const darkRatio = contrastRatio(l, dark.l);
  const lightRatio = contrastRatio(l, light.l);
  return darkRatio >= lightRatio
    ? { color: dark.hex, ratio: darkRatio, isDark: false }
    : { color: light.hex, ratio: lightRatio, isDark: true };
};

export const randomColor = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
});

// ---- HSL helpers and palette generation ----

export const rgbToHsl = ({ r, g, b }) => {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return { h: h * 60, s, l };
};

export const hslToRgb = ({ h, s, l }) => {
  const hh = (((h % 360) + 360) % 360) / 360;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    let x = t;
    if (x < 0) x += 1;
    if (x > 1) x -= 1;
    if (x < 1 / 6) return p + (q - p) * 6 * x;
    if (x < 1 / 2) return q;
    if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
    return p;
  };
  return {
    r: Math.round(hue(hh + 1 / 3) * 255),
    g: Math.round(hue(hh) * 255),
    b: Math.round(hue(hh - 1 / 3) * 255),
  };
};

const rotate = (color, degrees) => {
  const hsl = rgbToHsl(color);
  return hslToRgb({ ...hsl, h: hsl.h + degrees });
};

// Mix toward white (amount > 0) or black (amount < 0), amount in 0..1.
export const mix = (color, target, amount) => ({
  r: Math.round(color.r + (target.r - color.r) * amount),
  g: Math.round(color.g + (target.g - color.g) * amount),
  b: Math.round(color.b + (target.b - color.b) * amount),
});

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

export const harmonies = (color) => [
  { id: "complementary", name: "Complementary", colors: [color, rotate(color, 180)] },
  { id: "analogous", name: "Analogous", colors: [rotate(color, -30), color, rotate(color, 30)] },
  { id: "triadic", name: "Triadic", colors: [color, rotate(color, 120), rotate(color, 240)] },
  { id: "shades", name: "Shades", colors: [0, 0.2, 0.4, 0.6, 0.8].map((a) => mix(color, BLACK, a)) },
  { id: "tints", name: "Tints", colors: [0, 0.2, 0.4, 0.6, 0.8].map((a) => mix(color, WHITE, a)) },
];

// ---- WCAG contrast check between two colors ----

export const checkContrast = (fg, bg) => {
  const ratio = contrastRatio(luminance(fg), luminance(bg));
  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
};

// Round down so a ratio like 4.499 never shows as a passing "4.5".
export const formatRatio = (ratio) => `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;

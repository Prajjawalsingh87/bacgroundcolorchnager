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

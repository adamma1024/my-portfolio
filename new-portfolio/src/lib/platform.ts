const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
export const MOD = isMac ? "⌘" : "Ctrl";
export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

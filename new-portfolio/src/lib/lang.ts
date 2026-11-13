export type Lang = "en" | "zh";
const isLang = (v: unknown): v is Lang => v === "en" || v === "zh";

/** URL `?lang=` first (shareable), then the stored choice, then the browser language. */
export function pickLang(search: string, stored: string | null, navigatorLang: string): Lang {
  const fromUrl = new URLSearchParams(search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  if (isLang(stored)) return stored;
  return navigatorLang.toLowerCase().startsWith("zh") ? "zh" : "en";
}

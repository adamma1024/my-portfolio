import { createContext, useContext, useEffect, useLayoutEffect, useRef, type RefObject } from "react";

export type KeyMap = Record<string, (e: KeyboardEvent) => void>;
export const KeysCtx = createContext<RefObject<KeyMap> | null>(null);

/** Registers the current page's Vim bindings. They take priority over the global ones. */
export function usePageKeys(map: KeyMap) {
  const ref = useContext(KeysCtx);
  if (!ref) throw new Error("usePageKeys must be used inside <KeysCtx>");
  const latest = useRef(map);
  useLayoutEffect(() => {
    latest.current = map;
  });
  const signature = Object.keys(map).join("\u0000");
  useEffect(() => {
    // Stable proxy so handlers always see fresh state without re-registering on every render.
    const proxy: KeyMap = {};
    for (const k of signature.split("\u0000")) proxy[k] = (e) => latest.current[k]?.(e);
    ref.current = proxy;
    // Lets tests (and anything else) know the page's bindings are live.
    document.documentElement.dataset.pageKeys = String(Object.keys(proxy).length);
    return () => {
      if (ref.current !== proxy) return;
      ref.current = {};
      delete document.documentElement.dataset.pageKeys;
    };
  }, [ref, signature]);
}

export type KeyResult =
  | { type: "run"; scope: "page" | "global"; seq: string }
  | { type: "pending"; seq: string }
  | { type: "none" };

/**
 * Vim-style key resolution. `pending` is what has been typed so far; page bindings
 * win over global ones, and an exact match wins over waiting for a longer sequence.
 */
export function resolveKey(pending: string, key: string, pageKeys: readonly string[], globalKeys: readonly string[]): KeyResult {
  const seq = pending + key;
  if (pageKeys.includes(seq)) return { type: "run", scope: "page", seq };
  if (globalKeys.includes(seq)) return { type: "run", scope: "global", seq };
  if ([...pageKeys, ...globalKeys].some((k) => k.length > seq.length && k.startsWith(seq))) return { type: "pending", seq };
  if (pending) return resolveKey("", key, pageKeys, globalKeys);
  return { type: "none" };
}

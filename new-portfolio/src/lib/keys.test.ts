import { describe, expect, it } from "vitest";
import { resolveKey } from "./keys";

const page = ["j", "gg", "G"];
const global = ["j", "k", "gg", "gt", "yy", "?"];

describe("resolveKey", () => {
  it("prefers the page binding over the global one", () => {
    expect(resolveKey("", "j", page, global)).toEqual({ type: "run", scope: "page", seq: "j" });
  });
  it("falls back to global", () => {
    expect(resolveKey("", "k", page, global)).toEqual({ type: "run", scope: "global", seq: "k" });
  });
  it("waits when the key is only a prefix", () => {
    expect(resolveKey("", "g", page, global)).toEqual({ type: "pending", seq: "g" });
    expect(resolveKey("", "y", page, global)).toEqual({ type: "pending", seq: "y" });
  });
  it("completes a sequence", () => {
    expect(resolveKey("g", "g", page, global)).toEqual({ type: "run", scope: "page", seq: "gg" });
    expect(resolveKey("g", "t", page, global)).toEqual({ type: "run", scope: "global", seq: "gt" });
  });
  it("retries the key alone when a sequence dead-ends", () => {
    expect(resolveKey("g", "k", page, global)).toEqual({ type: "run", scope: "global", seq: "k" });
  });
  it("reports unbound keys", () => {
    expect(resolveKey("", "z", page, global)).toEqual({ type: "none" });
  });
});

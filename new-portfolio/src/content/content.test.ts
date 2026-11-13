import { describe, expect, it } from "vitest";
import { ACCENTS, ENTRIES, METRICS, POSTS, SKILLS, entryById, skillById } from "./index";
import { monthIndex } from "@/lib/time";

describe("content integrity", () => {
  it("has unique ids", () => {
    const ids = ENTRIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    const sk = SKILLS.map((s) => s.id);
    expect(new Set(sk).size).toBe(sk.length);
  });
  it.each(ENTRIES)("$id is complete in both languages", (e) => {
    for (const f of [e.short, e.org, e.title, e.team]) {
      expect(f.en).not.toBe("");
      expect(f.zh).not.toBe("");
    }
    expect(e.points.zh.length).toBe(e.points.en.length);
    expect(ACCENTS).toContain(e.color);
    expect(monthIndex(e.from, 0)).toBeLessThanOrEqual(monthIndex(e.to, Infinity));
  });
  it("only references known skills", () => {
    for (const e of ENTRIES) for (const s of e.uses) expect(() => skillById(s)).not.toThrow();
  });
  it("uses https for every external link", () => {
    const links = ENTRIES.flatMap((e) => [...e.links, ...(e.products ?? []).flatMap((p) => p.links)]);
    expect(links.length).toBeGreaterThan(10);
    for (const l of links) expect(l.href).toMatch(/^https:\/\//);
  });
  it("lists the founder venture with its products", () => {
    const v = entryById("dreamrealized");
    expect(v.kind).toBe("venture");
    expect(v.products?.map((p) => p.id)).toEqual(["gradpazz", "amber", "wooto", "agri"]);
  });
  it("points metrics at real entries and posts newest first", () => {
    for (const m of METRICS) expect(() => entryById(m.entry)).not.toThrow();
    const dates = POSTS.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});

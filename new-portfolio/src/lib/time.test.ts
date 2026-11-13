import { describe, expect, it } from "vitest";
import { monthIndex, monthLabel, uptimeSince, monthsBetween } from "./time";

describe("monthIndex", () => {
  it("turns YYYY.MM into a month count", () => {
    expect(monthIndex("2026.05", 0)).toBe(2026 * 12 + 4);
  });
  it("maps present to the supplied now", () => {
    expect(monthIndex("present", 999)).toBe(999);
  });
  it("throws on a malformed date", () => {
    expect(() => monthIndex("May 2026", 0)).toThrow(/YYYY\.MM/);
  });
});

describe("monthLabel", () => {
  it("round-trips", () => {
    expect(monthLabel(monthIndex("2013.09", 0))).toBe("2013.09");
  });
});

describe("monthsBetween", () => {
  it("is inclusive of both ends", () => {
    expect(monthsBetween("2022.01", "2024.08", 0)).toBe(32);
  });
});

describe("uptimeSince", () => {
  it("borrows days and months correctly", () => {
    const u = uptimeSince(new Date(2017, 1, 1), new Date(2026, 10, 13, 2, 3, 4));
    expect([u.y, u.m, u.d]).toEqual([9, 9, 12]);
    expect(u.clock).toBe("02:03:04");
  });
  it("handles a day borrow across a month end", () => {
    const u = uptimeSince(new Date(2020, 0, 31), new Date(2020, 2, 1));
    expect([u.y, u.m, u.d]).toEqual([0, 1, 1]);
  });
});

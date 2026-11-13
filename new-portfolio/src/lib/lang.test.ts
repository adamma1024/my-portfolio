import { describe, expect, it } from "vitest";
import { pickLang } from "./lang";

describe("pickLang", () => {
  it("lets the URL win", () => {
    expect(pickLang("?lang=zh", "en", "en-US")).toBe("zh");
    expect(pickLang("?lang=en", "zh", "zh-CN")).toBe("en");
  });
  it("then the stored choice", () => {
    expect(pickLang("", "zh", "en-US")).toBe("zh");
  });
  it("then the browser language", () => {
    expect(pickLang("", null, "zh-CN")).toBe("zh");
    expect(pickLang("", null, "fr-FR")).toBe("en");
  });
  it("ignores unknown values", () => {
    expect(pickLang("?lang=de", "xx", "en")).toBe("en");
  });
});

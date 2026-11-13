import { expect, test, type Page } from "@playwright/test";

const html = (page: Page) => page.locator("html");
/** Opens a page and waits until its keyboard bindings are attached (they register after first paint). */
const open = async (page: Page, path: string) => {
  await page.goto(path);
  await expect(html(page)).toHaveAttribute("data-keys", "on");
  await expect(html(page)).toHaveAttribute("data-page-keys", /\d+/);
};
const press = async (page: Page, ...keys: string[]) => {
  for (const k of keys) await page.keyboard.press(k);
};

test.describe("pages", () => {
  test("home shows identity, founder venture and latest posts", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Lin Ma." })).toBeVisible();
    await expect(page.getByText("Head of Client Engineering · Sekai").first()).toBeVisible();
    await expect(page.getByText("Founder · DreamRealized").first()).toBeVisible();
    const venture = page.getByTestId("venture");
    for (const name of ["Gradpazz", "Amber", "Wooto", "Agriculture Chatbot"]) await expect(venture.getByRole("heading", { name })).toBeVisible();
    await expect(venture.getByRole("link", { name: /App Store/ })).toHaveAttribute("href", /apps\.apple\.com\/us\/app\/gradpazz/);
    await expect(page.locator(".post")).toHaveCount(4);
    await expect(page.locator(".post").first()).toHaveAttribute("href", "https://www.adamma.me/blog/posts/vim/");
    await expect(page.locator(".avatar img").first()).toBeVisible();
  });

  test("experience lists every lane and the role links", async ({ page }) => {
    await page.goto("/experience");
    for (const lane of ["work", "founder", "education", "projects"]) await expect(page.locator(".tr-labels").getByText(lane, { exact: true })).toBeVisible();
    const inspector = page.getByTestId("inspector");
    await expect(inspector.getByRole("heading", { name: "Head of Client Engineering" })).toBeVisible();
    await expect(inspector.getByRole("heading", { name: "Founder" })).toBeVisible();
    await expect(inspector.getByRole("link", { name: /Sekai MCP/ })).toHaveAttribute("href", "https://sekai.ai/mcp");
    await expect(inspector.getByRole("link", { name: /Khosla/ })).toHaveAttribute("href", /axios\.com/);
  });

  test("deep link ?at= moves the playhead", async ({ page }) => {
    await page.goto("/experience?at=2022.06");
    await expect(page.getByTestId("timecode")).toHaveText("2022.06");
    await expect(page.getByTestId("inspector").getByRole("heading", { name: "SDE II" })).toBeVisible();
    await expect(page.getByTestId("inspector").getByRole("link", { name: /Microsoft Fabric/ })).toHaveAttribute("href", /microsoft\.com/);
  });

  test("skills graph draws wires and pins from the URL", async ({ page }) => {
    await page.goto("/skills?pin=s:mcp");
    await expect(page.locator(".g-svg path").first()).toBeAttached();
    expect(await page.locator(".g-svg path").count()).toBeGreaterThan(20);
    // regression: editor syntax classes (.t) used to recolour node labels
    const label = page.locator('[data-node="w:sekai"] .t');
    expect(await label.evaluate((el) => getComputedStyle(el).color)).toBe(await page.locator("body").evaluate((el) => getComputedStyle(el).color));
    const detail = page.getByTestId("graph-detail");
    await expect(detail.getByRole("heading", { name: "MCP servers" })).toBeVisible();
    await expect(detail.getByText("Used in 2 places")).toBeVisible();
    await detail.getByRole("button", { name: /DreamRealized/ }).click();
    await expect(detail.getByRole("heading", { name: "Founder" })).toBeVisible();
  });

  test("source opens files, previews markdown and closes tabs", async ({ page }) => {
    await open(page, "/source?file=ventures/dreamrealized.ts");
    const editor = page.getByTestId("editor");
    await expect(editor.locator(".ed-tab.on")).toContainText("dreamrealized.ts");
    await expect(editor.locator(".code")).toContainText("DreamRealized Tech LLC");
    await expect(editor.locator('.code a[href="https://dreamrealized.net"]')).toBeVisible();
    await editor.getByRole("navigation").getByRole("button", { name: "README.md" }).click();
    await press(page, "p");
    await expect(page.getByTestId("md-preview").getByRole("heading", { name: "Lin Ma" })).toBeVisible();
    await press(page, "x");
    await expect(editor.locator(".ed-tab")).toHaveCount(2);
  });

  test("resume renders in both languages", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByTestId("resume")).toContainText("EXPERIENCE");
    await page.goto("/resume?lang=zh");
    await expect(page.getByTestId("resume")).toContainText("工作经历");
    await expect(page.getByTestId("resume")).toContainText("客户端工程负责人");
  });

  test("unknown routes show a way home", async ({ page }) => {
    await page.goto("/nope");
    await expect(page.getByText("This page does not exist.")).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("theme, accent, language", () => {
  test("theme toggle switches flavour and survives a reload without flashing", async ({ page }) => {
    await page.goto("/");
    await expect(html(page)).toHaveClass(/latte/);
    const base = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(await base()).toBe("rgb(230, 233, 239)");
    await page.getByTestId("theme-toggle").click();
    await expect(html(page)).toHaveClass(/mocha/);
    expect(await base()).toBe("rgb(24, 24, 37)");
    // The class must be set by the inline script, before the app bundle runs.
    await page.route("**/assets/*.js", (r) => r.abort());
    await page.reload();
    await expect(html(page)).toHaveClass(/mocha/);
  });

  test("follows the OS scheme until a choice is made", async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: "dark" });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(html(page)).toHaveClass(/mocha/);
    await expect(page.getByTestId("theme-toggle")).toHaveAttribute("aria-label", /currently dark mode/);
    await ctx.close();
  });

  test("accent defaults to blue, opens as a dropdown and persists", async ({ page }) => {
    await page.goto("/");
    const accent = () => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
    expect(await accent()).toBe("#1e66f5");
    await expect(page.getByTestId("accent-menu")).toHaveCount(0);
    await page.getByRole("button", { name: /Accent: blue/ }).click();
    await expect(page.getByTestId("accent-menu").getByRole("button")).toHaveCount(14);
    await page.getByTestId("accent-menu").getByRole("button", { name: "peach" }).click();
    await expect(page.getByTestId("accent-menu")).toHaveCount(0);
    expect(await accent()).toBe("#fe640b");
    await page.reload();
    await expect(html(page)).toHaveAttribute("data-accent", "peach");
  });

  test("language switch translates the page and keeps the URL shareable", async ({ page }) => {
    await page.goto("/experience");
    await page.getByRole("button", { name: "中", exact: true }).click();
    await expect(page).toHaveURL(/lang=zh/);
    await expect(html(page)).toHaveAttribute("lang", "zh-CN");
    await expect(page.getByRole("heading", { name: "经历." })).toBeVisible();
    await expect(page.getByTestId("inspector")).toContainText("客户端工程负责人");
    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(page).not.toHaveURL(/lang=/);
    await expect(page.getByRole("heading", { name: "Experience." })).toBeVisible();
  });
});

test.describe("keyboard", () => {
  test("number keys and gt/gT move between pages", async ({ page }) => {
    await open(page, "/");
    await press(page, "2");
    await expect(page).toHaveURL(/\/experience$/);
    await press(page, "g", "t");
    await expect(page).toHaveURL(/\/skills$/);
    await press(page, "g", "Shift+T");
    await expect(page).toHaveURL(/\/experience$/);
    await press(page, "4");
    await expect(page.getByRole("link", { name: /Source/ })).toHaveAttribute("aria-current", "page");
  });

  test("experience: h/l step a month, b/w a year, 0/$ jump to the ends", async ({ page }) => {
    await open(page, "/experience?at=2024.06");
    await press(page, "l");
    await expect(page.getByTestId("timecode")).toHaveText("2024.07");
    await press(page, "h", "h");
    await expect(page.getByTestId("timecode")).toHaveText("2024.05");
    await press(page, "b");
    await expect(page.getByTestId("timecode")).toHaveText("2023.05");
    await press(page, "w");
    await expect(page.getByTestId("timecode")).toHaveText("2024.05");
    await press(page, "0");
    await expect(page.getByTestId("timecode")).toHaveText("2013.01");
    await expect(page.getByTestId("inspector")).toContainText("between chapters");
    await press(page, "$");
    await expect(page.getByTestId("inspector").getByRole("heading", { name: "Head of Client Engineering" })).toBeVisible();
  });

  test("source: page keys beat global ones", async ({ page }) => {
    await open(page, "/source");
    await press(page, "j", "j");
    await expect(page.getByTestId("ed-line")).toHaveText("Ln 3, Col 1");
    await press(page, "Shift+G");
    await expect(page.getByTestId("ed-line")).not.toHaveText("Ln 3, Col 1");
    await press(page, "g", "g");
    await expect(page.getByTestId("ed-line")).toHaveText("Ln 1, Col 1");
    await press(page, "]");
    await expect(page.locator(".ed-tab.on")).toContainText("sekai.ts");
  });

  test("skills: j moves through nodes and esc unpins", async ({ page }) => {
    await open(page, "/skills");
    await press(page, "j");
    await expect(page.getByTestId("graph-detail").getByRole("heading", { name: "Founder" })).toBeVisible();
    await press(page, "Escape");
    await expect(page.getByTestId("graph-detail")).toContainText("nothing pinned");
  });

  test("? opens help, t toggles theme, L switches language, i focuses the shell", async ({ page }) => {
    await open(page, "/");
    await press(page, "?");
    await expect(page.getByTestId("key-help")).toBeVisible();
    await press(page, "Escape");
    await expect(page.getByTestId("key-help")).toHaveCount(0);
    await press(page, "t");
    await expect(html(page)).toHaveClass(/mocha/);
    await press(page, "Shift+L");
    await expect(html(page)).toHaveAttribute("lang", "zh-CN");
    await press(page, "i");
    await expect(page.locator("#sh-mini")).toBeFocused();
    await expect(page.getByTestId("vim-status")).toContainText("INSERT");
    await page.keyboard.type("accent mauve");
    await press(page, "Enter");
    await expect(html(page)).toHaveAttribute("data-accent", "mauve");
    await press(page, "Escape");
    await expect(page.getByTestId("vim-status")).toContainText("NORMAL");
  });

  test("typing in the shell does not trigger page shortcuts", async ({ page }) => {
    await open(page, "/");
    await page.locator("#sh-mini").click();
    await page.keyboard.type("whoami 2 t");
    await expect(page).toHaveURL(/\/$/);
    await expect(html(page)).toHaveClass(/latte/);
  });
});

test.describe("command palette", () => {
  test("opens with the shortcut, filters and navigates", async ({ page }) => {
    await open(page, "/");
    await press(page, "ControlOrMeta+k");
    const palette = page.getByTestId("palette");
    await expect(palette).toBeVisible();
    await page.keyboard.type("dreamrealized.ts");
    await press(page, "Enter");
    await expect(page).toHaveURL(/\/source\?file=ventures/);
    await expect(page.locator(".ed-tab.on")).toContainText("dreamrealized.ts");
    await expect(palette).toHaveCount(0);
  });

  test("shows an empty state and closes on escape", async ({ page }) => {
    await open(page, "/");
    await press(page, "/");
    await expect(page.getByTestId("palette")).toBeVisible();
    await page.keyboard.type("zzzzqqq");
    await expect(page.getByText(/No matches/)).toBeVisible();
    await press(page, "Escape");
    await expect(page.getByTestId("palette")).toHaveCount(0);
  });
});

test.describe("quality", () => {
  test("external links open safely and no page logs errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    for (const path of ["/", "/experience", "/skills", "/source", "/resume"]) {
      await page.goto(path);
      await expect(page.locator(".study").first()).toBeVisible();
      const unsafe = await page.locator('a[target="_blank"]:not([rel~="noopener"])').count();
      expect(unsafe, `${path} has target=_blank links without rel=noopener`).toBe(0);
    }
    expect(errors).toEqual([]);
  });

  test("no horizontal scroll on a phone", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    for (const path of ["/", "/experience", "/skills", "/source"]) {
      await page.goto(path);
      await expect(page.locator(".study").first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} scrolls sideways by ${overflow}px`).toBeLessThanOrEqual(0);
    }
    await ctx.close();
  });
});

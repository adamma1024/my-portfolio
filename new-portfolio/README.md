# Lin Ma · Portfolio

Interactive portfolio: Home, Experience (timeline), Skills (graph), Source (editor view) and Resume.
Catppuccin Latte/Mocha, English/中文, Vim keys everywhere, ⌘K command palette.

Design spec: [DESIGN.md](DESIGN.md). Content lives in one place: [`src/content/index.ts`](src/content/index.ts).

```bash
npm install
npm run dev         # http://localhost:5173
npm test            # unit tests (Vitest)
npm run e2e         # browser tests against the production build (Playwright)
npm run build:site  # app + /blog + CNAME + 404.html in dist/
npm run deploy      # publish dist/ to the gh-pages branch (www.adamma.me)
```

If Playwright's own browser download is broken on your machine, point it at any Chromium:

```bash
PW_CHROMIUM_PATH=/path/to/chrome npm run e2e
```

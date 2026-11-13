// Assembles the deployable site in dist/: the built app, the static Astro blog,
// the custom-domain CNAME, and a 404.html so GitHub Pages serves the SPA on deep links.
import { cpSync, copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const blog = resolve(root, "../public/blog");
const cname = resolve(root, "../CNAME");

const need = (path, hint) => {
  if (!existsSync(path)) {
    console.error(`Missing ${path}\n  ${hint}`);
    process.exit(1);
  }
};
need(resolve(dist, "index.html"), "Run `npm run build` first.");
need(resolve(blog, "index.html"), "The blog build is expected at ../public/blog (run `npm run build:blog` in the repo root).");
need(cname, "The CNAME file at the repo root sets the custom domain; without it the site would lose www.adamma.me.");

cpSync(blog, resolve(dist, "blog"), { recursive: true });
copyFileSync(cname, resolve(dist, "CNAME"));
copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
console.log("dist/ assembled: app + /blog + CNAME + 404.html");

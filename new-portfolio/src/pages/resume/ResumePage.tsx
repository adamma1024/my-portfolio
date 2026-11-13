import { useApp } from "@/app/useApp";
import Resume from "./Resume";
import "./resume.css";

/** Migrated from the old portfolio. Language and theme now follow the site-wide switches. */
export default function ResumePage() {
  const { lang, theme, t } = useApp();
  return (
    <section className="study resume-wrap">
      <div className="resume-bar">
        <button className="btn" onClick={() => window.print()}>
          {t.print}
        </button>
      </div>
      <div className={`resume-page resume-lang-${lang} ${theme === "dark" ? "resume-dark" : "resume-light"}`} data-testid="resume">
        <Resume variant="fullstack" lang={lang} />
        {/* Hidden print-only copy: 1x1 on screen, full size when printing */}
        <div className="resume-print-only">
          <Resume variant="fullstack" lang={lang} />
        </div>
      </div>
    </section>
  );
}

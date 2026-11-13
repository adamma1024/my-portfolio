import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router";
import { AppProvider } from "@/app/store";
import { useApp } from "@/app/useApp";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";

const Experience = lazy(() => import("@/pages/Experience"));
const Skills = lazy(() => import("@/pages/Skills"));
const Source = lazy(() => import("@/pages/Source"));
const ResumePage = lazy(() => import("@/pages/resume/ResumePage"));

function NotFound() {
  const { t } = useApp();
  return (
    <section className="study ed-empty">
      <div>404 · {t.notFound}</div>
      <Link className="btn" to="/">
        {t.goHome}
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Suspense fallback={<section className="study ed-empty" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/source" element={<Source />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </AppProvider>
  );
}

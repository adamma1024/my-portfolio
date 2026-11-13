import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/theme.css";
import "./styles/app.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error('Missing <div id="root"> in index.html: the app has nowhere to mount.');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

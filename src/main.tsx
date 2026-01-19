import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

createRoot(container).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Signal to prerenderer that the page is ready
document.dispatchEvent(new Event('render-event'));

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./shared/layout/App.tsx";
import "preline";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

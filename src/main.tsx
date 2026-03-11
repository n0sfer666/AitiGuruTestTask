import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./shared/styles/main.scss";
import { App } from "./app/App";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error("No root element found");
}

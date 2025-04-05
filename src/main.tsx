import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>Welcome</div>
  </StrictMode>
);

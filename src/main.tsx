import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/globals.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      "all",
      "826b-182-253-51-0.ngrok-free.app",
      "1d72-182-253-51-0.ngrok-free.app",
    ],
    port: 7200,
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: "index.html",
    },
    emptyOutDir: true,
  },
  optimizeDeps: {
    // Don't optimize these packages as they contain web workers and WASM files.
    // https://github.com/vitejs/vite/issues/11672#issuecomment-1415820673
    exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],
    // include: [],
    include: ["@powersync/web > js-logger"], // <-- Include `js-logger` when it isn't installed and imported.
    esbuildOptions: {},
  },
  plugins: [wasm(), topLevelAwait(), react(), tailwindcss()],
  worker: {
    format: "es",
    plugins: () => [wasm(), topLevelAwait()],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

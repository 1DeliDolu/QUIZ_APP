import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    headers: {
      "Cache-Control": "no-store",
    },
    proxy: {
      "/api": "http://localhost:4000",
    },
    hmr: {
      overlay: false,
    },
  },
});

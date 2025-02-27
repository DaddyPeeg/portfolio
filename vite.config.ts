import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginString from "vite-plugin-string";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginString()],
  base: "/portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

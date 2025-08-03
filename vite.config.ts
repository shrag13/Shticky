import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// A more reliable way to get the current directory, regardless of how the build command is executed.
const __dirname = path.resolve();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Corrected paths to point to the `client/` subdirectory from the root
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "client/attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.**"],
    },
  },
});

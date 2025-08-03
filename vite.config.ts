import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const plugins = [react(), runtimeErrorOverlay()];

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
  ) {
    const { default: replitPlugin } = await import(
      "@replit/vite-plugin-cartographer"
    );
    plugins.push(replitPlugin().cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        // Corrected paths to point to the `client/` subdirectory
        "@": path.resolve(import.meta.dirname, "client/src"),
        "@shared": path.resolve(import.meta.dirname, "shared"), // This path was correct
        "@assets": path.resolve(import.meta.dirname, "client/attached_assets"),
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
  };
});
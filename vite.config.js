import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      // Ensure this file is not included in the bundle process
      external: ["./lib/epos-2.27.0.js"],
    },
  },
  publicDir: "../public",
  server: {
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        res.setHeader("Permissions-Policy", "usb=(self)");
        next();
      });
    },
  },
});

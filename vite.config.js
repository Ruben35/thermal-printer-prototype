import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
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

import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite({
    quoteStyle: "double"
  })],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        configure: (proxy, _options) => {
          console.log(proxy);
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});

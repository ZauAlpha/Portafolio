// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["fdac821a1e87.ngrok-free.app"],
    },
  },
});

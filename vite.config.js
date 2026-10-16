import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /* node_modules puede ser un enlace compartido con otro proyecto: la caché de Vite va aparte. */
  cacheDir: ".vite",
  build: { chunkSizeWarningLimit: 800 },
});

import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      comp: fileURLToPath(new URL("./src/components", import.meta.url)),
      forth: fileURLToPath(
        new URL("./src/first/second/third/forth", import.meta.url),
      ),
    },
  },
});

import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { URL, fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      comp: fileURLToPath(new URL("./src/components/", import.meta.url)),
      forth: fileURLToPath(
        new URL("./src/first/second/third/forth/", import.meta.url),
      ),
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset(), tailwindcss()] }),
  ],
});

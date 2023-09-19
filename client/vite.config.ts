import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/development/app": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});

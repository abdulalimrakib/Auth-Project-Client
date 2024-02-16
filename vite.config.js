import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://authentication-app-loy8.onrender.com",
      // "/api": "http://localhost:4000"
    },
  },
  plugins: [react()],
});

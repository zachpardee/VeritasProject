import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This tells Vite to listen on all local addresses
    port: 5173,
    allowedHosts: "all", // This is the "Easy Button" to bypass the host error
  },
});

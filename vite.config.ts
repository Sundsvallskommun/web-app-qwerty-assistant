import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH,
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `js/assistant-${env.VITE_APPLICATION}-[hash].js`,
          assetFileNames: `assets/assistant-${env.VITE_APPLICATION}-[hash].[ext]`,
        },
      },
    },
  };
});

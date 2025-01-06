/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    open: true,
  },
});

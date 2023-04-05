import {defineConfig, UserConfig, ServerOptions} from "vite";
import react from "@vitejs/plugin-react";

interface MyConfig extends UserConfig {
  server: ServerOptions & {
    overlay: boolean;
  };
}
//@ts-ignore
export default defineConfig<MyConfig>({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable sourcemaps for better debugging experience
  },
  server: {
    overlay: true, // Enable error overlay for better debugging experience
  },
});

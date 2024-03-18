import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

const isServer = process.env.BUILD_TARGET === "server";

export default defineConfig({
  build: {
    // We want to leave the minification to the users, so we don't minify
    minify: false,

    // We want to generate a manifest for the client, but not for the server
    ssrManifest: !isServer,
    ssr: isServer,

    // We want to change the output dir and content based on the build target
    outDir: isServer ? "dist/server" : "dist/client",
    lib: {
      entry: {
        ...(!isServer && { index: resolve(__dirname, "src/entry-client.ts") }),
        ...(isServer && { server: resolve(__dirname, "src/entry-server.ts") }),
      },
      // As of 2024, basically only "es" matters
      formats: ["es"], // "cjs", "umd", "iife" ],
    },

    rollupOptions: {
      external: ["ofetch"],
    },
  },
  plugins: [
    // We include types to ease the use of the library
    dts({
      insertTypesEntry: true,
    }),
  ],
});

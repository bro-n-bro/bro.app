import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    define: {
        'process.env': {},
        '__VUE_I18N_FULL_INSTALL__': JSON.stringify(true),
        '__VUE_I18N_LEGACY_API__': JSON.stringify(true),
        '__INTLIFY_PROD_DEVTOOLS__': JSON.stringify(true)
    },

    plugins: [vue()],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});

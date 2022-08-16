// import { fileURLToPath, URL } from "node:url";
import path from 'path'

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pathSrc = path.resolve(__dirname, "./src")

export default defineConfig({
    define: {
        'process.env': {},
        // '__VUE_I18N_FULL_INSTALL__': JSON.stringify(true),
        // '__VUE_I18N_LEGACY_API__': JSON.stringify(true),
        // '__INTLIFY_PROD_DEVTOOLS__': JSON.stringify(true)
    },

    plugins: [vue()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
});

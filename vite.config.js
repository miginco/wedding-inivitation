import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
import * as dns from 'dns';


// https://vitejs.dev/config/

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
    plugins: [vue()],
    alias: {
        '@': resolve(__dirname, 'src')
    },
    resolve: {
        alias: {
            './runtimeConfig': './runtimeConfig.browser',
        },
    },
});

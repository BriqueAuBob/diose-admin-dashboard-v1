import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver({
                    importStyle: false,
                }),
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: false,
                }),
            ],
        }),
        Pages({
            extendRoute(route) {
                const path = route.path;
                if (path !== '/' && path !== '/authentification/callback') {
                    route.meta ||= {};
                    route.meta.auth = true;
                }
                return route;
            },
        }),
    ],
});

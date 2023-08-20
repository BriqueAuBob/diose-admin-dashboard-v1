import { createApp, isVNode } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './assets/styles/style.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';
import { useAuthStore } from './store/auth';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

console.log(routes);

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !localStorage.getItem('access_token')) {
        next({ name: 'Authentification' });
    } else {
        next();
    }
});

VueMarkdownEditor.use(vuepressTheme);

const app = createApp(App).use(ElementPlus).use(createPinia()).use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(VueMarkdownEditor);
app.mount('#app');

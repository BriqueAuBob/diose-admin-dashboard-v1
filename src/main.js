import { createApp, isVNode } from "vue";
import "./style.css";
import App from "./App.vue";

import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { useAuthStore } from "./store/auth";

console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem("access_token")) {
    next({ name: "Authentification" });
  } else {
    next();
  }
});

createApp(App).use(createPinia()).use(router).mount("#app");

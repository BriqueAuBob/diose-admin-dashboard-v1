<template>
  <div class="grid-cols-4" :class="!noLayout && 'lg:grid'">
    <div class="relative" v-if="!noLayout">
      <Sidebar />
    </div>
    <div
      class="md:col-span-3 py-12 px-6 md:px-12"
      :class="
        noLayout && 'flex flex-col items-center justify-center min-h-screen'
      "
    >
      <h1 class="font-semibold text-xl mb-8" :class="noLayout && 'text-center'">
        {{ $route.name }}
      </h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import axios from "./composables/axios";
import { onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "./store/auth";

const noLayout = ref(true);
const router = useRouter();
const route = useRoute();
watch(
  () => route.query.code,
  async (code) => {
    if (!code) return;
    const { data } = await axios.get(`auth/user/code?code=${code}`);
    localStorage.setItem("access_token", data.token.token);
    await useAuthStore().login(data.user);
    router.push("/dashboard");
  }
);

onMounted(async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    await useAuthStore().login();
  }
});

watch(
  () => route.path,
  (path) => {
    noLayout.value = path === "/" || path === "/authentification/callback";
  }
);
</script>

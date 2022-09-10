<template>
  <div class="grid-cols-4" :class="!noLayout && 'md:grid'">
    <div class="relative" v-if="!noLayout">
      <Sidebar />
    </div>
    <div
      class="md:col-span-3 p-12"
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
import { onMounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "./store/auth";

const noLayout = ref(true);
const router = useRouter();
const route = useRoute();
onMounted(() => {
  useAuthStore().login();
  setTimeout(() => {
    if (route.path !== "/" && route.path !== "/authentification/callback") {
      noLayout.value = false;
    }
  }, 100);
});
</script>

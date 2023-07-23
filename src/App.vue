<template>
  <el-container>
    <el-aside v-if="!noLayout">
      <Sidebar />
    </el-aside>
    <el-container class="is-vertical" :class="noLayout && 'center'">
      <el-header>
        <span>
          {{ $route.name }}
        </span>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
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

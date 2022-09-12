<template>
  <div class="text-2xl text-center">Chargement en cours...</div>
</template>

<route lang="yaml">
name: "Authentification C"
</route>

<script setup>
import axios from "../../composables/axios";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../store/auth";

onMounted(async () => {
  const router = useRouter();
  const route = useRoute();
  const code = route.query.code;
  const { data } = await axios.get(
    `auth/oauth2/discord/callback?code=${code}&admin=1`
  );
  localStorage.setItem("access_token", data.token.token);
  document.cookie =
    "access_token=Bearer " +
    data.token.token +
    "; expires=" +
    data.token.expires_at;
  await useAuthStore().login();
  router.push("/dashboard");
});
</script>

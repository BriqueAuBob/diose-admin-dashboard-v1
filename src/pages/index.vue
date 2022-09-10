<template>
  <div class="bg-white dark:bg-dark-900 w-1/3 p-6 rounded-lg shadow-sm">
    <Button
      class="w-full font-semibold bg-blurple"
      text="Connexion via Discord"
      @click="auth"
    />
  </div>
</template>

<route lang="yaml">
name: "Authentification"
</route>

<script setup>
import axios from "../composables/axios";

const auth = async () => {
  const { data } = await axios.get("/auth/oauth2/discord?admin=1");
  window.location.href = data.redirect;
};
</script>

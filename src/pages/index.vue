<template>
  <div class="bg-white dark:bg-dark-900 w-1/3 p-6 rounded-lg shadow-sm">
    <Button
      class="w-full font-semibold bg-blurple"
      text="Connexion"
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
  window.location.href =
    "https://auth.umaestro.fr/?redirect_uri=" +
    encodeURIComponent(window.location.href);
};
</script>

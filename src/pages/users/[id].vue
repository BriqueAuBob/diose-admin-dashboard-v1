<template>
  <div>
    <div class="flex gap-4 items-center">
      <img
        class="z-10 w-12 rounded-full border-3 border-white"
        :src="user?.avatar"
      />
      <div class="font-semibold text-md">
        {{ user.username }}#{{ user.discriminator }}
      </div>
    </div>
    <Button class="my-4" text="Mettre à jour l'avatar" @click="fetchAvatar" />
    <div class="grid gap-4 italic md:grid-cols-2 mt-8">
      <div>
        <span class="ml-2">ID</span>
        <Input :placeholder="user?.id?.toString()" :disabled="true" />
      </div>
      <div>
        <span class="ml-2">ID Discord</span>
        <Input :placeholder="user?.discord_id?.toString()" :disabled="true" />
      </div>
      <div>
        <span class="ml-2">Email</span>
        <Input :placeholder="user?.email" :disabled="true" />
      </div>
      <div>
        <span class="ml-2">Nom d'utilisateur</span>
        <Input :placeholder="user?.username" :disabled="true" />
      </div>
      <div>
        <span class="ml-2">Tag Discord</span>
        <Input :placeholder="'#' + user?.discriminator" :disabled="true" />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: "Profil de l'utilisateur"
</route>

<script setup>
import axios from "../../composables/axios";

import { useRoute } from "vue-router";

const user = ref({});
const route = useRoute();
onMounted(async () => {
  const { data } = await axios.get("/administration/users/" + route.params.id);
  user.value = data.user;
  document.title = "Profil de " + user.value.username;
});

const fetchAvatar = async () => {
  const { data } = await axios.put(
    "/administration/users/" + route.params.id + "/fetch-avatar"
  );
  user.value = data.user;
};
</script>

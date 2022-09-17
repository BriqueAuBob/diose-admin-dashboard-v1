<template>
  <div>
    <div class="text-2xl font-semibold">Bienvenue Brique au bob ! 👋</div>
    <div class="grid lg:grid-cols-3 gap-4 mt-5">
      <div class="bg-primary-500 p-8 rounded-lg text-white shadow-sm">
        <UsersIcon class="w-12 mx-auto mb-6" />
        <div class="text-4xl font-semibold text-center">
          {{ stats.members }}
        </div>
        <div class="text-lg mt-2 font-semibold text-center">Utilisateurs</div>
      </div>
      <div class="bg-secondary-500 p-8 rounded-lg text-white shadow-sm">
        <LinkIcon class="w-12 mx-auto mb-6" />
        <div class="text-4xl font-semibold text-center">2</div>
        <div class="text-lg mt-2 font-semibold text-center">Partenaires</div>
      </div>
      <div class="bg-orange-500 p-8 rounded-lg text-white shadow-sm">
        <CubeIcon class="w-12 mx-auto mb-6" />
        <div class="text-4xl font-semibold text-center">
          {{ stats.tools }}
        </div>
        <div class="text-lg mt-2 font-semibold text-center">Utilisations</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UsersIcon, CubeIcon, LinkIcon } from "@heroicons/vue/24/solid";
import { onMounted } from "@vue/runtime-core";
import axios from "../composables/axios";

const stats = ref({});
onMounted(async () => {
  const { data } = await axios.get("statistics");
  stats.value = data;
});
</script>

<route lang="yaml">
name: "Accueil"
</route>

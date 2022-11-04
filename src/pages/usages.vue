<template>
  <div class="relative">
    <div
      class="flex gap-4 w-full md:w-1/2 lg:w-1/3 md:ml-auto md:absolute right-0 md:-top-16"
    >
      <Input
        v-model="form.search"
        @enter="
          () => {
            page = 1;
            getUsages();
          }
        "
      />
    </div>
    <div class="pt-12">
      <div class="font-semibold text-md mb-8">
        Nous avons trouvé {{ meta.total }} résultats
      </div>
      <div
        v-for="(usage, index) of usages"
        :key="index"
        class="justify-between bg-white dark:bg-dark-900 hover:dark:bg-dark-800 ease-in duration-300 p-4 rounded-lg shadow-sm flex items-center font-medium text-lg gap-4 mb-3 hover:bg-gray-100 cursor-pointer"
      >
        <div v-if="usage.author" class="flex items-center">
          <img :src="usage.author.avatar" class="w-12 h-12 mr-2 rounded-full" />
          {{ usage.author.username }}#{{
            repeat(
              "0",
              usage.author.discriminator < 10
                ? 3
                : usage.author.discriminator < 100
                ? 2
                : usage.author.discriminator < 1000
                ? 1
                : 0
            )
          }}{{ usage.author.discriminator }}
        </div>
        <div v-else>Utilisateur inconnu...</div>
        <div class="font-semibold">{{ usage.tool }}</div>
      </div>
      <n-pagination
        class="mt-8"
        v-model:page="page"
        :page-count="meta.last_page"
        :theme-overrides="{
          common: {
            primaryColor: '#004be0',
          },
        }"
      />
    </div>
  </div>
</template>

<route lang="yaml">
name: "Utilisations des outils"
</route>

<script setup>
import { onMounted, watch } from "@vue/runtime-core";
import { repeat } from "lodash";
import axios from "../composables/axios";

const usages = ref([]);
const meta = ref({});
const page = ref(1);
const form = reactive({
  search: "",
});

const getUsages = async () => {
  const { data } = await axios.get(
    `/administration/usages?page=${page.value}&search=${form.search}`
  );
  usages.value = data.usages;
  meta.value = data.meta;
};

onMounted(() => {
  getUsages();
});

watch(page, getUsages);
</script>

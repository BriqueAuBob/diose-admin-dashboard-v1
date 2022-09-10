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
            getUsers();
          }
        "
      />
    </div>
    <div class="pt-12">
      <div
        v-for="(user, index) of users"
        :key="index"
        class="bg-white dark:bg-dark-900 hover:dark:bg-dark-800 ease-in duration-300 p-4 rounded-lg shadow-sm flex items-center font-medium text-lg gap-4 mb-3 hover:bg-gray-100 cursor-pointer"
      >
        <img :src="user.avatar" class="w-12 h-12 rounded-full" />
        {{ user.username }}#{{
          repeat(
            "0",
            user.discriminator < 10
              ? 3
              : user.discriminator < 100
              ? 2
              : user.discriminator < 1000
              ? 1
              : 0
          )
        }}{{ user.discriminator }}
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
name: "Utilisateurs"
</route>

<script setup>
import { onMounted, watch } from "@vue/runtime-core";
import { repeat } from "lodash";
import axios from "../composables/axios";

const users = ref([]);
const meta = ref({});
const page = ref(1);
const form = reactive({
  search: "",
});

const getUsers = async () => {
  console.log("search");
  const { data } = await axios.get(
    `administration/users?page=${page.value}&search=${form.search}`
  );
  users.value = data.users;
  meta.value = data.meta;
};

onMounted(() => {
  getUsers();
});

watch(page, getUsers);
</script>

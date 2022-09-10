<template>
  <aside
    class="w-1/4 hidden md:flex h-screen py-10 bg-white dark:bg-dark-900 fixed flex-col justify-between shadow-xl"
  >
    <div>
      <div
        class="flex gap-4 items-center justify-between text-lg font-semibold relative z-10 border-b border-gray-300 dark:border-dark-800 px-8 pb-8"
      >
        <div class="flex gap-4 items-center">
          <img
            src="https://umaestro.fr/logo.svg"
            alt="Workflow"
            class="w-auto h-8 text-black"
          />
          umaestro.fr
        </div>
        <span class="cursor-pointer" @click="setDarkMode()">
          <MoonIcon v-if="darkMode" class="h-6 w-6" />
          <SunIcon v-else class="h-6 w-6" />
        </span>
      </div>
      <div class="mt-10 relative z-10 px-8">
        <router-link
          :to="link.href"
          v-for="(link, index) in links"
          :key="index"
          class="flex gap-4 items-center mt-3 font-semibold rounded-3xl px-8 py-5 ease-in duration-200 hover:bg-gray-200 dark:hover:bg-dark-800"
        >
          <component :is="link.icon" class="w-6 h-6" />
          {{ link.name }}
        </router-link>
      </div>
    </div>
    <div
      class="flex items-center gap-4 px-8 border-t border-gray-300 dark:border-dark-800 pt-8"
    >
      <img class="w-16 h-16 rounded-full" :src="user?.avatar" alt="avatar" />
      <div>
        <h1 class="text-lg font-bold">{{ user?.username }}</h1>
        <p class="text-gray-400 mt-2">Administrateur</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {
  HomeIcon,
  UsersIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/vue/24/solid";
import { useAuthStore } from "../store/auth";

const darkMode = ref(false);
const user = ref({});
const links = [
  {
    name: "Accueil",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    name: "Utilisateurs",
    icon: UsersIcon,
    href: "/users",
  },
];

const setDarkMode = () => {
  darkMode.value = !darkMode.value;
  const html = document.getElementsByTagName("html")[0];
  html.classList.toggle("dark");
};

const store = useAuthStore();
user.value = store.user;
console.log(user);
</script>

<style scoped>
.router-link-active {
  @apply bg-primary-500 bg-opacity-10 text-primary-300;
}
</style>

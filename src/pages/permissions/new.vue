<template>
  <div>
    <form v-loading="isLoading">
      <div>
        <span class="ml-2">Nom affiché</span>
        <el-input v-model="form.permission.display_name" />
      </div>
      <div>
        <span class="ml-2">Nom</span>
        <el-input v-model="form.permission.name" />
      </div>
      <el-button type="primary" @click="store">Créer la permission</el-button>
    </form>
  </div>
</template>

<route lang="yaml">
name: "Création d'une nouvelle permission"
</route>

<script setup>
import axios from "../../composables/axios";

import { useRoute, useRouter } from "vue-router";

const form = reactive({
  permission: {
    display_name: "",
    name: "",
  },
});
const isLoading = ref(false);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  document.title = "Création d'une nouvelle permission";
});

const store = async () => {
  let id;
  try {
    isLoading.value = true;
    const { data } = await axios.post(
      "/administration/permissions/",
      form.permission
    );
    id = data.permission.id;
    ElNotification({
      title: "Succès",
      message: "La permission a bien été créée",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    ElNotification({
      title: "Erreur",
      message: "Une erreur est survenue",
      type: "error",
    });
  } finally {
    isLoading.value = false;
    router.push("/permissions/" + id);
  }
};
</script>

<template>
  <div>
    <form v-loading="isLoading">
      <div>
        <span class="ml-2">ID</span>
        <el-input v-model="form.permission.id" disabled />
      </div>
      <div>
        <span class="ml-2">Nom affiché</span>
        <el-input v-model="form.permission.display_name" />
      </div>
      <div>
        <span class="ml-2">Nom</span>
        <el-input v-model="form.permission.name" />
      </div>
      <el-popconfirm
        title="Est-tu sûr de vouloir supprimer cette permission?"
        width="220"
        confirm-button-text="Oui"
        cancel-button-text="Non"
        @confirm="destroy"
      >
        <template #reference>
          <el-button type="danger">Supprimer la permission</el-button>
        </template>
      </el-popconfirm>
      <el-button type="primary" @click="update">Enregistrer</el-button>
    </form>
  </div>
</template>

<route lang="yaml">
name: "Modification de la permission"
</route>

<script setup>
import axios from "../../composables/axios";

import { useRoute, useRouter } from "vue-router";

const form = reactive({
  permission: {
    id: "",
    display_name: "",
    name: "",
  },
});
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const { data } = await axios.get(
      "/administration/permissions/" + route?.params?.id
    );
    if (!data.permission) throw new Error("Permission not found");
    form.permission = data.permission;
    document.title = "Permission " + data.permission.display_name;
  } catch (error) {
    console.log(error);
    ElNotification({
      title: "Erreur",
      message: "Une erreur est survenue",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
});

const update = async () => {
  try {
    isLoading.value = true;
    await axios.put(
      "/administration/permissions/" + route?.params?.id,
      form.permission
    );
    ElNotification({
      title: "Succès",
      message: "La permission a bien été modifiée",
      type: "success",
    });
  } catch (error) {
    ElNotification({
      title: "Erreur",
      message: "Une erreur est survenue",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

const destroy = async () => {
  try {
    isLoading.value = true;
    await axios.delete(
      "/administration/permissions/" + route?.params?.id,
      form.permission
    );
    ElNotification({
      title: "Succès",
      message: "La permission a bien été supprimée",
      type: "success",
    });
    router.push("/permissions");
  } catch (error) {
    ElNotification({
      title: "Erreur",
      message: "Une erreur est survenue",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

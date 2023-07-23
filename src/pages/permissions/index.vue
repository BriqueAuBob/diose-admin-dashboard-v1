<template>
  <div class="relative">
    <el-row :gutter="20" align="middle" justify="end">
      <el-col :xs="24" :md="12" :lg="8" :xl="4">
        <el-input
          v-model="form.search"
          placeholder="Rechercher une permission..."
          size="large"
          prefix-icon="search"
          @change="
            () => {
              page = 1;
              getPermissions();
            }
          "
        />
      </el-col>
      <el-col :xs="24" :md="12" :lg="5" :xl="3">
        <router-link to="/permissions/new/">
          <el-button type="primary">Créer une permission</el-button>
        </router-link>
      </el-col>
    </el-row>
    <div class="pt-lg">
      <el-row :gutter="20">
        <el-col
          v-for="(permission, index) of permissions"
          :key="index"
          :xs="24"
          :md="12"
          :lg="8"
          :xl="6"
        >
          <router-link :to="{ path: '/permissions/' + permission.id }">
            <el-card>
              {{ permission.display_name }}
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<route lang="yaml">
name: "Permissions"
</route>

<script setup>
import { onMounted, watch } from "@vue/runtime-core";
import { repeat } from "lodash";
import axios from "../../composables/axios";

const permissions = ref([]);
const meta = ref({});
const form = reactive({
  search: "",
});

const getPermissions = async () => {
  const { data } = await axios.get(
    `administration/permissions?search=${form.search}`
  );
  permissions.value = data.permissions;
  meta.value = data.meta;
};

onMounted(() => {
  getPermissions();
});
</script>

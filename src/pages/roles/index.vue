<template>
    <div class="relative">
        <el-row :gutter="20" align="middle" justify="end">
            <el-col :xs="24" :md="12" :lg="8" :xl="4">
                <el-input
                    v-model="form.search"
                    placeholder="Rechercher un rôle..."
                    size="large"
                    prefix-icon="search"
                    @change="
                        () => {
                            page = 1;
                            getRoles();
                        }
                    "
                />
            </el-col>
            <el-col :xs="24" :md="12" :lg="5" :xl="3">
                <router-link to="/roles/new/">
                    <el-button type="primary">Créer un rôle</el-button>
                </router-link>
            </el-col>
        </el-row>
        <div class="pt-lg">
            <el-row :gutter="20">
                <el-col v-for="(role, index) of roles" :key="index" :xs="24" :md="12" :lg="8" :xl="6">
                    <router-link :to="{ path: '/roles/' + role.id }">
                        <el-card>
                            {{ role.display_name }}
                        </el-card>
                    </router-link>
                </el-col>
            </el-row>
            <el-pagination
                :hide-on-single-page="true"
                background
                v-model:current-page="page"
                layout="prev, pager, next"
                :page-count="meta.last_page"
            />
        </div>
    </div>
</template>

<route lang="yaml">
name: 'Roles'
</route>

<script setup>
import { onMounted, watch } from '@vue/runtime-core';
import { repeat } from 'lodash';
import axios from '../../composables/axios';

const roles = ref([]);
const meta = ref({});
const page = ref(1);
const form = reactive({
    search: '',
});

const getRoles = async () => {
    const { data } = await axios.get(`administration/roles?page=${page.value}&search=${form.search}`);
    roles.value = data.roles;
    meta.value = data.meta;
};

onMounted(() => {
    getRoles();
});

watch(page, getRoles);
</script>

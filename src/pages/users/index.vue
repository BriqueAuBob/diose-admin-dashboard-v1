<template>
    <div class="relative">
        <el-col :xs="24" :md="12" :lg="8" :xl="6">
            <el-input
                v-model="form.search"
                placeholder="Rechercher un utilisateur..."
                size="large"
                prefix-icon="search"
                @change="
                    () => {
                        page = 1;
                        getUsers();
                    }
                "
            />
        </el-col>
        <div class="pt-lg">
            <el-row :gutter="20">
                <el-col :xs="24" :md="12" :lg="8" :xl="6" v-for="(user, index) of users" :key="index">
                    <router-link :to="{ path: '/users/' + user.id }">
                        <el-card class="user_card">
                            <el-avatar size="large" :src="user.avatar" />
                            <div>
                                <span>{{ user.username }}</span>
                                <div class="roles">
                                    <span v-for="role of user?.roles" :key="role.name" class="role">
                                        {{ role.display_name }}
                                    </span>
                                </div>
                            </div>
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
name: 'Utilisateurs'
</route>

<script setup>
import { onMounted, watch } from '@vue/runtime-core';
import { repeat } from 'lodash';
import axios from '../../composables/axios';

const users = ref([]);
const meta = ref({});
const page = ref(1);
const form = reactive({
    search: '',
});

const getUsers = async () => {
    const { data } = await axios.get(`administration/users?page=${page.value}&search=${form.search}`);
    users.value = data.users;
    meta.value = data.meta;
};

onMounted(() => {
    getUsers();
});

watch(page, getUsers);
</script>

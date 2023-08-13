<template>
    <div>
        <header class="flex gap-4 items-center">
            <el-avatar size="large" :src="form.user?.avatar" @click="fetchAvatar">
                <span class="font-semibold text-2xl">{{ form.user?.username?.[0] }}</span>
            </el-avatar>
            <div>{{ form?.user?.username }}#{{ form?.user?.discriminator }}</div>
        </header>
        <el-row :gutter="20" style="margin-top: 24px">
            <el-col :sm="24" :lg="8" :xl="12">
                <span>ID</span>
                <el-input :placeholder="form.user?.id?.toString()" :disabled="true" />
            </el-col>
            <el-col :sm="24" :lg="8" :xl="12">
                <span>ID Discord</span>
                <el-input :placeholder="form.user?.discord_id?.toString()" :disabled="true" />
            </el-col>
            <el-col :sm="24" :lg="8" :xl="12">
                <span>Email</span>
                <el-input :placeholder="form.user?.email" :disabled="true" />
            </el-col>
            <el-col :sm="24" :lg="8" :xl="12">
                <span>Nom d'utilisateur</span>
                <el-input :placeholder="form.user?.username" :disabled="true" />
            </el-col>
            <el-col :sm="24" :lg="8" :xl="12">
                <span>Tag Discord</span>
                <el-input :placeholder="'#' + form.user?.discriminator" :disabled="true" />
            </el-col>
            <el-col :sm="24">
                <span>Rôles</span>
                <el-select v-model="form.user.rolesId" multiple remote>
                    <el-option v-for="role in rolesRef" :key="role.id" :label="role.display_name" :value="role.id" />
                </el-select>
            </el-col>
        </el-row>
        <el-button type="primary" @click="update">Enregistrer</el-button>
    </div>
</template>

<route lang="yaml">
name: "Profil de l'utilisateur"
</route>

<script setup>
import { ElNotification } from 'element-plus';
import axios from '../../composables/axios';

import { useRoute } from 'vue-router';

const form = reactive({
    user: {
        id: '',
        discord_id: '',
        email: '',
        username: '',
        discriminator: '',
        avatar: '',
        roles: [],
        rolesId: [],
    },
});
const rolesRef = ref([]);
const route = useRoute();
onMounted(async () => {
    const { data } = await axios.get('/administration/users/' + route.params.id);
    form.user = { ...data.user, rolesId: data.user.roles.map((role) => role.id) };
    document.title = 'Profil de ' + form.user.username;

    const { data: roles } = await axios.get('/administration/roles/?page=1&per_page=100&search=');
    rolesRef.value = roles.roles;
});

const fetchAvatar = async () => {
    const { data } = await axios.put('/administration/users/' + route.params.id + '/fetch-avatar');
    form.user = data.user;
};

const update = () => {
    axios
        .put('/administration/users/' + route.params.id + '/roles', {
            roles: form.user.rolesId,
        })
        .then(() => {
            ElNotification({
                title: 'Succès',
                message: 'Les rôles ont été mis à jour',
                type: 'success',
            });
        })
        .catch(() => {
            ElNotification({
                title: 'Erreur',
                message: 'Un problème est survenu lors de la mise à jour des rôles',
                type: 'error',
            });
        });
};
</script>

<style scoped>
.el-avatar {
    cursor: pointer;
}
</style>

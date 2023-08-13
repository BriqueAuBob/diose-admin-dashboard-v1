<template>
    <div>
        <form v-loading="isLoading">
            <div>
                <span class="ml-2">Nom affiché</span>
                <el-input v-model="form.role.display_name" />
            </div>
            <div>
                <span class="ml-2">Nom</span>
                <el-input v-model="form.role.name" />
            </div>
            <div>
                <div class="ml-2">Permissions</div>
                <el-select v-model="form.role.permissions" multiple remote :loading="isLoading">
                    <el-option
                        v-for="permission in permissionsRef"
                        :key="permission.id"
                        :label="permission.display_name"
                        :value="permission.id"
                    />
                </el-select>
            </div>
            <el-button type="primary" @click="store">Créer le rôle</el-button>
        </form>
    </div>
</template>

<route lang="yaml">
name: "Création d'un nouveau rôle"
</route>

<script setup>
import axios from '../../composables/axios';

import { useRoute, useRouter } from 'vue-router';

const form = reactive({
    role: {
        id: '',
        display_name: '',
        name: '',
        permissions: [],
    },
});
const permissionsRef = ref([]);
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    try {
        document.title = "Création d'un nouveau rôle";

        const { data: dataP } = await axios.get('/administration/permissions?search=');
        permissionsRef.value = dataP.permissions;
    } catch (error) {
        console.log(error);
        ElNotification({
            title: 'Erreur',
            message: 'Une erreur est survenue',
            type: 'error',
        });
    } finally {
        isLoading.value = false;
    }
});

const store = async () => {
    let id;
    try {
        isLoading.value = true;
        const { data } = await axios.post('/administration/roles/', form.role);
        id = data.role.id;
        ElNotification({
            title: 'Succès',
            message: 'Le rôle a bien été créé',
            type: 'success',
        });
    } catch (error) {
        console.log(error);
        ElNotification({
            title: 'Erreur',
            message: 'Une erreur est survenue',
            type: 'error',
        });
    } finally {
        isLoading.value = false;
        router.push('/roles/' + id);
    }
};
</script>

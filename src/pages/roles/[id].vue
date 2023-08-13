<template>
    <div>
        <form v-loading="isLoading">
            <div>
                <span class="ml-2">ID</span>
                <el-input v-model="form.role.id" disabled />
            </div>
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
            <el-popconfirm
                title="Est-tu sûr de vouloir supprimer ce rôle?"
                width="220"
                confirm-button-text="Oui"
                cancel-button-text="Non"
                @confirm="destroy"
            >
                <template #reference>
                    <el-button type="danger">Supprimer le rôle</el-button>
                </template>
            </el-popconfirm>
            <el-button type="primary" @click="update">Enregistrer</el-button>
        </form>
    </div>
</template>

<route lang="yaml">
name: 'Modification du rôle'
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
        const { data } = await axios.get('/administration/roles/' + route?.params?.id);
        if (!data.role) throw new Error('Role not found');
        form.role = data.role;
        form.role.permissions = data.role?.permissions?.map((p) => p.id);
        document.title = 'Role ' + data.role.display_name;

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

const update = async () => {
    try {
        isLoading.value = true;
        await axios.put('/administration/roles/' + route?.params?.id, form.role);
        ElNotification({
            title: 'Succès',
            message: 'Le rôle a bien été modifié',
            type: 'success',
        });
    } catch (error) {
        ElNotification({
            title: 'Erreur',
            message: 'Une erreur est survenue',
            type: 'error',
        });
    } finally {
        isLoading.value = false;
    }
};

const destroy = async () => {
    try {
        isLoading.value = true;
        await axios.delete('/administration/roles/' + route?.params?.id, form.role);
        ElNotification({
            title: 'Succès',
            message: 'Le rôle a bien été supprimé',
            type: 'success',
        });
        router.push('/roles');
    } catch (error) {
        ElNotification({
            title: 'Erreur',
            message: 'Une erreur est survenue',
            type: 'error',
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

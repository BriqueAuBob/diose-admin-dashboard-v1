<template>
    <div>
        <form v-loading="isLoading">
            <div>
                <span class="ml-2">Nom (FR)</span>
                <el-input v-model="form.article.title_fr" />
            </div>
            <div>
                <span class="ml-2">Nom (EN)</span>
                <el-input v-model="form.article.title_en" />
            </div>
            <div>
                <span class="ml-2">Description (FR)</span>
                <el-input v-model="form.article.description_fr" />
            </div>
            <div>
                <span class="ml-2">Description (EN)</span>
                <el-input v-model="form.article.description_en" />
            </div>
            <div>
                <span class="ml-2">Contenu en français</span>
                <v-md-editor v-model="form.article.content_fr" height="400px"></v-md-editor>
            </div>
            <div>
                <span class="ml-2">Contenu en anglais</span>
                <v-md-editor v-model="form.article.content_en" height="400px"></v-md-editor>
            </div>
            <el-row :gutter="20">
                <el-col :xs="24" :lg="12">
                    <span class="ml-2">Image en français</span>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://api.umaestro.fr/uploads"
                        :before-upload="beforeUpload"
                        :on-success="(data) => onSuccess(data, 'fr')"
                    >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                        <template #tip>
                            <div class="el-upload__tip">jpg/png/gif/svg/webp files with a size less than 2MB</div>
                        </template>
                    </el-upload>
                </el-col>
                <el-col :xs="24" :lg="12">
                    <span class="ml-2">Image en anglais</span>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://api.umaestro.fr/uploads"
                        :before-upload="beforeUpload"
                        :on-success="(data) => onSuccess(data, 'en')"
                    >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                        <template #tip>
                            <div class="el-upload__tip">jpg/png/gif/svg/webp files with a size less than 2MB</div>
                        </template>
                    </el-upload>
                </el-col>
            </el-row>
            <div>
                <span class="ml-2">Publié</span>
                <el-switch v-model="form.article.is_published" />
            </div>
            <div>
                <el-select v-model="form.article.type" placeholder="Choisissez un type">
                    <el-option label="MakeBetter" :value="1" />
                </el-select>
            </div>
            <div>
                <el-select v-model="form.article.tags" multiple placeholder="Choisissez des tags">
                    <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
                </el-select>
            </div>
            <el-button type="primary" @click="store">Créer l'article</el-button>
        </form>
    </div>
</template>

<route lang="yaml">
name: "Création d'une nouvelle article"
</route>

<script setup>
import axios from '../../composables/axios';

import { useRoute, useRouter } from 'vue-router';

const form = reactive({
    article: {
        title: '',
        description: '',
        content_fr: '',
        content_en: '',
        image_fr: '',
        image_en: '',
        is_published: false,
        type: '',
        tags: [],
    },
});
const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const tags = ref([]);

onMounted(async () => {
    document.title = "Création d'un nouvel article";

    try {
        isLoading.value = true;
        const { data } = await axios.get('/administration/tags');
        tags.value = data.tags;
    } catch (error) {
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
        const { data } = await axios.post('/administration/articles/', form.article);
        id = data.article.id;
        ElNotification({
            title: 'Succès',
            message: "L'article a bien été créée",
            type: 'success',
        });
        router.push('/articles/' + id);
    } catch (error) {
        if (error?.response?.data?.errors) {
            for (const err of error?.response?.data?.errors) {
                setTimeout(() => {
                    ElNotification({
                        title: 'Erreur',
                        message: err.field + ' ' + err.message,
                        type: 'error',
                    });
                }, 5);
            }
        } else {
            ElNotification({
                title: 'Erreur',
                message: 'Une erreur est survenue',
                type: 'error',
            });
        }
    } finally {
        isLoading.value = false;
    }
};

const onSuccess = (data, lang) => {
    form.article['image_' + lang] = data.urlWithoutPrefix;
};
</script>

<style>
.v-md-textarea-editor textarea {
    background: white !important;
}
</style>

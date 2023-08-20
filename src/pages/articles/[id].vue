<template>
    <div>
        <form v-loading="isLoading">
            <div>
                <span class="ml-2">ID</span>
                <el-input v-model="form.article.id" disabled />
            </div>
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
                    <img :src="form.article.image_fr" />
                    <div class="ml-2">Image en français</div>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="http://localhost:3000/uploads"
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
                    <img :src="form.article.image_en" />
                    <div class="ml-2">Image en anglais</div>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="http://localhost:3000/uploads"
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
            <!-- <el-popconfirm
                title="Est-tu sûr de vouloir supprimer cet article?"
                width="220"
                confirm-button-text="Oui"
                cancel-button-text="Non"
                @confirm="destroy"
            >
                <template #reference>
                    <el-button type="danger">Supprimer l'article</el-button>
                </template>
            </el-popconfirm> -->
            <el-button type="primary" @click="update">Enregistrer</el-button>
        </form>
    </div>
</template>

<route lang="yaml">
name: 'Modification de la article'
</route>

<script setup>
import axios from '../../composables/axios';

import { useRoute, useRouter } from 'vue-router';

const form = reactive({
    article: {
        id: '',
        title_fr: '',
        title_en: '',
        description_fr: '',
        description_en: '',
        content_fr: '',
        content_en: '',
        image_fr: '',
        image_en: '',
        is_published: false,
        type: '',
        tags: [],
    },
});
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const tags = ref([]);

onMounted(async () => {
    try {
        const { data } = await axios.get('/administration/articles/' + route?.params?.id);
        if (!data.article) throw new Error('article not found');
        form.article = data.article;
        document.title = 'Article ' + data.article.title_fr;

        const { data: tagsData } = await axios.get('/administration/tags');
        tags.value = tagsData.tags;
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
        const { data } = await axios.put('/administration/articles/' + route?.params?.id, form.article);
        // form.article = data.article;
        // console.log(article);
        ElNotification({
            title: 'Succès',
            message: "L'article a bien été modifiée",
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
        await axios.delete('/administration/articles/' + route?.params?.id, form.article);
        ElNotification({
            title: 'Succès',
            message: "L'article a bien été supprimée",
            type: 'success',
        });
        router.push('/articles');
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

const beforeUpload = (rawFile) => {
    if (
        rawFile.type !== 'image/jpeg' &&
        rawFile.type !== 'image/png' &&
        rawFile.type !== 'image/jpg' &&
        rawFile.type !== 'image/gif' &&
        rawFile.type !== 'image/svg+xml' &&
        rawFile.type !== 'image/webp'
    ) {
        ElMessage.error('Avatar picture must be JPG, PNG, gif, svg or webp format!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
    }
    return true;
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

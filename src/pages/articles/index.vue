<template>
    <div class="relative">
        <el-row :gutter="20" align="middle" justify="end">
            <el-col :xs="24" :md="12" :lg="8" :xl="4">
                <el-input
                    v-model="form.search"
                    placeholder="Rechercher un article..."
                    size="large"
                    prefix-icon="search"
                    @change="
                        () => {
                            page = 1;
                            getArticles();
                        }
                    "
                />
            </el-col>
            <el-col :xs="24" :md="12" :lg="5" :xl="3">
                <router-link to="/articles/new/">
                    <el-button type="primary">Créer un article</el-button>
                </router-link>
            </el-col>
        </el-row>
        <div class="pt-lg">
            <el-row :gutter="20">
                <el-col v-for="article of articles" :key="article.id" :xs="24" :md="12" :lg="8" :xl="6">
                    <router-link :to="{ path: '/articles/' + article.id }">
                        <el-card>
                            {{ article.title_fr }}
                        </el-card>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<route lang="yaml">
name: 'Articles'
</route>

<script setup>
import { onMounted, watch } from '@vue/runtime-core';
import { repeat } from 'lodash';
import axios from '../../composables/axios';

const articles = ref([]);
const meta = ref({});
const form = reactive({
    search: '',
});

const getArticles = async () => {
    const { data } = await axios.get(`administration/articles?search=${form.search}`);
    articles.value = data.articles;
    meta.value = data.meta;
};

onMounted(() => {
    getArticles();
});
</script>

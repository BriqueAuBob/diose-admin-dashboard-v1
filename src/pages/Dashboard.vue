<template>
    <h1>Bienvenue {{ user.username }} ! 👋🏼</h1>

    <h2>Statistiques de cette semaine</h2>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard
                title="Utilisateurs inscrits cette semaine"
                :value="stats.weekStatsUsers"
                :before="stats.lastWeekStatsUsers"
            />
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard
                title="Utilisation d'outils cette semaine"
                :value="stats.weekStats"
                :before="stats.lastWeekStats"
            />
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard title="Connexions cette semaine" :value="stats.weekLoginStat" :before="stats.lastWeekLoginStat" />
        </el-col>
    </el-row>

    <h2>Statistiques globales</h2>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard title="Utilisateurs inscrits" :value="stats.members" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard title="Utilisation d'outils" :value="stats.tools" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard title="Avis publiés" :value="stats.testimonials" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <StatCard title="Moyenne des avis" :value="stats.testimonialsAvg" />
        </el-col>
    </el-row>
</template>

<script setup>
import { UsersIcon, CubeIcon, LinkIcon } from '@heroicons/vue/24/solid';
import { onMounted } from '@vue/runtime-core';
import axios from '../composables/axios';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { user } = storeToRefs(store);

const stats = ref({});
onMounted(async () => {
    const { data } = await axios.get('statistics');
    stats.value = data;
    for (const key in stats.value) {
        console.log(key);
        stats.value[key] = key === 'testimonialsAvg' ? parseFloat(stats.value[key]) : parseInt(stats.value[key]);
    }
});
</script>

<route lang="yaml">
name: 'Accueil'
</route>

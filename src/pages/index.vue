<template>
    <div>
        <el-button size="large" @click="auth"> Se connecter </el-button>
    </div>
</template>

<route lang="yaml">
name: 'Authentification'
</route>

<script setup>
import axios from '../composables/axios';

const auth = async () => {
    window.location.href = 'https://auth.umaestro.fr/?redirect_uri=' + encodeURIComponent(window.location.href);
    // window.location.href = 'http://localhost:5174/?redirect_uri=' + encodeURIComponent(window.location.href);
};
</script>

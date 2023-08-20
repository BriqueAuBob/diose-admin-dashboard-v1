<template>
    <div class="sidebar">
        <header>
            <h1>Diose</h1>
        </header>
        <main>
            <ul>
                <li v-for="link in links" :key="link.name">
                    <router-link
                        v-if="link.href && (!child?.permission || useCheckPermission(child?.permission))"
                        :to="link.href"
                        class="link"
                    >
                        <component :is="link.icon" class="w-6 h-6" />
                        <span class="link_name">{{ link.name }}</span>
                    </router-link>
                    <div v-else-if="!link.href" class="group">
                        <span class="group_name">{{ link.name }}</span>
                        <ul>
                            <li v-for="child in link.childrens" :key="child.name">
                                <router-link
                                    :to="child.href"
                                    class="link"
                                    v-if="!child?.permission || useCheckPermission(child?.permission)"
                                >
                                    <component v-if="child.icon" :is="child.icon" class="w-6 h-6" />
                                    <span class="link_name">{{ child.name }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </main>
        <footer>
            <img :src="user?.avatar" alt="avatar" />
            <div>
                <span class="username">{{ user?.username }}</span>
                <span class="role">{{ user?.roles[0]?.display_name }}</span>
            </div>
        </footer>
    </div>
</template>

<script setup>
import {
    HomeIcon,
    UsersIcon,
    SunIcon,
    MoonIcon,
    CubeIcon,
    ShieldCheckIcon,
    NoSymbolIcon,
    NewspaperIcon,
} from '@heroicons/vue/24/solid';
import { useAuthStore } from '../store/auth';
import useCheckPermission from '../composables/useCheckPermission';

const user = ref({});
const links = [
    {
        name: 'Tableau de bord',
        icon: HomeIcon,
        href: '/dashboard',
    },
    {
        name: 'Utilisateurs',
        childrens: [
            {
                name: 'Liste des utilisateurs',
                href: '/users',
                icon: UsersIcon,
                permission: 'read_user',
            },
            {
                name: 'Roles',
                href: '/roles',
                icon: ShieldCheckIcon,
                permission: 'read_roles',
            },
            {
                name: 'Permissions',
                href: '/permissions',
                icon: NoSymbolIcon,
                permission: 'read_permissions',
            },
        ],
    },
    {
        name: 'Statistiques',
        childrens: [
            {
                name: 'Utilisations',
                href: '/stats/usages',
                icon: CubeIcon,
                permission: 'read_user',
            },
        ],
    },
    {
        name: 'Articles',
        href: '/articles',
        icon: NewspaperIcon,
        permission: 'view_articles',
    },
];

const store = useAuthStore();
user.value = store.user;
</script>

<style scoped>
.router-link-active.link {
    background-color: rgba(255, 188, 0, 0.1);
    color: var(--primary-color);
}
</style>

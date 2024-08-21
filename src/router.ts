import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {path: '/', component: () => import('./pages/BrühPage.vue')},
    {path: '/beans', component: () => import('./pages/BohnenPage.vue')},
    {path: '/brews', component: () => import('./pages/BrühungenListPage.vue')},
]



export const router = createRouter({
    history: createWebHistory(),
    routes
})
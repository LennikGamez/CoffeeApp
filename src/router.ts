import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {path: '/', component: () => import('./App.vue')},
    {path: '/add', component: () => import('./pages/BohnenPage.vue')},
]



export const router = createRouter({
    history: createWebHistory(),
    routes
})
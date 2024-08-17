import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';


const routes = [
    {path: '/', component: () => import('./App.vue')},
    {path: '/add', component: () => import('./pages/AddPage.vue')},
]



export const router = createRouter({
    history: createWebHistory(),
    routes
})
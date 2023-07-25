import {createRouter, createWebHashHistory} from 'vue-router';
import IndexPage from '@/views/index-page/index.vue'

const routes = [
    { path: '/', component: IndexPage }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

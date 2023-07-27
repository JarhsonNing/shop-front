import {createRouter, createWebHashHistory} from 'vue-router';
import IndexPage from '@/views/index-page/index.vue'
import OrderPage from '@/views/order/index.vue'

const routes = [
    { path: '/order-page', component: OrderPage },
    { path: '/', component: IndexPage },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

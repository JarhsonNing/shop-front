<template>
    <div class="item-list">
        <div class="item-list__content">
            <div class="item-list__side-bar">
                <van-sidebar v-model="activeMenu">
                    <template v-for="menu in menuList">
                        <van-sidebar-item v-bind="menu"/>
                    </template>
                </van-sidebar>
            </div>
            <div class="item-list__item">
                <template v-for="item in itemList">
                    <Item v-bind="item"></Item>
                </template>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-if="showCart" class="item-list-cart">
            </div>
        </transition>
    </div>
</template>

<script setup>

import {reactive, ref, computed} from 'vue'
import Item from './Item.vue'
import {fetchMenuList} from "@/api/item-list";
import {useCart} from "@/stores";

const activeMenu = ref(0);
const menuList = ref([])

fetchMenuList(1).then(resp => {
    menuList.value = resp.map(menu => {
        return {
            ...menu,
            title: menu.name
        }
    })
})

const itemList = computed(() => {
    const menu = menuList.value[activeMenu.value];
    if (menu) {
        const list = menuList.value[activeMenu.value].items || [];
        return list.map(item => {
            return {
                ...item,
                image: '/api/file/' + item.image
            }
        })
    }
    return []
})


const { cartItems } = useCart();
const showCart = computed(() => {
    console.log('showCart', cartItems.length > 0)
    return cartItems.length > 0
})
</script>

<style lang="scss" scoped>
.item-list {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .item-list__content {
        flex: 1;
        overflow: hidden;
        display: flex;
    }

    .item-list__side-bar {
        height: 100%;
        background-color: var(--van-sidebar-background);
    }

    .item-list__item {
        flex: 1;
        height: 100%;
    }

    .item-list-cart {
        position: fixed;
        left: 20px;
        right: 20px;
        bottom: 20px;
        height: 20px;
        background-color: red;
    }

}
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(40px);
    opacity: 0;
}
</style>

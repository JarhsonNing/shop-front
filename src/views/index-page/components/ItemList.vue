<template>
    <div class="item-list">
        <van-dropdown-menu>
            <van-dropdown-item v-model="filter1" :options="option1" />
            <van-dropdown-item v-model="filter2" :options="option2" />
        </van-dropdown-menu>
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
    </div>
</template>

<script setup>

import {reactive, ref, computed} from 'vue'
import Item from './Item.vue'
import {fetchMenuList} from "@/api/item-list";

const filter1 = ref(0);
const option1 = reactive([
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 }
])

const filter2 = ref(0);
const option2 = reactive([
    { text: '默认排序', value: 0 },
    { text: '好评排序', value: 1 },
    { text: '销量排序', value: 2 }
])

const activeMenu = ref(0);
const menuList = ref([
    {title: "寿司卷", items: []},
    {title: "手握", items: []},
    {title: "稻荷", items: []},
    {title: "军舰", items: []},
])

fetchMenuList(1).then(resp => {
    console.log(resp)
    menuList.value = resp.map(menu => {
        return {
            ...menu,
            title: menu.name
        }
    })
})

const itemList = computed(() => {
    const list = menuList.value[activeMenu.value].items || [];
    return list.map(item => {
        return {
            ...item,
            image: '/api/file/' + item.image
        }
    })
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

}
</style>

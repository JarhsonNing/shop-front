<template>
    <div class="item-info">
        <div class="item-info__image">
            <van-image
                height="100%"
                width="100%"
                fit="cover"
                :src="props.image"
            />
        </div>
        <div class="item-info__detail">
            <div class="item-info-name">{{ props.name }}</div>
            <div class="item-info-tags" v-if="props.tags.length > 0">
                <template v-for="tag in props.tags">
                    <van-tag plain color="#aaa">{{tag}}</van-tag>
                    <span>&nbsp;</span>
                </template>
            </div>
            <div class="item-info-sales">月售：{{ props.sales }}</div>
            <div class="item-info-bottom">
                <div class="item-info-price">¥{{ props.price }}</div>
                <div class="item-info-operation">
                    <template v-if="showNumber">
                        <van-button @click="handleRemove" size="mini" icon="minus"></van-button>
                        <span class="item-info-operation__number">{{number}}</span>
                    </template>
                    <van-button @click="handleAddToCart" size="mini" icon="plus"></van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useCart} from "@/stores";
import {computed} from "vue";

const props = defineProps({
    id: {
        type: [String, Number],
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    tags: {
        type: Array,
        default: []
    },
    sales: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
})

const cartStore = useCart()

const showNumber = computed(() => {
    const item = cartStore.cartItemsMap[props.id];
    return !!item
})
const number = computed(() => {
    const item = cartStore.cartItemsMap[props.id];
    if (item) {
        return item.number
    }
})

function handleAddToCart() {
    console.log(props.id)
    cartStore.addItem({
        id: props.id,
        image: props.image,
        name: props.name,
        tags: props.tags,
        sales: props.sales,
        price: props.price,
    })
}

function handleRemove() {
    cartStore.removeItem({
        id: props.id,
        image: props.image,
        name: props.name,
        tags: props.tags,
        sales: props.sales,
        price: props.price,
    })
}
</script>

<style lang="scss" scoped>
.item-info {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    display: flex;
}

.item-info__image {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
}

.item-info__detail {
    box-sizing: border-box;
    padding: 0 12px;
    flex: 1;
    overflow: hidden;
    position: relative;
}

.item-info-name {
    font-size: 16px;
    font-weight: bolder;
}
.item-info-tags {
    margin: 8px 0;
}
.item-info-sales {
    margin: 8px 0;
}

.item-info-bottom {
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item-info-price {
    color: var(--van-red);
}
.item-info-operation {
    display: flex;
    align-items: center;
}
.item-info-operation__number {
    margin: 0 8px;
}
</style>

<template>
    <div class="list-cart">
        <div class="list-cart-cat"></div>
        <div class="list-cart-price">
            总价：¥{{cart.totalPrice}}
        </div>
        <div @click="handleSaveOrder" class="list-cart-btn">生成订单</div>
    </div>
</template>

<script setup>
import {useCart} from '@/stores'
import {saveOrder} from '@/api/order'
import {router} from '@/router'

const cart = useCart();

function handleSaveOrder() {
    saveOrder({
        price: cart.totalPrice,
        items: cart.cartItems
    }).then(res => {
        console.log(res)
        router.push({
            path: '/order-page',
            query: {
                order: res.id
            }
        })
    })
}
</script>

<style lang="scss" scoped>
.list-cart {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    overflow: visible;
    position: relative;

    .list-cart-cat {
        position: absolute;
        width: 88px;
        left: 0px;
        top: -41px;
        bottom: -14px;
        background: {
            image: url("@/assets/img/cat.png");
            repeat: no-repeat;
            position: center center;
            size: auto 100%;
        };
    }

    .list-cart-price {
        padding-left: 100px;
        color: #fff;
    }

    .list-cart-btn {
        height: 100%;
        padding: 0 24px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
        display: flex;
        align-items: center;
    }
}
</style>

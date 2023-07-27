<template>
    <div ref="pageRef" class="order">
        <div class="order-header">
            <van-nav-bar
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                title="订单详情">
            </van-nav-bar>
        </div>
        <div class="order-no">
            <div>您的订单号</div>
            <div class="order-no__text">{{orderInfo.no}}</div>
        </div>
        <div class="order-item-list">
            <div class="order-item-list__title">
                订单详情
            </div>
            <template v-for="item in orderInfo.items">
                <div class="order-item">
                    <div class="order-item-name">{{item.name}}</div>
                    <div class="order-item-price">¥{{item.price}} X {{item.number}}</div>
                </div>
            </template>

            <div class="order-item-list__total">
                <div class="order-item-list__total-name">总计</div>
                <div class="order-item-list__total-price">¥{{orderInfo.price}}</div>
            </div>
        </div>
        <div class="order-item-list__btn">
            <van-button @click="handleSaveImage" type="primary" block>保存截图</van-button>
        </div>

    </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {fetchOrderDetail} from '@/api/order'
import {ref} from 'vue'
import html2canvas from 'html2canvas'
import {showDialog} from 'vant'
import 'vant/es/dialog/style';

const pageRef = ref(null)
const route = useRoute();
const router = useRouter();

showDialog({
    title: '提示',
    message: '请添加老板微信进行付款!!!请注意保存截图或订单号!!',
}).then(() => {

})
function onClickLeft() {
    router.back()
}

const orderInfo = ref({
    items: [],
    price: 0
})

fetchOrderDetail(route.query.order).then(res => {
    orderInfo.value = res;
})

async function handleSaveImage() {
    const canvas = await html2canvas(pageRef.value);
    let imgUrl = canvas.toDataURL( "image/png" );
    const tempLink = document.createElement('a');// 创建一个a标签
    tempLink.style.display = 'none';
    tempLink.href = imgUrl;
    tempLink.setAttribute('download', '胖崽寿司店' + orderInfo.value.no);// 给a标签添加下载属性
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);// 将a标签添加到body当中
    tempLink.click();// 启动下载
    document.body.removeChild(tempLink);// 下载完毕删除a标签
    window.URL.revokeObjectURL(imgUrl);
}
</script>

<style lang="scss" scoped>
.order {
    height: 100vh;
    width: 100vw;
    background-color: #eee;
}
.order-no {
    box-sizing: border-box;
    padding: 12px;
    margin: 4px;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.order-no__text {
    font-size: 32px;
    font-weight: bold;
}

.order-item-list {
    box-sizing: border-box;
    padding: 12px;
    margin: 4px;
    border-radius: 8px;
    background-color: #fff;
}

.order-item-list__title {
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 12px;
}
.order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-item-list__total {
    border-top: 1px solid #aaa;
    margin-top: 8px;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-item-list__btn {
    margin: 8px;
}
</style>

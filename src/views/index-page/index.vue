<template>
    <div class="index-page">
        <div class="index-page-header">
            <van-nav-bar title="胖崽寿司店">
                <template #right>
                    <van-icon color="black" size="24" name="share-o" />
                </template>
            </van-nav-bar>
        </div>
        <van-swipe v-if="imageList.length" class="index-page-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="image in imageList">
                <div :style="SwiperStyle" class="index-page-swipe__img">
                    <van-image
                        height="100%"
                        width="100%"
                        fit="contain"
                        :src="image.src"
                    />
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="index-page-content">
            <ItemList />
        </div>
    </div>
</template>

<script setup>
import {onUnmounted, reactive, ref} from 'vue'
import ItemList from '@/views/index-page/components/ItemList.vue'
import {fetchBannerList} from "@/api/banner";
const imageList = ref([])
fetchBannerList().then(res => {
    imageList.value = (res || []).map(item => {
        return {
            ...item,
            src: '/api/file/' + item.code
        }
    })
})
const SwiperStyle = reactive({
    height: (383 / 900 * document.body.clientWidth) + 'px'
})

console.log(SwiperStyle)

function handleResize() {
    SwiperStyle.height = 383 / 900 * document.body.clientWidth + 'px'
}

window.addEventListener('resize', handleResize)
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})



</script>

<style lang="scss" scoped>
.index-page {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    display: flex;
    flex-direction: column;


    .index-page-swipe .index-page-swipe__img {
        height: 150px;
        text-align: center;
    }

    .index-page-content {
        flex: 1;
        overflow: auto;
        display: flex;
        height: 100%;
    }

}
</style>

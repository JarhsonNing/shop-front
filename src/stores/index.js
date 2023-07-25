import {createPinia, defineStore} from 'pinia'
import {reactive} from 'vue'

const useCart = defineStore('cart', () => {
    const items = reactive([]);
    const addItem = function (item) {
        items.push(item)
    }
    return {
        items,
        addItem
    }
})

export const store = createPinia()

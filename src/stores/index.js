import {createPinia, defineStore} from 'pinia'
import {computed, reactive, ref, watch} from 'vue'

export const useCart = defineStore('cart', () => {
    const cartItems = reactive([]);
    const cartItemsMap = reactive({})
    watch(cartItems, () => {
        console.log('cartItemsMap')
        const map = {};
        cartItems.forEach(item => {
            map[item.id] = item
        });
        Object.assign(cartItemsMap, map);
    })
    const addItem = function (item) {
        if (cartItemsMap[item.id]) {
            cartItemsMap[item.id].number += 1
        } else {
            cartItems.push({
                ...item,
                number: 1
            })
        }
    }

    const removeItem = function (item) {
        if (cartItemsMap[item.id]) {
            cartItemsMap[item.id].number -= 1
            if (cartItemsMap[item.id].number <= 0) {
                const oldItem = cartItems.find(a => a.id == item.id);
                const index = cartItems.indexOf(oldItem)
                cartItems.splice(index, 1)
                cartItemsMap[item.id] = null
            }
        }
    }

    return {
        cartItems,
        cartItemsMap,
        addItem,
        removeItem
    }
})

export const store = createPinia()

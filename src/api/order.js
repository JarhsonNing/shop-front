import service from '@/utils/request'

export function saveOrder(data) {
    return service.post('/order', data)
}

export function fetchOrderDetail(id) {
    return service.get('/order/' + id)
}

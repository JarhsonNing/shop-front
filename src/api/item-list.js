import service from '@/utils/request'

export function fetchItemList() {
    return service.get('/')
}

export function fetchMenuList(needItem) {
    return service.get('/menu', {
        params: {
            needItem: needItem ? 1 : 0
        }
    })
}
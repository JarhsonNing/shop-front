import service from '@/utils/request'

export function fetchItemList() {
    return service.get('/')
}

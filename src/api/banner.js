import service from "@/utils/request";

export function fetchBannerList() {
    return service.get('/banner')
}
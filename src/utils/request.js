import axios from 'axios';
import errorCode from '@/utils/errorCode'
import {saveAs} from 'file-saver'
import {showLoadingToast, showToast} from 'vant';
function blobValidate(data) {
    return data.type !== 'application/json'
}
function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

let downloadLoadingInstance;

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        // // 未设置状态码则默认成功状态
        // const code = res.data.code || 200;
        // // 获取错误信息
        // const msg = errorCode[code] || res.data.msg || errorCode['default']
        // // 二进制数据则直接返回
        // if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        //     return res.data
        // }
        // if (code !== 200) {
        //     return Promise.reject(new Error(msg))
        // } else {
        // }
    return res.data
    },
    error => {
        // console.log('err' + error)
        // let {message} = error;
        // if (message === "Network Error") {
        //     message = "后端接口连接异常";
        // } else if (message.includes("timeout")) {
        //     message = "系统接口请求超时";
        // } else if (message.includes("Request failed with status code")) {
        //     message = "系统接口" + message.slice(message.length - 3) + "异常";
        // }
        // showToast(message)
        return Promise.reject(error)
    }
)

// 通用下载方法
export function download(url, params, filename, config) {
    downloadLoadingInstance = showLoadingToast({
        message: "正在下载数据，请稍候",
        forbidClick: true,
        background: "rgba(0, 0, 0, 0.7)"
    })
    return service.post(url, params, {
        transformRequest: [(params) => {
            return tansParams(params)
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: 'blob',
        ...config
    }).then(async (data) => {
        const isBlob = blobValidate(data);
        if (isBlob) {
            const blob = new Blob([data])
            saveAs(blob, filename)
        } else {
            const resText = await data.text();
            const rspObj = JSON.parse(resText);
            const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
            showToast(errMsg);
        }
        downloadLoadingInstance.close();
    }).catch((r) => {
        console.error(r)
        showToast('下载文件出现错误，请联系管理员！')
        downloadLoadingInstance.close();
    })
}

export default service

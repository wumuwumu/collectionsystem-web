import axios from 'axios'
import store from '../store'
import vue from 'vue'
import Cookies from 'js-cookie'


let baseUrl = "http://127.0.0.1:9791";


// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 5000            // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    var tokenValue = Cookies.get("token");
    console.log("操作前的token" + tokenValue);
    if (tokenValue) {
        config.headers['jwtauthorization'] = tokenValue // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    console.log("添加token");
    return config
}, error => {
    // Do something with request error
    console.log('请求拦截出现问题');
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    (response) => {
        //     vue.$Message.error({
        //         message: "获取资源后",
        //         duration: 5 * 1000,
        //         closable: true
        //     })
        //     console.log("获取资源后");
        // const res = response.data
        // if (res.code !== 1) {
        //   Message({
        //     message: "错误1",
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   if (res.code === 401) {
        //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //       confirmButtonText: '重新登录',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       store.dispatch('FedLogOut').then(() => {
        //         location.reload()// 为了重新实例化vue-router对象 避免bug
        //       })
        //     })
        //   }
        //   return Promise.reject(error)
        // } else {
        console.log("每次请求返回码：" + response.data.code);
        return response.data;
        // }
    },
    error => {
        console.log('请求错误：' + error.message)// for debug
        // return Promise.reject(error)
    }
)

export {baseUrl}
export default service

import axios from 'axios'
import store from '../store'
import vue from 'vue'
import Cookies from 'js-cookie'

const baseUrl = 'http://sciento.top:9791'
// const baseUrl = 'http://127.0.0.1:9791'

// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 20000            // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    var tokenValue = Cookies.get("token");
    // console.log("操作前的token" + tokenValue);
    if (tokenValue) {
        config.headers['jwtauthorization'] = tokenValue // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    // console.log('请求拦截出现问题');
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    (response) => {
        if (response.data.code != undefined && response.data.code !== 1) {
            // this.$Message.error('失败')
            // if (res.code === 401) {
            //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //     confirmButtonText: '重新登录',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            //   }).then(() => {
            //     store.dispatch('FedLogOut').then(() => {
            //       location.reload()// 为了重新实例化vue-router对象 避免bug
            //     })
            //   })
            // }
            if (response.data.code == 403) {
                console.log('已经进入了这里')
                store.dispatch('FedLogOut').then(() => {
                    // this.$router.push({path:'/login'});
                    // location.reload()// 为了重新实例化vue-router对象 避免bug
                })
            }
            if (response.data.code == 401) {
                this.$Message.error('没有权限访问')
            }
        } else {
            return response.data
        }

    },
    error => {
        console.log('请求错误：' + error.message)// for debug
        if (error.response.status == 403) {
            store.dispatch('FedLogOut').then(() => {
                location.reload()// 为了重新实例化vue-router对象 避免bug
            })
        }
    }
)

export {baseUrl}
export default service

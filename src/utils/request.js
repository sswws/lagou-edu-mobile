import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  const { user } = store.state
  // 检测 user 是否存在
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})
// 封装函数，用于跳转登陆页
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 标记 token 刷新状态
let isRefreshing = false
// 存储刷新时等待的请求
let requests = []

request.interceptors.response.use(response => {
  return response
}, async error => {
  // 存在响应内容，但是出错
  if (error.response) {
    // 检测状态码是否为 401
    if (error.response.status === 401) {
      // 检测是否存在用户的登录信息
      if (!store.state.user) {
        redirectLogin()
        // 如果不存在，结束即可
        return Promise.reject(error)
      }
      // 发送请求前检测，是否已经存在刷新 token 的请求了
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 指的是失败请求的配置对象
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，尝试刷新 token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      if (data.sate !== 1) {
        // 刷新 token 失败
        store.commit('setUser', null)
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新 token 成功
      store.commit('setUser', data.content)
      // 将 requests 中的所有请求重新发送
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

export default request

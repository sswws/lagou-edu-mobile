import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登陆用户数据
    user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user') || null)
  },
  mutations: {
    // 用于修改 User
    setUser (state, payload) {
      // payload 为请求到的用户数据，JSON 格式不便操作，转换为对象存储
      state.user = JSON.parse(payload)
      // 本地存储
      window.localStorage.setItem('lagou-edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

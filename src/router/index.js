import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login')
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫进行登陆检测与跳转
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证 Vuex 的 store 中是否存储用户登录信息
    if (!store.state.user) {
      // 未登陆，跳转到登陆页面
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 已经登陆，允许通过
    next()
  } else {
    next()
  }
})

export default router

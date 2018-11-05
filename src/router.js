import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: "login"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('./views/Result.vue')
    },
    {
      path: '/select-values',
      name: 'select-values',
      component: () => import('./views/SelectValues.vue')
    }
  ]
})

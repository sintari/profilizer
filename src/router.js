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
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import(/* webpackChunkName: "about" */ './views/Result.vue')
    },
    {
      path: '/select-values',
      name: 'select-values',
      component: () => import(/* webpackChunkName: "about" */ './views/SelectValues.vue')
    }
  ]
})

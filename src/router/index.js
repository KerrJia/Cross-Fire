import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

const permissionList = ['/mine', '/confirm']

router.beforeEach((to, from, next) => {

  if (permissionList.includes(to.path)) {
    if (store.state.user.isLogin) {
      next()
    } else {

      next({
        name: 'login',
        params: {
          to
        }
      })
    }
  } else {
    next()
  }
})

export default router

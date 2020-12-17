import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置 css 样式
import './_reset.scss'

Vue.config.productionTip = false

// 定义全局过滤器：格式化商品金额
Vue.filter('money', function (val) {
  return Number(val).toFixed(2)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

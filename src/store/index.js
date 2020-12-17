import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user-module'

Vue.use(Vuex)

const cart = JSON.parse(localStorage.getItem('cart')) || []

const cartStorage = store => {

  store.subscribe((mutation, state) => {

    switch (mutation.type) {
      case 'addToCart': // 加入购物车
      case 'removeFromCart': // 从购物车中删除
      case 'modifyAmount': // 修改购物车中商品数量
      case 'changeProdChecked': // 修改商品选中状态
      case 'checkAll': // 选中所有
        localStorage.setItem('cart', JSON.stringify(state.cart))
        break
    }
  })
}

const userStorage = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'login':
        localStorage.setItem('user', JSON.stringify(state.user))
        break
      case 'logout':
        localStorage.removeItem('user')
        break
    }
  })
}

const store = new Vuex.Store({
  strict: true,
  plugins: [cartStorage, userStorage],
  modules: {
    user: userModule
  },
  state: {
    cart
  },
  getters: {
    allChecked (state) {
      return state.cart.every(prod => prod.checked)
    },
    // 计算选中商品的总价格
    totalMoney (state) {
      return state.cart.reduce((result, prod) => {
        if (prod.checked) {
          result += prod.amount * prod.price
        }
        return result
      }, 0)
    }
  },
  mutations: {
    /**
     * 加入购物车
     * @param state
     * @param payload
     */
    addToCart (state, payload) {
      // 复制一份 state.cart 使用
      const cart = [...state.cart]

      const hasExist = cart.some(prod => prod.id === payload.id)
      if (hasExist) { //
        state.cart = cart.map((prod) => {
          if (prod.id === payload.id) {
            prod.amount += payload.amount
          }
          return prod
        })
      } else { //
        payload.checked = false
        // 加入购物车数组中
        state.cart = [
          ...cart,
          payload
        ]
      }
    },
    /**
     * @param {*} state
     * @param {*} payload
     */
    removeFromCart (state, payload) {
      state.cart = state.cart.filter(prod => prod.id !== payload)
    },
    /**
     * 修改购物车中商品的数量
     */
    modifyAmount (state, { id, amount }) {
      const cart = [...state.cart]

      state.cart = cart.map(prod => {
        if (prod.id === id) {
          prod.amount = Number(amount)
        }
        return prod
      })
    },
    /**
     * 修改商品选中状态
     * @param {*} state
     * @param {*} id
     */
    changeProdChecked (state, id) {
      const cart = [...state.cart]
      state.cart = cart.map(prod => {
        if (prod.id === id) {
          prod.checked = !prod.checked
        }
        return prod
      })
    },
    /**
     * 全选/取消全选
     * @param {*} state
     * @param {*} checkedStatus 之前的选中状态
     */
    checkAll (state, checkedStatus) {
      const cart = [...state.cart]
      state.cart = cart.map(prod => {
        prod.checked = !checkedStatus
        return prod
      })
    }
  },
  actions: {} // 通常异步更新 state 时的方法
})

export default store

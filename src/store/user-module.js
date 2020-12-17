// 读取 localStorage 中保存的用户信息
const user = JSON.parse(localStorage.getItem('user')) || {
  username: '',
  isLogin: false,
  token: ''
}

export default {
  state: user,
  mutations: {
    login (state, { username, token }) {
      state.username = username
      state.token = token
      state.isLogin = true
    },
    logout (state) {
      state.username = ''
      state.token = ''
      state.isLogin = false
    }
  },
  actions: {
    // 异步登录
    loginAsync (store, { username, password }) {
      return new Promise((resolve, reject) => {
        // 模拟，实际应该发送 ajax 请求
        setTimeout(() => {
          if (username === 'admin' && password === 'admin') { // 模拟登录成功
            // action 中不能直接更新状态，而是通过提交 mutation 来实现状态更新
            store.commit('login', {
              username: 'admin',
              token: 'asdlfkjasdoijlkjasiodfjqljewrlkasdjfoasdjflkasj'
            })
            resolve({ isLogin: true })
          } else {
            reject(new Error('用户名或密码错误'))
          }
        }, 1000)
      })
    },
    // 异步退出
    logoutAsync (store) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          store.commit('logout')
          resolve({ success: true })
        }, 1000)
      })
    }
  }
}

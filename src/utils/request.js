/* axios 二次封装 */
import axios from 'axios'

const baseURL = 'http://www.xiongmaoyouxuan.com'

// 创建 axios 实例
const service = axios.create({
  baseURL
})

// 请求拦截：用户权限认证时 token 拦截
service.interceptors.request.use(config => config)

// 响应拦截
service.interceptors.response.use(response => { // response 中包装了从服务器响应回来的数据
  console.log('响应拦截：', response)
  if (response.status >= 200 && response.status < 300) { // 成功
    if (response.data.code === 200) { // 前后端规范中 code 为 200 表示数据正常
      return response.data.data // 返回正确的数据内容
    }
  }
  // 有异常时返回的数据内容
  return Promise.reject(response)
})

// 导出 axios 实例
export default service

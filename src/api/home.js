import request from '../utils/request'

// 获取轮播图数据
export const getBanners = () => {
  // 发送 GET 请求
  // return request.get('/api/tab/1?start=0')
  return request({
    method: 'GET',
    url: '/api/tab/1?start=0'
  })
}

import request from '@/utils/request'

/**
 * 根据分类获取分类推荐的商品列表数据
 * @param {*} url 分类
 */
export const getListByCategory = (url, nextIndex) => {
  const id = url.slice(url.lastIndexOf('=') + 1)
  let api
  if (url.startsWith('youxuan://column')) {
    api = `/api/column/${id}/items?start=${nextIndex}`
  } else {
    api = `/api/category/${id}/items?start=${nextIndex}&sort=0`
  }

  return request({
    method: 'GET',
    url: api
  }).then(res => {
    if (res.items) {
      return res.items
    }
    return res
  })

  // res => res.items || res
}

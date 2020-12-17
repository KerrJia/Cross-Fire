import request from '@/utils/request'

/**
 * 获取所有的分类数据
 */
export const getAllCategories = () => {
  return request({
    url: '/api/tabs',
    method: 'GET'
  })
}

/**
 * 根据父级分类的id查询子分类数据
 * @param {*} cid 父级 id
 */
export const getSubCategories = cid => {
  return request({
    method: 'GET',
    url: `/api/tab/${cid}`
  })
}

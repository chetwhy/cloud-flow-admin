import request from '@/utils/request'

const api_name = '/api/v1/orders'

export default {
  // 获取所有订单信息
  getOrderList() {
    return request({
      url: '/api/v1/orders/list',
      method: 'get'
    })
  },

  // 获取指定id订单
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  }
}

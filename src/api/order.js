import request from '@/utils/request'

// 获取所有订单信息
export default {
  getOrderList() {
    return request({
      url: '/api/v1/orders/list',
      method: 'get'
    })
  }
}


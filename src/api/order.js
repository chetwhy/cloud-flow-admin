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
  testRedirect() {
    return request({
      url: '/api/v1/orders/aaa',
      method: 'get'
    })
  },

  // 获取指定id订单
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  // 保存订单
  save(temp) {
    return request({
      url: api_name,
      method: 'post',
      data: temp // 作为请求报文体中的json数据传输
    })
  },

  // 更新订单
  updateById(temp) {
    return request({// 封装axios
      url: `${api_name}/${temp.id}`,
      method: 'put',
      data: temp
    })
  }
}

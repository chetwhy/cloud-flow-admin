<template>
  <div>
    <h2>订单管理vue</h2>
    <div>
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          fixed
          prop="id"
          label="ID"
          min-width="30%"
        />
        <el-table-column
          prop="product"
          label="商品"
          min-width="100%"
        />
        <el-table-column
          prop="total"
          label="总数"
          min-width="100%"
        />
        <el-table-column
          prop="description"
          label="描述"
          min-width="100%"
        />
        <el-table-column
          fixed="right"
          label="操作"
          min-width="100%"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* 引入order的api组件*/
import order from '@/api/order'
export default {
  name: 'Index',
  data() {
    return {
      tableData: []
    }
  },
  /* 生命周期函数--页面加载时调用*/
  created() {
    this.fetchData()
  },

  methods: {
    // 获取后端数据--获取所有订单
    fetchData() {
      order.getOrderList().then(response => {
        this.tableData = response.data.items
        console.log(this.tableData)
      })
    }
  }
}
</script>

<style scoped>

</style>

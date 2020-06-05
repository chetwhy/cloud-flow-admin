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
          prop="username"
          label="用户"
          min-width="100%"
        />
        <el-table-column
          prop="age"
          label="年龄"
          min-width="100%"
        />
        <el-table-column
          prop="company"
          label="公司"
          min-width="100%"
        />
        <el-table-column
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
import order from '@/api/order'
export default {
  name: 'Index',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
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

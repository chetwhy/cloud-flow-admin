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
          align="center"
        />
        <el-table-column
          prop="product"
          label="商品"
          min-width="100%"
          align="center"
        />
        <el-table-column
          prop="total"
          label="总数"
          min-width="100%"
          align="center"
        />
        <el-table-column
          prop="description"
          label="描述"
          min-width="100%"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          min-width="100%"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewOrder(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="editOrder(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
        title="订单简要信息"
        :visible.sync="dialogViewVisible"
        width="30%"
      >
        <el-form ref="form" :model="temp" label-width="80px">
          <p><span style="font-weight: bold">产品ID: </span>{{ temp.id }}</p>
          <p><span style="font-weight: bold">产品名称: </span>{{ temp.product }}</p>
          <p><span style="font-weight: bold">产品数量: </span>{{ temp.total }}</p>
          <p><span style="font-weight: bold">产品描述: </span>{{ temp.description }}</p>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="编辑订单信息"
        :visible.sync="dialogEditVisible"
        :before-close="handleClose"
        width="30%"
      >
        <el-form ref="form" :model="temp" label-width="80px">
          <el-form-item label="产品名称">
            <el-input v-model="temp.product" />
          </el-form-item>
          <el-form-item label="产品数量">
            <el-input v-model="temp.total" />
          </el-form-item>
          <el-form-item label="产品描述">
            <el-input v-model="temp.description" />
          </el-form-item>
          <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">更新</el-button>
            <el-button @click="dialogEditVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      tableData: [],
      dialogViewVisible: false, // 查看订单弹窗
      dialogEditVisible: false, // 编辑订单弹窗
      saveBtnDisabled: false, // 保存按钮是否禁用,
      temp: {
        id: undefined,
        product: '',
        total: 1,
        title: '',
        type: '',
        description: '',
        status: 'published'
      }
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
    },
    // 查看订单
    viewOrder(id) {
      order.getById(id).then(response => {
        // console.log(response)
        this.dialogViewVisible = true
        // 将后端值赋予前端
        this.temp = Object.assign({}, response.data.item)
      })
    },
    // 编辑订单
    editOrder(row) {
      // console.log('编辑：' + JSON.stringify(row))
      this.dialogEditVisible = true
      this.saveBtnDisabled = false
      this.temp = Object.assign({}, row)
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.temp.id) {
        this.saveOrder()
      } else {
        this.updateOrder()
      }
    },
    // 保存订单
    saveOrder() {
      order.save(this.temp).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(response => {
        this.$router.push({ path: '/orders/list' })
      })
    },
    // 更新订单
    updateOrder() {
      console.log(this.temp)
      order.save(this.temp).then(response => {
        return this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).then(response => {
        this.$router.push({ path: '/orders/list' })
      })

      this.dialogEditVisible = false
    }
  }
}
</script>

<style scoped>

</style>

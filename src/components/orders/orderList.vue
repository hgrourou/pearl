<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      :header-cell-style="{'text-align':'center'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单ID"
      </el-table-column>
      <el-table-column
        prop="buyer.nickName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="orderItems[0].product.id"
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="orderItems[0].product.title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="totalProductPrice"
        label="订单金额">
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="gotoDetail(scope.row.id)"
            type="text"
            size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="total"
      :current-page="currentPage"
      @current-change="pageCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import { loadOrders } from '@/api/order/orderService'
export default {
  data () {
    return {
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.loadOrderList(1);
  },
  methods: {
    loadOrderList (pn) {
      loadOrders(pn-1).then( data => {
        this.tableData = data.SUCCESS.content
        this.tableData.forEach(function(item) {
          switch(item.orderStatus) {
            case 'PlaceOrder':
              item.orderStatus = '下单完成';
              break;
            case 'FinishPayment':
              item.orderStatus = '支付完成';
              break;
            case 'NoPayment':
              item.orderStatus = '未支付';
              break;
            case 'FinishReturn':
              item.orderStatus = '退货完成';
              break;
            case 'FinishShipping':
              item.orderStatus = '已收货';
              break;
          }
        })
        this.total = data.SUCCESS.totalPages
        this.currentPage = data.SUCCESS.number+1
      }, data => {
      })
    },
    pageCurrentChange (pageIndex) {
      this.currentPage = pageIndex
      this.loadOrderList (this.currentPage)
    },
    gotoDetail (orderId) {
      if (orderId) {
        this.$router.push({
          name: 'orderDetail',
          params: {id: orderId}
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

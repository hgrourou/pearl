<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      :header-cell-style="{'text-align':'center'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="商品ID"
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="coverPicture.url"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.coverPicture.url" alt="" style="height: 100px">
        </template>
      </el-table-column>
      <el-table-column
        prop="nowPrice"
        label="价格">
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
import { loadProducts } from '@/api/product/ProductService'
export default {
  data () {
    return {
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.loadProductList(1);
  },
  methods: {
    loadProductList (pn) {
      loadProducts(pn-1).then( data => {
        this.tableData = data.SUCCESS.content
        this.total = data.SUCCESS.totalPages
        this.currentPage = data.SUCCESS.number+1
      }, data => {
      })
    },
    pageCurrentChange (pageIndex) {
      this.currentPage = pageIndex
      this.loadProductList (this.currentPage)
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

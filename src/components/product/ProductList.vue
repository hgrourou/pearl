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
          <el-button
            @click.native.prevent="deleteProduct(scope.row.id)"
            type="danger"
            size="error">
            删除
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
import { loadProducts,deleteProduct } from '@/api/product/ProductService'
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
    gotoDetail (productId) {
      if (productId) {
        this.$router.push({
          name: 'productDetail',
          params: {id: productId}
        })
      }
    },
    deleteProduct (productId) {
      if(productId) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProduct(productId).then(res => {
            this.loadProductList(this.currentPage);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, res => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          })
          
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

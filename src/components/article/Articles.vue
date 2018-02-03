<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      :header-cell-style="{'text-align':'center'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="文章ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="coverPicture.url"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="articleCategory.name"
        label="文章类型">
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
import { getAllArticles } from '@/api/article/articleService'

export default {
  data () {
    return {
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.getArticlesByPage(1);
  },
  methods: {
    getArticlesByPage (pn) {
      getAllArticles(pn-1).then( data => {
        this.tableData = data.SUCCESS.content
        console.log(this.tableData)
        this.total = data.SUCCESS.totalPages
        this.currentPage = data.SUCCESS.number+1
      }, data => {
      })
    },
    pageCurrentChange (pageIndex) {
      this.currentPage = pageIndex
      this.loadOrderList (this.currentPage)
    },
    gotoDetail (articleId) {
      if (articleId) {
        this.$router.push({
          name: 'editArticle',
          params: {id: articleId}
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

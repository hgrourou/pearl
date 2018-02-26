<template>
  <el-row class="container">
    <el-col :span="20" class="header">  
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" placeholder="请输入文章作者"></el-input>
        </el-form-item>
        <el-form-item label="封面图" style="text-align:left;">
          <input id="picture" type="file" @change="uploadPicture" ref="coverInput"/>
          <img v-if="coverUrl" :src="coverUrl" alt="上传封面图" width="200">
        </el-form-item>
        <el-form-item label="内容">
          <Editor ref="editor" :defaultMsg="defaultMsg" :config="config"></Editor>
        </el-form-item>
        <el-form-item label="文章类型" style="text-align:left;">
          <el-select v-model="form.articleCategory" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相关商品">
          <el-input v-model="form.relatedProducts" placeholder="多个商品用逗号分隔"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addArticle" class="btn-add">发布文章</el-button>
    </el-col>
    <el-col :span="4">
    </el-col>
  </el-row>
</template>
<script>
import Vue from 'vue'
import Editor from '@/components/common/Editor'
import {getAllCategories} from '@/api/category/categoryService'
import {addArticle} from '@/api/article/articleService'
import { getCookie } from '@/util/cookie'
import base from '@/api/index'
export default {
  components: {
    Editor
  },
  data () {
    return {
      defaultMsg: '测试发文章',
      config: {
        initialFrameHeight: 350
      },
      form: {
        title: '',
        author: '',
        coverPicture: '',
        articleCategory:'',
        content: '',
        relatedProducts: ''
      },
      coverUrl: '',
      coverId: -1,
      categories: []
    }
  },
  mounted () {
    this.getCategories();
    this.coverUrl = '';
  },
  methods : {
    uploadPicture () {
      let self = this;
      let file = $('#picture')[0].files[0],
        formData = new FormData();
      formData.append('pictureFile', file);
      let token = getCookie('token'),
        description = 'upload article cover';
      $.ajax({
        url: `${base}/picture/add?height=0&width=0&description=${description}`,
        type: "POST",
        headers: {
          "authorization": `Bearer ${token}`,
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
          self.coverUrl = response.picture.url;
          self.coverId = response.picture.id
        }
      })
    },
    getCategories () {
      getAllCategories().then(res => {
        this.categories = res.articleCategories
      })
    },
    addArticle () {
      this.form.content = this.$refs.editor.getUEContent();
      if(this.coverId == -1) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请上传封面图'
        })
        return;
      } else {
        this.form.coverPicture = this.coverId;
      }
      this.form.relatedProducts = this.form.relatedProducts.split(',');
      addArticle(this.form).then(res => {
        if(res.SUCCESS) {
          this.$message({
            showClose: true,
            message: '上传文章成功'
          })
          this.$router.push({
            name: 'articleList'
          })
        }
      }, res => {
        this.$message.error('上传文章失败')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    margin: 30px 0;
  }
  .header {
    margin-top: 30px
  }
  .btn-add {
    margin: 30px auto;
  }
  // 上传图片
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


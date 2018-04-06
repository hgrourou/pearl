<template>
  <el-row class="container">
    <el-col :span="20" class="header">  
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input type="textarea" v-model="form.description" placeholder="请输入商品描述" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="类别" class="left">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图" class="left">
          <input id="picture" type="file" @change="uploadPicture" ref="coverInput"/>
          <img v-if="coverUrl" :src="coverUrl" alt="封面图" width="200">
        </el-form-item>
        <el-form-item label="图片" class="left">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- :on-preview="handlePictureCardPreview" 
            :on-remove="handleRemove">-->
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" placeholder="请输入标题"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="createProcuct" class="btn-add">发布商品</el-button>
    </el-col>
    <el-col :span="4">
    </el-col>
  </el-row>
</template>
<script>
import Vue from 'vue'
import {getProductCategories} from '@/api/category/categoryService'
import {addArticle} from '@/api/article/articleService'
import { getCookie } from '@/util/cookie'
import base from '@/api/index'
export default {

  data () {
    return {
      defaultMsg: '测试发文章',
      config: {
        initialFrameHeight: 350
      },
      form: {
        title: '',
        description: '',
        category: '',
        coverPicture: '',
      },
      categories: [],
      coverUrl: ''
    }
  },
  mounted () {
    this.getCategories();
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
      getProductCategories().then(res => {
        this.categories = res.SUCCESS
      })
    },
    createProcuct () {
      console.log(this.form)
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
  .left {
    text-align: left;
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


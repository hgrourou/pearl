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
            class="upload-demo"
            :action="uploadImageUrl"
            :headers="imageHeaders"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            multiple
            name="pictureFile"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
import {uploadPicture1} from '@/api/picture/pictureService'
import { addProduct } from '@/api/product/ProductService'
import { getCookie } from '@/util/cookie'
import base from '@/api/index'
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        category: '',
        coverPicture: '',
        pictures: [],
        price: '',
        nowPrice: '',
        clickCount: 0,
        collectionCount: 0,
        onShelf: true
      },
      categories: [],
      coverUrl: '',
      fileList: [],
      // 上传图片地址
      uploadImageUrl: `${base}/picture/add?width=0&height=0&description="upload product list image"`,
      imageHeaders: {
        authorization: `Bearer ${getCookie('token')}`,
      }
    }
  },
  mounted () {
    this.getCategories();
  },
  methods : {
    uploadPicture () {
      let self = this,
        file = $('#picture')[0].files[0],
        token = getCookie('token'),
        description = 'upload product cover',
        formData = new FormData();
      formData.append('pictureFile', file);
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
          self.form.coverPicture = response.picture.id
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
      this.form.nowPrice = this.form.price
      addProduct(this.form).then((res) => {
        this.$message({
          type: 'success',
          message: '创建成功!'
        });
      }, () => {

      })
      
    },
    handlePreview (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      for(let i = 0; i < this.form.pictures.length; i++) {
        if(this.form.pictures[i] === file.response.picture.id) {
          this.form.pictures.splice(i, 1);
          break;
        }
      }
    },
    handleSuccess (response, file, fileList) {
      if(response.picture && response.picture.id) {
        this.form.pictures.push(response.picture.id)
      }
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
  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409EFF;
  // }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  //   text-align: center;
  // }
  // .avatar {
  //   width: 178px;
  //   height: 178px;
  //   display: block;
  // }
</style>


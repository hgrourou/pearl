<template>
  <el-row class="container">
    <el-col :span="20" class="header">  
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <Editor :defaultMsg="defaultMsg" :config="config"></Editor>
        </el-form-item>
      </el-form>        
    </el-col>
    <el-col :span="4">
    </el-col>
  </el-row>
</template>
<script>
import Editor from '@/components/common/Editor'
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
        description: ''
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
</style>


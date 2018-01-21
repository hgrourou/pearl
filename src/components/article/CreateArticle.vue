<template>
  <el-row class="container">
    <el-col :span="20" class="header">  
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>        
    </el-col>
    <el-col :span="4">
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
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


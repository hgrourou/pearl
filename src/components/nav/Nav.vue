<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>文章</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/articles/list">文章列表</el-menu-item>
        <el-menu-item index="/articles/create">发布文章</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>商品</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/products/list">商品列表</el-menu-item>
        <el-menu-item index="/products/create">发布商品</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/orders">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>订单</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/orders/list">订单列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    name: 'Nav',
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>


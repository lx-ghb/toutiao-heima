<template>
  <div class="layout-aside">
      <div class="title">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!--导航 -->
      <el-col>
    <el-menu
      background-color=" #353b4e"
      text-color="#adafb5">
      <el-menu-item index="2">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论列表</el-menu-item>
          <el-menu-item index="1-3">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">粉丝管理</span>
        </template>
        <el-menu-item index="1-1">图文数据</el-menu-item>
        <el-menu-item index="1-2">粉丝概况</el-menu-item>
        <el-menu-item index="1-3">粉丝画像</el-menu-item>
        <el-menu-item index="1-3">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-user-solid"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .layout-aside {
        background-color: #323745;
        height: 100vh;
        width: 200px;
        .title {
            text-align: center;
            background-color: #2e2f32;
            padding: 13px;
            img {
                height: 30px;
            }
        }
    }
</style>

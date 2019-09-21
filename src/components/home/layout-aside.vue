<template>
  <div class="layout-aside">
      <div class="title">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!--导航 -->
      <el-col>
        <!-- 给el-menu一个router="true" 启用路由 -->
    <el-menu
      router
      background-color=" #353b4e"
      text-color="#adafb5">
      <el-menu-item index="、home">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/home/fans">
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">粉丝管理</span>
        </template>
        <el-menu-item index="/home/gradata">图文数据</el-menu-item>
        <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
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

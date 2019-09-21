<template>
  <el-container>
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
      <!-- 侧边栏导航 -->
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view>
          <!-- 二级路由容器 -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

export default {

}
</script>

<style>

</style>

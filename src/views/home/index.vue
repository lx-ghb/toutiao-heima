<template>
  <el-container>
    <el-aside>
      <!-- 侧边栏导航 -->
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部 -->
      </el-header>
      <el-main>
        <router-view>
          <!-- 二级路由容器 -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }

}
</script>

<style>

</style>

<template>
  <el-row type="flex" justify="space-between" class="layout-header" align="middle">
  <el-col :span="8">
      <i class="el-icon-s-fold"></i>
    <span class="title">江苏传智博客教育科技股份有限公司</span>
  </el-col>
  <el-col :span="4">
      <!-- img引用的如果是一个固定的地址，vue-cli会把地址转成base64/  -->
      <!-- 如果img中地址不固定=》地址根据条件得来的 => 就不能转成base6 -->
      <!-- 线上的地址就不需要require包裹 -->
      <img :src="userInfo.photo ? userInfo.photo : defaultitem" alt="" class="head-img">
      <el-dropdown trigger="click" @command="commonClick">
      <span class="el-dropdown-link">
        {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command='git'>git地址</el-dropdown-item>
        <el-dropdown-item divided command='logout'>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, //  个人信息对象
      defaultitem: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data
      })
    },
    commonClick (key) {
      if (key === 'account') {
        // 跳转到账户信息
        this.$router.push('/home/account')
      } else if (key === 'git') {

      } else {
        window.localStorage.clear() //  只能清除本项目的缓存跳转到登录就要删除令牌
        this.$router.push('/login') //  点击退出跳转带登录页
      }
    }

  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
    .layout-header {
        height:50px;
        .el-icon-s-fold {
            font-size: 22px;
        }
        .title {
            vertical-align: top;
            margin-left: 5px;
        }
        .head-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
</style>

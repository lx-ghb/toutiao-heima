<template>
  <div class="login">
    <el-card class="login-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 绑定rules规则 , el-form-item中的prop属性，值为校验的字段名-->
        <el-form ref="myfrom" :model="loginFrom" :rules="loginrules" style="margin-top:20px">
            <el-form-item prop="mobile">
                <el-input v-model="loginFrom.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginFrom.code" style="width:65%" placeholder="请输入验证码"></el-input>
                <el-button style="float:right">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="agree">
                <el-checkbox v-model="loginFrom.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button @click="login" type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  // 表单：收集数据，校验数据，提交数据
  data () {
    var validator = function (rule, value, callBack) {
      // 当返回的值为true，进入判断执行callBack,
    //   if (value) {
    //     callBack() // callBack:一切ok，继续执行
    //   } else {
    //     // 如果返回的为false则停止执行，返回一个提示信息
    //     callBack(new Error('您需要勾选条款'))
    //   }
      value ? callBack() : callBack(new Error('您需要勾选条款'))
    }
    return {

      // 收集数据
      loginFrom: {
        mobile: '', //  获取手机号
        code: '', //  获取验证码
        agree: false //  是否同意协议布尔值
      },
      //   自动校验  登录规则：集合对象
      loginrules: {

        //   决定这校验规则
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码为六位数字' }
        ],
        //  自定义校验函数
        // validator有三个参数 rule当前规则、value当前值，回调函数
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      //   validate是一个方法，方法中传入一个函数，两个校验的参数，
    //   （是否校验成功，未校验成功的字段）我们不需要没有校验成功的字段，所以不用写
      this.$refs.myfrom.validate((isOk) => {
        if (isOk) {
        //  当校验成功后，发送post请求，提交数据
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginFrom
          }).then(result => {
            //   将后台返回的token令牌存储到前端缓存中
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home') //  跳转到主页
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '您的手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 如果要在组件的样式中写样式，就要给一个lang='less'属性
// scoped属性，作用是只对当前自己的html起作用。如若不写组件之间的样式会相互影响
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;  /* 自适应屏幕 */
    .login-card {
        width: 440px;
        height: 330px;
        .title{
            text-align: center;
            img {
                height: 45px;
            }
        }
    }
}

</style>

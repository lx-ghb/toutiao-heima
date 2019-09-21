// 导航守卫
// 在路由改变的瞬间判断是否有无token,有token则继续，无token回到登录页面
import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    // 判断以/home 为开头的path要拦截
    // 判断是否登录。有token就登录，无token就没登录挑战到登录页
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login') // next 是必须要执行的，没有令牌跳转到登录页面
    }
  } else {
    next() //  放行
  }
})

export default router

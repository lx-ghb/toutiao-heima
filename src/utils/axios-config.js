//   负责对axios进行处理
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../permission'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 在请求到达后台之前拦截   有两个参数，都是函数，
axios.interceptors.request.use(function (config) {
//   debugger
  // config 选项对象{url，params,method等等}  config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}`
}, function (error) {
  return Promise.reject(error)
})
// --------------------------------------
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // 可以处理响应返回的数据
//     执行失败是执行
  let status = error.response.status //  获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() //  清空缓存
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message })
  //   在异常处理函数中将所有错误处理完毕，不在进入Catch  终止错误
  return new Promise(function () {})
})

export default axios

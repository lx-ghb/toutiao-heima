// 全局注册组件
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/breadCrumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb) //  面包屑
  }
}

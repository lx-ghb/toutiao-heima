import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import Component from './components' // 印日插件对象
import ElementUI from 'element-ui' //  引入element-ui
import axios from './utils/axios-config'
import 'element-ui/lib/theme-chalk/index.css' //  引入样式
import './styles/index.less'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Component)
Vue.use(ElementUI) //  注册elementui
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

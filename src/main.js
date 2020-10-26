import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

// 引入图标样式表
import './assets/fonts/iconfont.css'

import axios from 'axios'

axios.defaults.baseURL = 'https://yapi.baidu.com/mock/3750/vue/shop/'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

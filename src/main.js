import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from './config/axios/httpConfig'



//---------------------------------------------------------------------------->>>>>>css
import '~Assets/styles/reset.css'
import '~Assets/styles/border.css'


Vue.config.productionTip = false

//use
Vue.use(Antd)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

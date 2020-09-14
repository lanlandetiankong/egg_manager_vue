// ie polyfill
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueDraggableResizable from 'vue-draggable-resizable';
Vue.component('vue-draggable-resizable', VueDraggableResizable);


import VueScroll from 'vuescroll'
import VueScrollConf from '~Config/vuescroll/vuescroll.conf.js'

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'


//---------------------------------------------------------------------------->>>>>>css
import '~Assets/styles/reset.css'
import '~Assets/styles/border.css'
import {quillToolbarConfig} from '~Assets/plugins/quill/myQuillEditorConfig.js'
Vue.prototype.$quillToolbarConfig = quillToolbarConfig

Vue.config.productionTip = (process.env.NODE_ENV === 'development');


//use
Vue.use(Antd)
Vue.use(VueScroll,VueScrollConf)
Vue.use(VueQuillEditor)


//router每次跳转都刷新页面的处理
//Vue.prototype.router = router;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

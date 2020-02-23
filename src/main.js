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

import axios from './config/axios/httpConfig'

import VueScroll from 'vuescroll'
import VueScrollConf from '~Config/vuescroll/vuescroll.conf.js'

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor, Quill} from 'vue-quill-editor'


//---------------------------------------------------------------------------->>>>>>css
import '~Assets/styles/reset.css'
import '~Assets/styles/border.css'
import {quillToolbarConfig} from '~Assets/plugins/quill/myQuillEditorConfig.js'


Vue.config.productionTip = false;
Vue.prototype.$quillToolbarConfig = quillToolbarConfig

//use
Vue.use(Antd)
Vue.use(VueScroll,VueScrollConf)
Vue.use(VueQuillEditor)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

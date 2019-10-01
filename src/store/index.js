import Vue from 'vue'
import Vuex from 'vuex'
import getters  from  './getters.js'
import tagsView from './modules/tags/tagsView.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules:{
        tagsView
    },
    getters
})
export default store;

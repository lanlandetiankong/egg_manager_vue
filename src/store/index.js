import Vue from 'vue'
import Vuex from 'vuex'
import getters  from  './getters.js'
import tagsView from './modules/tags/tagsView.js'
import routingStore from './modules/routing/routingStore.js'
import userInfoStore from './modules/user/userInfoStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules:{
        tagsView,
        routingStore,
        userInfoStore
    },
    getters
})
export default store;

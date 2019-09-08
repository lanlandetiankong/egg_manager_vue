import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '~Pages/IndexPage'

import LoginRouter from './login/index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'IndexPage',
            component: IndexPage
        },
        {
            path: '/index',
            name: 'IndexPage',
            component: IndexPage
        },
        ...LoginRouter,
    ]
})

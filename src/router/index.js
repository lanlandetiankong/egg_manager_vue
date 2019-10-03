import Vue from 'vue'
import Router from 'vue-router'

const _import = require('~Router/_import_' + process.env.NODE_ENV)

import Layout from '@/layout/Layout'


import EmployeeRouter from './main/employee/index'
import PermissionRouter from './main/permission/index'

//错误页面
import Error4XXRouter from  './error/error4xx/index'


Vue.use(Router)


export const constantRouterMap = [
    {
        path:'',
        component:Layout,
        redirect:'main',
        children:[
            {
                path:'',
                component:_import('index/dashboard/DashBoardPage'),
                name:'dashboard',
                meta:{title:'首页',icon:"dashboard",noCache:true}
            },
            EmployeeRouter,
            PermissionRouter
        ]
    },
    Error4XXRouter
]



export  default new Router({
    mode:'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap

})

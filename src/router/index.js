import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

import IndexPage from '~Pages/index/IndexPage'
import Layout from '@/layout/Layout'




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
            {
                path:'employee',
                component:_import('index/employee/EmployeePage'),
                name:'employee',
                children:[
                    {
                        path:'info',
                        component:_import('index/employee/info/EmpInfoView'),
                        name:'employee-emp_info',
                        meta:{title:'用户信息',icon:"user",noCache:true}
                    },
                    {
                        path:'job',
                        component:_import('index/employee/job/EmpJobManagerView'),
                        name:'employee-emp_job',
                        meta:{title:'职务管理',icon:"user",noCache:true}
                    }
                ]
            },
        ]
    }
]



export  default new Router({
    mode:'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap

})

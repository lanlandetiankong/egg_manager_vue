import IndexPage from '~Pages/index/IndexPage'

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: IndexPage,
        meta: {title: '首页'},
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
            {
                path: '/employee',
                name: 'employee',
                redirect: '/employee/control',
                component: () => import('~Pages/menus/employee/EmployeePage'),
                meta: {title: '用户管控', keepAlive: true,  permission: ['employee:control']},
                children: [
                    {
                        path: '/dashboard/analysis',
                        name: 'Analysis',
                        component: () => import('~Pages/menus/employee/emp_info/UserInfoView'),
                        meta: {title: '员工信息', keepAlive: false, permission: ['employee']}
                    }
                ]
            }
        ]
    },
    {
        path: '*', redirect: '/404', hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '~Pages/error/4xx/Error404Page')
    },
    
]

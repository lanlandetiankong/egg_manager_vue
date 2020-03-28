import Vue from 'vue'
import VueRouter from 'vue-router'
import {message,Modal} from 'ant-design-vue';

const _import = require('~Router/_import_' + process.env.NODE_ENV)

//index的基本布局
import Layout from '@/layout/Layout'

import EmployeeRouter from './main/employee/index'
import ModuleRouter from './main/module/index'
import OrganizationRouter from './main/organization/index'
import PermissionRouter from './main/permission/index'
import UserZoneRouter from './main/userZone/index'
import AnnouncementRouter from './main/announcement/index'


//登录、注册
import MemberRouter from './member/index.js'
//错误页面
import Error4XXRouter from  './error/error4xx/index'


Vue.use(VueRouter);

var indexParentRouterCompName = "Layout"

export const constantRouterMap = [
    {
        path:'',
        redirect:'/index',
    },
    {
        path:'/index',
        component:Layout,
        redirect:'main',
        children:[
            {
                path:'',
                component:_import('index/dashboard/DashBoardPage'),
                name:'dashboard',
                meta:{
                    title:'首页',icon:"dashboard",keepAliveFlag:true,
                    visitLimit:false ,
                    parentRouterCompName:indexParentRouterCompName,
                    selfCompName:'UserZoneCenterView'
                }
            },
            EmployeeRouter,
            ModuleRouter,
            PermissionRouter,
            UserZoneRouter,
            AnnouncementRouter,
            OrganizationRouter
        ]
    },
    MemberRouter,
    Error4XXRouter
]


//默认可访问的路径，不进行拦截
const defaultPassRouterUrls = [] ;


const vueRouter = new VueRouter({
    mode:'history',
    linkExactActiveClass: 'active', // 保持要跳转后的路由页面标题高亮
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
vueRouter.beforeEach((to,from,next) => {
    var _this = this ;
    var passFlag = true ;
    if(to && from){
        const toPath = to.fullPath ;
        if(defaultPassRouterUrls.indexOf(toPath) == -1){    //要访问的路径不在 [默认放行路径] ?
            if(to.meta.visitLimit == false){    //在router定义的meta配置 visitLimit = false ，标识该路径默认可访问，不会受权限控制 而无法访问!
                passFlag = true ;
            }   else {
                var visibleRouterUrlsStr = window.sessionStorage.getItem("visibleRouterUrls") ;
                if(visibleRouterUrlsStr){
                    var visibleRouterUrlsSet = JSON.parse(visibleRouterUrlsStr);
                    if(visibleRouterUrlsSet.indexOf(toPath) == -1){   //验证根据用户角色 返回的可访问路径
                        passFlag = false ;
                    }
                }
            }

        }
    }
    if(passFlag){   //放行
        next();
    }   else {  //拦截,判断用户是否跳转到首页
        Modal.confirm({
            title:"您当前没有权限访问该路径！已拦截您的跳转请求！",
            closable:true,
            okText:"留在当前页面",
            cancelText:"跳转到首页",
            maskClosable:true,
            onCancel(close){
                debugger;
                if(typeof close == "function"){
                    close();
                }
                if(from.path != "/index" && from.path != ""){
                    next({path:"/index"});
                }   else {
                    //next(false);
                }
            },
            onOk(close){
                debugger;
                close();
                //next(false);
            }
        })

        //message.warning("您当前没有权限访问该路径！已拦截您的跳转请求！");
    }
})

export default vueRouter;

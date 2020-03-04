const _import = require('~Router/_import_' + process.env.NODE_ENV) ;
//所挂载的 page 组件名
const parentRouterCompName = "ModulePage" ;

const ModuleRouter = {
    path:'module',
    component:_import('index/module/ModulePage'),
    name:'module',
    meta:{
        selfCompName:'ModulePage'
    },
    children:[
        {
            path:'manager',
            component:_import('index/module/manager/ModuleManagerView'),
            name:'moduleManager',
            meta:{
                title:'模块管理',icon:"user",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'ModuleManagerView'
            }
        }
    ]
};
export default ModuleRouter ;

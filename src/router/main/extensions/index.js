const _import = require('~Router/_import_' + process.env.NODE_ENV) ;
//所挂载的 page 组件名
const parentRouterCompName = "ExtensionsPage" ;

const ExtensionsRouter = {
    path:'extensions',
    component:_import('index/extensions/ExtensionsPage'),
    name:'extensions',
    meta:{
        selfCompName:'ExtensionsPage'
    },
    children:[
        {
            path:'exceptionRecord',
            component:_import('index/extensions/exceptionRecord/ExceptionRecordView'),
            name:'exceptionRecord',
            meta:{
                title:'模块管理',icon:"close-square",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'ExceptionRecordView'
            }
        }
    ]
};
export default ExtensionsRouter ;

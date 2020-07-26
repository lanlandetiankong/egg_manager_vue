const _import = require('~Router/_import_' + process.env.NODE_ENV) ;
//所挂载的 page 组件名
const parentRouterCompName = "FormsPage" ;
import SmartFormRouter from './smartForm/index';

const FormsRouter = {
    path:'forms',
    component:_import('index/forms/FormsPage'),
    name:'forms',
    meta:{
        selfCompName:'FormsPage'
    },
    children:[
        SmartFormRouter
    ]
};
export default FormsRouter ;

const _import = require('~Router/_import_' + process.env.NODE_ENV) ;
//所挂载的 page 组件名
const parentRouterCompName = "SmartFormPage" ;

const SmartFormRouter = {
    path:'smartForm',
    component:_import('index/forms/smartForm/SmartFormPage'),
    name:'smartForm',
    meta:{
        selfCompName:'SmartFormPage'
    },
    children:[
        {
            path:'formDefinition',
            component:_import('index/forms/smartForm/formDefinition/SmartFormDefinitionView'),
            name:'formDefinition',
            meta:{
                title:'表单定义',icon:"user",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'SmartFormDefinitionView'
            }
        },
        {
            path:'formTypeDefinition',
            component:_import('index/forms/smartForm/formTypeDefinition/SmartFormTypeDefinitionView'),
            name:'formTypeDefinition',
            meta:{
                title:'表单类型',icon:"user",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'SmartFormTypeDefinitionView'
            }
        }
    ]
};
export default SmartFormRouter ;

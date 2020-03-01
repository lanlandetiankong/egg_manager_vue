const _import = require('~Router/_import_' + process.env.NODE_ENV) ;
//所挂载的 page 组件名
const parentRouterCompName = "OrganizationPage" ;

const OrganizationRouter = {
    path:'organization',
    component:_import('index/organization/OrganizationPage'),
    name:'organization',
    meta:{
        selfCompName:'OrganizationPage'
    },
    children:[
        {
            path:'tenant',
            component:_import('index/organization/tenant/TenantManagerView'),
            name:'TenantManager',
            meta:{
                title:'租户管理',icon:"user",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'TenantManagerView'
            }
        }
    ]
};
export default OrganizationRouter ;

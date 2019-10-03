const _import = require('~Router/_import_' + process.env.NODE_ENV)
const PermissionRouter = {
    path:'permission',
    component:_import('index/permission/PermissionPage'),
    name:'permission',
    children:[
        {
            path:'manager',
            component:_import('index/permission/manager/PermissionManagerView'),
            name:'permission-manager',
            meta:{title:'权限管理',icon:"user",noCache:true}
        },
        {
            path:'role/manager',
            component:_import('index/permission/role/PermissionRoleManagerView'),
            name:'permission-role_manager',
            meta:{title:'角色管理',icon:"user",noCache:true}
        }
    ]
};
export default PermissionRouter ;

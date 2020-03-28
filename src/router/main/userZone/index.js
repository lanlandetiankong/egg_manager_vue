const _import = require('~Router/_import_' + process.env.NODE_ENV)
//所挂载的 page 组件名
const parentRouterCompName = "UserZonePage" ;
const UserZoneRouter = {
    path:'userZone',
    component:_import('index/userZone/UserZonePage'),
    name:'userZone',
    meta:{
        selfCompName:'UserZonePage'
    },
    children:[
        {
            path:'center',
            component:_import('index/userZone/center/UserZoneCenterView'),
            name:'userZoneCenterView',
            meta:{
                title:'用户中心',icon:"user",keepAliveFlag:true,
                visitLimit:false ,
                parentRouterCompName,
                selfCompName:'UserZoneCenterView'
            }
        }
    ]
};
export default UserZoneRouter ;

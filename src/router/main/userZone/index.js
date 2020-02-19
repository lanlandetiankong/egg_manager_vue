const _import = require('~Router/_import_' + process.env.NODE_ENV)
const UserZoneRouter = {
    path:'userZone',
    component:_import('index/userZone/UserZonePage'),
    name:'userZone',
    children:[
        {
            path:'center',
            component:_import('index/userZone/center/UserZoneCenterView'),
            name:'userZoneCenterView',
            meta:{title:'用户中心',icon:"user",noCache:true}
        }
    ]
};
export default UserZoneRouter ;

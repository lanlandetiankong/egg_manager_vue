const _import = require('~Router/_import_' + process.env.NODE_ENV)
//所挂载的 page 组件名
const parentRouterCompName = "LoginPage" ;

const MemberLoginRouter = {
    path:'login',
    component:_import('member/login/LoginPage'),
    name:'member_login_page',
    children:[

    ]
};
export default MemberLoginRouter ;

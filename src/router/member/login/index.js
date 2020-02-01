const _import = require('~Router/_import_' + process.env.NODE_ENV)
const MemberLoginRouter = {
    path:'login',
    component:_import('member/login/LoginPage'),
    name:'member_login_page',
    children:[

    ]
};
export default MemberLoginRouter ;

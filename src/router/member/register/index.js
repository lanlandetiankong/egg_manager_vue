const _import = require('~Router/_import_' + process.env.NODE_ENV)
const MemberRegisterRouter = {
    path:'register',
    component:_import('member/register/RegisterPage'),
    name:'member_register_page',
    children:[

    ]
};
export default MemberRegisterRouter ;

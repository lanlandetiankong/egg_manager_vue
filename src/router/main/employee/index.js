const _import = require('~Router/_import_' + process.env.NODE_ENV)
const EmployeeRouter = {
    path:'employee',
    component:_import('index/employee/EmployeePage'),
    name:'employee',
    children:[
        {
            path:'info',
            component:_import('index/employee/info/EmpInfoView'),
            name:'employeeInfo',
            meta:{title:'用户信息',icon:"user",noCache:false,keepAlive:true}
        },
        {
            path:'job',
            component:_import('index/employee/job/EmpJobManagerView'),
            name:'employeeJob',
            meta:{title:'职务管理',icon:"user",noCache:false,keepAlive:true}
        }
    ]
};
export default EmployeeRouter ;

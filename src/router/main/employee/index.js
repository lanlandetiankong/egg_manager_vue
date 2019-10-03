const _import = require('~Router/_import_' + process.env.NODE_ENV)
const EmployeeRouter = {
    path:'employee',
    component:_import('index/employee/EmployeePage'),
    name:'employee',
    children:[
        {
            path:'info',
            component:_import('index/employee/info/EmpInfoView'),
            name:'employee-emp_info',
            meta:{title:'用户信息',icon:"user",noCache:true}
        },
        {
            path:'job',
            component:_import('index/employee/job/EmpJobManagerView'),
            name:'employee-emp_job',
            meta:{title:'职务管理',icon:"user",noCache:true}
        }
    ]
};
export default EmployeeRouter ;

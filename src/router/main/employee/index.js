const _import = require('~Router/_import_' + process.env.NODE_ENV)
//所挂载的 page 组件名
const parentRouterCompName = "EmployeePage" ;

const EmployeeRouter = {
    path:'employee',
    component:_import('index/employee/EmployeePage'),
    name:'employee',
    children:[
        {
            path:'info',
            component:_import('index/employee/info/EmpInfoView'),
            name:'employeeInfo',
            meta:{
                title:'用户信息',icon:"user",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'EmpInfoView'
            }
        },
        {
            path:'job',
            component:_import('index/employee/job/EmpJobManagerView'),
            name:'employeeJob',
            meta:{
                title:'职务管理',icon:"user",keepAliveFlag:true,
                parentRouterCompName,
                selfCompName:'EmpJobManagerView'
            }
        }
    ]
};
export default EmployeeRouter ;

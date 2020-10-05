const textAlignDefault = 'left' ;
const columns = [{
    title: '账号',
    align:textAlignDefault,
    dataIndex: 'account',
    key: 'account',
    sorter:true,
    scopedSlots: { customRender: 'account' },
},  {
    title: '姓名',
    align:textAlignDefault,
    dataIndex: 'nickName',
    sorter:true,
    key: 'nickName',
}, {
    title: '所属租户',
    align:textAlignDefault,
    dataIndex: 'belongTenant.name',
    sorter:true,
    key: 'belongTenant.name',
},  {
    title: '所属部门',
    align:textAlignDefault,
    dataIndex: 'belongDepartment.name',
    sorter:false,
    key: 'belongDepartment.name',
}, {
    title: '类型',
    align:textAlignDefault,
    key: 'userTypeStr',
    scopedSlots: { customRender: 'userTypeStr' },
}];


const searchFormQueryConfObj = {
    account:{
        fieldName:'account',
        matching:'like',
        value:''
    },
    nickName:{
        fieldName:'nickName',
        matching:'like',
        value:''
    },
    email:{
        fieldName:'email',
        matching:'like',
        value:''
    },
    userType:{
        fieldName:'userType',
        matching:'equals',
        value:''
    },
    belongTenantId:{
        fieldName:'defineTenantId',
        matching:'equals',
        foreignName:'userTenant',   //外表的关联查询
        value:''
    },
    belongDepartmentId:{
        fieldName:'defineDepartmentId',
        matching:'equals',
        foreignName:'userDepartment',
        value:''
    },
    locked:{
        fieldName:'locked',
        matching:'equals',
        value:''
    }
}
export const tableColumns = columns;
export const searchFormQueryConf = searchFormQueryConfObj;


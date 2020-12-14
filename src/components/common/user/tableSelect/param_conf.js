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
    dataIndex: 'userName',
    sorter:true,
    key: 'userName',
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
        matching:QueryMatchType.like,
        value:''
    },
    userName:{
        fieldName:'userName',
        matching:QueryMatchType.like,
        value:''
    },
    email:{
        fieldName:'email',
        matching:QueryMatchType.like,
        value:''
    },
    userType:{
        fieldName:'userType',
        matching:QueryMatchType.equals,
        value:''
    },
    belongTenantId:{
        fieldName:'defineTenantId',
        matching:QueryMatchType.equals,
        foreignName:'userTenant',   //外表的关联查询
        value:''
    },
    belongDepartmentId:{
        fieldName:'defineDepartmentId',
        matching:QueryMatchType.equals,
        foreignName:'userDepartment',
        value:''
    },
    locked:{
        fieldName:'locked',
        matching:QueryMatchType.equals,
        value:''
    }
}
export const tableColumns = columns;
export const searchFormQueryConf = searchFormQueryConfObj;


const textAlignDefault = 'left' ;
const columns = [{
    title: '租户名',
    align:textAlignDefault,
    dataIndex: 'name',
    key: 'name'
}, {
    title: '编码',
    align:textAlignDefault,
    dataIndex: 'code',
    key: 'code',
},  {
    title: '数据库标识',
    align:textAlignDefault,
    dataIndex: 'dbCode',
    key: 'dbCode',
}, {
    title: '备注',
    align:textAlignDefault,
    dataIndex: 'remark',
    width:300,
    key: 'remark',
}, {
    title:'操作',
    align:textAlignDefault,
    dataIndex:"operation",
    key:'operation',
    fixed:'right',
    width:100,
    scopedSlots: { customRender: 'action' }
}];


const searchFormQueryConfObj = {
    name:{
        fieldName:'name',
        matching:'like',
        value:''
    },
    code:{
        fieldName:'code',
        matching:'like',
        value:''
    },
    dbCode:{
        fieldName:'dbCode',
        matching:'like',
        value:''
    },
    remark:{
        fieldName:'remark',
        matching:'like',
        value:''
    }
}

export const tableColumns = columns;
export const searchFormQueryConf = searchFormQueryConfObj;

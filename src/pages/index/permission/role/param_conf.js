const textAlignDefault = 'left' ;
const columns = [{
    title: '角色名',
    align:textAlignDefault,
    dataIndex: 'name',
    key: 'name'
}, {
    title: '编码',
    align:textAlignDefault,
    dataIndex: 'code',
    key: 'code',
}, {
    title: '类型',
    align:textAlignDefault,
    key: 'typeStr',
    scopedSlots: { customRender: 'typeStr' },
}, {
    title:'操作',
    align:textAlignDefault,
    dataIndex:"operation",
    key:'operation',
    fixed:'right',
    width:220,
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
    type:{
        fieldName:'type',
        matching:'equals',
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


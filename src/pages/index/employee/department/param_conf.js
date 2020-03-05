const textAlignDefault = 'left' ;
const columns = [{
    title: '部门名',
    align:textAlignDefault,
    dataIndex: 'name',
    key: 'name',
}, {
    title: '编码',
    align:textAlignDefault,
    dataIndex: 'code',
    key: 'code',
},{
    title: '层级',
    align:textAlignDefault,
    dataIndex: 'level',
    key: 'level',
},{
    title: '排序',
    align:textAlignDefault,
    dataIndex: 'orderNum',
    key: 'orderNum',
},{
    title: '描述',
    align:textAlignDefault,
    dataIndex: 'description',
    key: 'description',
},{
    title:'操作',
    align:textAlignDefault,
    dataIndex:"operation",
    key:'operation',
    fixed:'right',
    width:100,
    scopedSlots: { customRender: 'action' }
}];


const searchFormQueryConfObj = {
    parentId:{
        fieldName:'parentId',
        matching:'equals',
        value:''
    },
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
    level:{
        fieldName:'level',
        matching:'equals',
        value:0
    },
    description:{
        fieldName:'description',
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


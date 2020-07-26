const textAlignDefault = 'left' ;
const columns = [{
    title: '类型名',
    align:textAlignDefault,
    dataIndex: 'name',
    key: 'name'
}, {
    title: '描述',
    align:textAlignDefault,
    dataIndex: 'description',
    key: 'description'
},{
    title: '排序',
    align:textAlignDefault,
    dataIndex: 'orderNum',
    key: 'orderNum'
},{
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


const textAlignDefault = 'left' ;
const columns = [{
    title: '标签名',
    align:textAlignDefault,
    dataIndex: 'name',
    key: 'name'
}, {
    title: '描述',
    align:textAlignDefault,
    dataIndex: 'description',
    key: 'description',
}, {
    title: '序号',
    align:textAlignDefault,
    dataIndex: 'ordering',
    key: 'ordering'
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


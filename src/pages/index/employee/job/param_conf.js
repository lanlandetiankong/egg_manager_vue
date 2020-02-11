const textAlignDefault = 'left' ;
const columns = [{
    title: '职务名',
    align:textAlignDefault,
    dataIndex: 'name',
    key: 'name',
}, {
    title: '类型',
    align:textAlignDefault,
    key: 'typeStr',
    scopedSlots: { customRender: 'typeStr' },
},{
    title: '描述',
    align:textAlignDefault,
    dataIndex: 'description',
    key: 'description',
}, {
    title: '备注',
    align:textAlignDefault,
    dataIndex: 'remark',
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
    type:{
        fieldName:'type',
        matching:'equals',
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


const textAlignDefault = 'left' ;
const columns = [{
    title: '权限名',
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


export const tableColumns = columns;


const textAlignDefault = 'left' ;
const columns = [{
    title: '账号',
    align:textAlignDefault,
    dataIndex: 'account',
    key: 'account',
    sorter:true,
    scopedSlots: { customRender: 'account' },
}, {
    title: '姓名',
    align:textAlignDefault,
    dataIndex: 'nickName',
    key: 'nickName',
}, {
    title: '邮箱',
    align:textAlignDefault,
    dataIndex: 'email',
    key: 'email',
}, {
    title: '类型',
    align:textAlignDefault,
    key: 'userTypeStr',
    scopedSlots: { customRender: 'userTypeStr' },
}, {
    title:'操作',
    align:textAlignDefault,
    dataIndex:"operation",
    key:'operation',
    fixed:'right',
    width:100,
    scopedSlots: { customRender: 'action' }
}];

const columnstest = [{
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
}, {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
}];


const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];

export const tableColumns = columns;
export const tableData = data;


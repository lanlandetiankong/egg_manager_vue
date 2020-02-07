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
    }
}
export const tableColumns = columns;
export const searchFormQueryConf = searchFormQueryConfObj;


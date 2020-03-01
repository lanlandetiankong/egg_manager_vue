const textAlignDefault = 'left' ;
const columns = [{
    title: '标题',
    align:textAlignDefault,
    dataIndex: 'title',
    key: 'title',
    width:100,
}, {
    title: '关键字',
    align:textAlignDefault,
    dataIndex: 'keyWord',
    key: 'keyWord',
    width:100,
},{
    title: '标签',
    align:textAlignDefault,
    key: 'tagNames',
    width:150,
    scopedSlots: { customRender: 'tagNamesRender' },
}, {
    title: '内容',
    align:textAlignDefault,
    dataIndex: 'shortContent',
    width:300,
    key: 'shortContent',
},  {
    title: '发布部门',
    align:textAlignDefault,
    dataIndex: 'publishDepartment',
    width:100,
    key: 'publishDepartment',
}, {
    title:'操作',
    key:'operation',
    width: 100,
    scopedSlots: { customRender: 'action' }
}];


const searchFormQueryConfObj = {
    title:{
        fieldName:'title',
        matching:'like',
        value:''
    },
    keyWord:{
        fieldName:'keyWord',
        matching:'like',
        value:''
    },
    tagIds:{
        fieldName:'tagIds',
        matching:'like',
        value:''
    },
    content:{
        fieldName:'content',
        matching:'like',
        value:''
    }
}

export const tableColumns = columns;
export const searchFormQueryConf = searchFormQueryConfObj;

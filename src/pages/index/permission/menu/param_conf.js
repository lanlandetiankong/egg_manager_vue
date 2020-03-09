const textAlignDefault = 'left' ;
const columns = [{
    title: '菜单名',
    align:textAlignDefault,
    dataIndex: 'menuName',
    key: 'menuName',
    width:100,
},{
    title: '图标',
    align:textAlignDefault,
    dataIndex: 'iconName',
    key: 'iconName',
    scopedSlots:{
        customRender:'iconRender'
    },
    width:60
},{
    title: '标注',
    align:textAlignDefault,
    dataIndex: 'label',
    key: 'label',
    width:70
},{
    title: '层级',
    align:textAlignDefault,
    dataIndex: 'level',
    key: 'level',
    width:70
},{
    title: 'Url跳转类型',
    align:textAlignDefault,
    dataIndex: 'urlJumpTypeStr',
    key: 'urlJumpTypeStr',
    width:120,
    scopedSlots:{
        customRender:'urlJumpTypeStrRender'
    }
},{
    title: '路由Url',
    align:textAlignDefault,
    dataIndex: 'routerUrl',
    key: 'routerUrl',
    width:140
},{
    title: '外部Url',
    align:textAlignDefault,
    dataIndex: 'hrefUrl',
    key: 'hrefUrl',
    width:140
},{
    title: '排序',
    align:textAlignDefault,
    dataIndex: 'orderNum',
    key: 'orderNum',
    width:70
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
    menuName:{
        fieldName:'menuName',
        matching:'like',
        value:''
    },
    parentId:{
        fieldName:'parentId',
        matching:'equals',
        value:''
    },
    label:{
        fieldName:'label',
        matching:'like',
        value:''
    },
    routerUrl:{
        fieldName:'routerUrl',
        matching:'like',
        value:''
    },
    hrefUrl:{
        fieldName:'hrefUrl',
        matching:'like',
        value:''
    },
    urlJumpType:{
        fieldName:'urlJumpType',
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


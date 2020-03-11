/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const AnnouncementDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"title",
            fieldName:"标题",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"keyWord",
            fieldName:"关键字",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"tagNameOfStr",
            fieldName:"标签",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"content",
            fieldName:"内容",
            type:DrawerFieldTypeEnum.HtmlDom
        },
        {
            fieldKey:"publishDepartment",
            fieldName:"发布部门",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserNickName,
        CommonFieldConfArr.lastModifyerNickName,
        CommonFieldConfArr.createDate,
        CommonFieldConfArr.updateTime,
    ]

}


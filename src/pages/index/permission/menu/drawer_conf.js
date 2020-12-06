/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const DefineMenuDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"menuName",
            fieldName:"菜单名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"parentMenuName",
            fieldKeySplitArr:['parentMenu','menuName'],
            fieldName:"上级菜单名",
            type:DrawerFieldTypeEnum.String,
            isNeedSplit:true
        },
        {
            fieldKey:"iconName",
            fieldName:"图标",
            type:DrawerFieldTypeEnum.Icon
        },
        {
            fieldKey:"label",
            fieldName:"标注",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"level",
            fieldName:"层级",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"urlJumpTypeStr",
            fieldName:"Url跳转类型",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"routerUrl",
            fieldName:"路由Url",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"hrefUrl",
            fieldName:"外部Url",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"orderNum",
            fieldName:"排序",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserName,
        CommonFieldConfArr.lastModifyerName,
        CommonFieldConfArr.createDate,
        CommonFieldConfArr.updateTime
    ]

}


/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const DefinePermissionDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"name",
            fieldName:"权限名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"code",
            fieldName:"编码",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"typeStr",
            fieldName:"类型",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserName,
        CommonFieldConfArr.lastModifyerName,
        CommonFieldConfArr.createDate,
        CommonFieldConfArr.updateTime
    ]

}


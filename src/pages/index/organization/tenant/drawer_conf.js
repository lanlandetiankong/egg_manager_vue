/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const DefineTenantDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"name",
            fieldName:"租户名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"code",
            fieldName:"编码",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"dbCode",
            fieldName:"数据库标识",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserNickName,
        CommonFieldConfArr.lastModifyerNickName,
        CommonFieldConfArr.createDate,
        CommonFieldConfArr.updateTime
    ]

}


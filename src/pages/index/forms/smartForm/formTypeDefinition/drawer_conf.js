/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const SmartFormTypeDefintionDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"name",
            fieldName:"类型名",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.description,
        {
            fieldKey:"orderNum",
            fieldName:"排序",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserNickNameOfMO,
        CommonFieldConfArr.lastModifyerNickNameOfMO,
        CommonFieldConfArr.createDateOfMO,
        CommonFieldConfArr.updateTimeOfMO
    ]

}


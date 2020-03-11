
var employeeInfoDetailKeyMap = new Map();
/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const EmployeeInfoDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"account",
            fieldName:"账号",
            visible:true,
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"nickName",
            fieldName:"姓名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"userTypeStr",
            fieldName:"用户类型",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"locked",
            fieldName:"是否锁定",
            type:DrawerFieldTypeEnum.Enum,
            enumValMap:{
                "1":"已锁定",
                "0":"未锁定"
            }
        },
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserNickName,
        CommonFieldConfArr.lastModifyerNickName,
        CommonFieldConfArr.createDate,
        CommonFieldConfArr.updateTime
    ]
}


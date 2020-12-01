/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const EmployeeDepartmentDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"name",
            fieldName:"部门名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"parentDepartmentName",
            fieldKeySplitArr:['parentDepartment','name'],
            fieldName:"上级部门名",
            type:DrawerFieldTypeEnum.String,
            isNeedSplit:true
        },
        {
            fieldKey:"code",
            fieldName:"编码",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"level",
            fieldName:"层级",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"orderNum",
            fieldName:"排序",
            type:DrawerFieldTypeEnum.String
        },
        CommonFieldConfArr.description,
        CommonFieldConfArr.remark,
        CommonFieldConfArr.createUserName,
        CommonFieldConfArr.lastModifyerName,
        CommonFieldConfArr.createDate,
        CommonFieldConfArr.updateTime
    ]

}


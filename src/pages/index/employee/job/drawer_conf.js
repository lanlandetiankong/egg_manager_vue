import {
    CommonFieldConfArr,
    DrawerFieldTypeEnum,
    FieldUndefinedMsgConf
} from "@/components/index/common/drawer/drawer_define";

var employeeInfoDetailKeyMap = new Map();
/*
 *  showKeyArr=>
 *      showKeyArr:要展示的字段属性id
 *      keyNameMapObj配置的字段属性id与名字的map映射
 *
 */
export  const EmployeeJobDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"name",
            fieldName:"职务名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"typeStr",
            fieldName:"类型",
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


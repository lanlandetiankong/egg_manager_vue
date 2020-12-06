/*
 *  具体配置参考在 /src/components/index/common/drawer/drawer_example.js
 */

import {CommonFieldConfArr,DrawerFieldTypeEnum,CommonDateFormatTypeEnum,FieldUndefinedMsgConf} from '~Components/index/common/drawer/drawer_define.js'

export  const AnnouncementTagDetailDrawerConf = {
    msgConf:{
        undefinedEnum:FieldUndefinedMsgConf.undefinedEnumKeyValue
    },
    showFieldArr:[
        {
            fieldKey:"name",
            fieldName:"标签名",
            type:DrawerFieldTypeEnum.String
        },
        {
            fieldKey:"ordering",
            fieldName:"序号",
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


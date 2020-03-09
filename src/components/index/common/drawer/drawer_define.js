var CommonDateFormatTypeObj = {
    yMdhms:"yyyy-MM-dd hh:mm:ss",
    yMdhms_cn:"yyyy年MM月dd日 hh:mm:ss",
}

export const DrawerFieldTypeEnum = {
    String:"string",
    Date:"date",
    Enum:"enum",
    Icon:"icon",
    HtmlDom:"htmlDom"
}


/**
 * 通用的字段配置
 */
export const CommonFieldConfArr = {
    fid:{
        fieldKey:"fid",
        fieldName:"id",
        type:DrawerFieldTypeEnum.String
    },
    description:{
        fieldKey:"description",
        fieldName:"描述",
        type:DrawerFieldTypeEnum.String,
        visible:true
    },
    remark:{
        fieldKey:"remark",
        fieldName:"备注",
        type:DrawerFieldTypeEnum.Date,
        visible:true,
        format:{
            date:CommonDateFormatTypeObj.yMdhms_cn
        }
    },
    createDate:{
        fieldKey:"createTime",
        fieldName:"创建日期",
        type:DrawerFieldTypeEnum.Date,
        visible:true,
        format:{
            date:CommonDateFormatTypeObj.yMdhms_cn
        }
    },
    updateDate:{
        fieldKey:"createTime",
        fieldName:"创建日期",
        type:DrawerFieldTypeEnum.Date,
        visible:true,
        format:{
            date:CommonDateFormatTypeObj.yMdhms_cn
        }
    },
}


export const FieldUndefinedMsgConf = {
    undefinedEnumKeyValue:"预期之外的枚举值"
}

export const CommonDateFormatTypeEnum = CommonDateFormatTypeObj;

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

export const QueryMatchType = {
    like:'like',
    equals:'equals'
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
    updateTime:{
        fieldKey:"updateTime",
        fieldName:"最后更新日期",
        type:DrawerFieldTypeEnum.Date,
        visible:true,
        format:{
            date:CommonDateFormatTypeObj.yMdhms_cn
        }
    },
    createUserName:{
        fieldKey:"createUserName",
        fieldKeySplitArr:['createUser','userName'],
        fieldName:"创建人",
        type:DrawerFieldTypeEnum.String,
        isNeedSplit:true
    },
    lastModifyerName:{
        fieldKey:"lastModifyerName",
        fieldKeySplitArr:['lastModifyer','userName'],
        fieldName:"最后修改人",
        type:DrawerFieldTypeEnum.String,
        isNeedSplit:true
    },
    createDateOfMO:{
        fieldKey:"createTime",
        fieldName:"创建日期",
        type:DrawerFieldTypeEnum.Date,
        visible:true,
        format:{
            date:CommonDateFormatTypeObj.yMdhms_cn
        }
    },
    updateTimeOfMO:{
        fieldKey:"lastModifiedDate",
        fieldName:"最后更新日期",
        type:DrawerFieldTypeEnum.Date,
        visible:true,
        format:{
            date:CommonDateFormatTypeObj.yMdhms_cn
        }
    },
    createUserNameOfMO:{
        fieldKey:"createUserName",
        fieldName:"创建人",
        type:DrawerFieldTypeEnum.String
    },
    lastModifyerNameOfMO:{
        fieldKey:"lastModifyerName",
        fieldName:"最后修改人",
        type:DrawerFieldTypeEnum.String
    }

}


export const FieldUndefinedMsgConf = {
    undefinedEnumKeyValue:"预期之外的枚举值"
}

export const CommonDateFormatTypeEnum = CommonDateFormatTypeObj;
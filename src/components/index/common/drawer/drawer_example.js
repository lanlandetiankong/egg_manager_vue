
var employeeInfoDetailKeyMap = new Map();
/*
 *  showKeyArr=>
 *      showKeyArr:要展示的字段属性id
 *      keyNameMapObj配置的字段属性id与名字的map映射
 *
 */
const defaultDateFormat = "yyyy-MM-dd hh:mm:ss" ;
import {DrawerFieldTypeEnum} from '~Components/index/common/drawer/drawer_define.js'

export  const DrawerFieldConfExample = {
    undefinedKeyName:"未定义属性",
    undefinedEnumKeyValue:"预期之外的枚举值",
    showKeyArrs:['name','code',"level","weights","description","remark","createTime","updateTime"],
    keyNameMapObj:{
        fid:"id",
        name:"部门名",
        code:"编码",
        level:"层级",
        weights:"排序",
        description:"描述",
        remark:"备注",
        createTime:"创建时间",
        updateTime:"更新时间",
    },
    keyEnumValMapObj:{

    },
    dateValFormatMapObj:{   //日期类型格式化展示
        createTime:defaultDateFormat,
        updateTime:defaultDateFormat
    },

    showKeyArr:[
        {
            fieldId:"createTime",
            fieldName:"",
            type:DrawerFieldTypeEnum.Date,
            enumMap:{},
            format:{
                date:defaultDateFormat
            }
        }
    ]

}


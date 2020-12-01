
var employeeInfoDetailKeyMap = new Map();
/*
 *  showKeyArr=>
 *      showKeyArr:要展示的字段属性id
 *      keyNameMapObj配置的字段属性id与名字的map映射
 *
 */
export  const EmployeeInfoDetailDrawerConf = {
    undefinedKeyName:"未定义属性",
    undefinedEnumKeyValue:"预期之外的枚举值",
    showKeyArr:['account','userName',"email","userTypeStr","locked","remark","remark","remark","remark","remark","remark"],
    keyNameMapObj:{
        fid:"id",
        account:"账号",
        userName:"姓名",
        userTypeStr:"用户类型",
        locked:"是否锁定",
        remark:"备注",
    },
    keyEnumValMapObj:{
        locked:{
            1:"已锁定",
            0:"未锁定"
        }
    }

}


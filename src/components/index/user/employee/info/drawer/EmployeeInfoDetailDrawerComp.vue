<template>
    <div>
        <a-list itemLayout="horizontal" :dataSource="dataObjArr">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                    :description="item.fieldVal"
                >
                    <a-tag color="blue" slot="title">{{item.fieldName}}</a-tag>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
    import {EmployeeInfoDetailDrawerConf} from './drawer_conf'
    export default {
        name: "EmployeeInfoDetailDrawerComp",
        props: {
            dataObj: Object,
            visible:Boolean
        },
        data() {
            return {
            };
        },
        methods: {
            dealGetDataObjKeyValFromEnum(fieldKey,fieldVal,fieldName){  //尝试从enum中取得该值在枚举的映射值，如果没有为该key配置枚举映射则会返回原值
                var keyEnumValMapObj = EmployeeInfoDetailDrawerConf.keyEnumValMapObj;
                var undefinedEnumKeyValue = EmployeeInfoDetailDrawerConf.undefinedEnumKeyValue;
                var fieldValTemp = typeof fieldVal == "undefined" ? "" : fieldVal ;
                if(typeof keyEnumValMapObj != "undefined" && keyEnumValMapObj != null){
                    var enumObj = keyEnumValMapObj[fieldKey];
                    if(typeof enumObj != "undefined" && enumObj != null){
                        var enumVal = enumObj[fieldVal];    //匹配枚举类型的值
                        if(typeof enumVal == "undefined"){
                            fieldValTemp = undefinedEnumKeyValue ;
                        }   else {
                            fieldValTemp = enumVal;
                        }
                    }
                }
                return fieldValTemp ;
            },
            dealDataObjToArr(obj){  //将object转化为展示的数组
                var dataObjArr = [] ;
                if(typeof EmployeeInfoDetailDrawerConf != "undefined" && EmployeeInfoDetailDrawerConf != null){
                    var showKeyArr = EmployeeInfoDetailDrawerConf.showKeyArr;
                    var keyNameMapObj = EmployeeInfoDetailDrawerConf.keyNameMapObj;
                    var undefinedKeyName = EmployeeInfoDetailDrawerConf.undefinedKeyName;
                    if(typeof showKeyArr != "undefined" && showKeyArr != null){
                        for (var i in showKeyArr){
                            var fieldKey = showKeyArr[i] ;
                            var fieldName = keyNameMapObj[fieldKey] ;
                            var fieldVal = obj[fieldKey];
                            if(typeof fieldName == "undefined"){
                                fieldName = undefinedKeyName;
                                console.warn(undefinedKeyName+" -> fieldKey="+fieldKey);
                            }
                            fieldVal = this.dealGetDataObjKeyValFromEnum(fieldKey,fieldVal,fieldName);
                            dataObjArr.push({
                                fieldKey:fieldKey,
                                fieldName:fieldName,
                                fieldVal:fieldVal,
                            })
                        }
                    }
                }
                return dataObjArr ;
            }
        },
        computed:{
            dataObjArr(){
                var dataObjTemp = this.dataObj ;
                var dataObjArr = [] ;
                if(dataObjTemp){
                    dataObjArr = this.dealDataObjToArr(dataObjTemp);
                }
                return dataObjArr;
            }
        }
    }
</script>
<style>

</style>

<template>
    <div>
        <a-list itemLayout="horizontal" :dataSource="dataObjArr">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                    :key="item.fieldKey"
                >
                    <a-tag :color="item.hasError === false ? 'blue' : '#f50'"
                           slot="title">
                        {{item.fieldName}}
                    </a-tag>
                    <span slot="description">
                        <template v-if="item.hasError === true">    <!-- 异常处理 -->
                            <a-tag color="#f50">
                                Error: {{item.errorMsg}}
                            </a-tag>
                        </template>
                        <template v-else>
                            <template v-if="item.fieldType == 'icon'">      <!-- 图标展示 -->
                                <a-icon :type="item.fieldVal"/>
                            </template>
                            <template v-else-if="item.fieldType == 'htmlDom'">  <!--htmlDom 内容-->
                                <div v-html="item.fieldVal">
                                </div>
                            </template>
                            <template v-else>
                                {{item.fieldVal}}
                            </template>
                        </template>
                    </span>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
    import {DrawerFieldTypeEnum,CommonDateFormatTypeEnum} from '~Components/index/common/drawer/drawer_define.js'

    import BeeUtil from '~Assets/js/util/bee/BeeUtil.js'
    export default {
        name: "SimpleDetailDrawerComp",
        props: {
            dataObj: Object,
            visible:Boolean,
            drawerFieldConf:Object
        },
        data() {
            return {
            };
        },
        methods: {
            dealEmptyToDefaultVal(checkVal,ifEmptyVal){
                if(typeof checkVal == "undefined" || checkVal == null || (typeof checkVal == "string" && checkVal =="")){
                    return ifEmptyVal;
                }   else {
                    return checkVal ;
                }
            },
            dealGetFieldObjFromConf(fieldConfObj,fieldVal){  //尝试从配置中取得 fieldVal的 其他处理方式后
                var _this = this;
                var fieldResObj = {     //默认的返回对象
                    fieldKey:fieldConfObj.fieldKey,
                    fieldName:fieldConfObj.fieldName,
                    fieldVal:fieldVal,
                    fieldType:fieldConfObj.type,
                    hasError:false,
                    errorMsg:""
                };
                // ==> 字段值的temp及格式化处理
                var fieldValTemp = typeof fieldVal == "undefined" ? "" : fieldVal ;
                var fieldType = fieldConfObj.type;
                if(typeof fieldType != "undefined" && fieldType != null){
                    if(DrawerFieldTypeEnum.Enum == fieldType){    //枚举类型
                        var enumValMap = fieldConfObj.enumValMap ;
                        if(typeof enumValMap != "undefined" && enumValMap != null){
                            fieldValTemp = enumValMap[fieldVal] ;
                            if(typeof fieldValTemp == "undefined"){
                                fieldResObj.hasError = true ;
                                fieldResObj.errorMsg = _this.drawerFieldConf.msgConf.undefinedEnum ;
                            }
                        }
                    }   else if(DrawerFieldTypeEnum.Date == fieldType){ //日期类型
                        var fieldFormatConf = fieldConfObj.format ;
                        if(typeof fieldFormatConf != "undefined" && fieldFormatConf != null){
                            var dateFormatFlag = false ;  //是否可被格式化为日期
                            if(typeof fieldVal == "number"){
                                dateFormatFlag = true;
                            }
                            if(dateFormatFlag === true){
                                var fieldDateFormat = fieldFormatConf.date ;
                                fieldDateFormat = typeof fieldDateFormat != "undefined" ? fieldDateFormat : CommonDateFormatTypeEnum.yMdhms_cn ;
                                fieldValTemp = BeeUtil.DateUtils.format(fieldVal,fieldDateFormat);
                            }
                        }
                    }
                }
                fieldResObj.fieldVal = fieldValTemp ;
                return fieldResObj ;
            },
            dealDataObjToArr(obj){  //将object转化为展示的数组
                var dataObjArr = [] ;
                if(typeof this.drawerFieldConf != "undefined" && this.drawerFieldConf != null){
                    var showFieldArr = this.drawerFieldConf.showFieldArr;
                    var keyNameMapObj = this.drawerFieldConf.keyNameMapObj;
                    var undefinedKeyName = this.drawerFieldConf.undefinedKeyName;
                    if(typeof showFieldArr != "undefined" && showFieldArr != null){
                        for (var i in showFieldArr){
                            var fieldConfObj = showFieldArr[i] ;
                            var visibleVal = this.dealEmptyToDefaultVal(fieldConfObj.visible,true);
                            if(visibleVal === true){
                                //console.log("fieldConfObj",fieldConfObj);
                                var fieldVal = obj[fieldConfObj.fieldKey];
                                var fieldResObj = fieldVal = this.dealGetFieldObjFromConf(fieldConfObj,fieldVal);
                                dataObjArr.push(fieldResObj);
                            }
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

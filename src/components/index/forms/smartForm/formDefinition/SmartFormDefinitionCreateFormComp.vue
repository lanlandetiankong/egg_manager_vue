<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            :title="modalCompTitle"
            :okText="modalCompOkTest"
            cancelText="取消"
            @cancel="() => { $emit('createFormCancel')}"
            @ok="() => { $emit('createFormSubmit')}"
        >
            <a-form
                layout="horizontal"
                :form="smartFormDefinitionCreateForm"
            >
                <a-form-item label="表单名称"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.name"/>
                </a-form-item>
                <a-form-item label="表单标题"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.title"/>
                </a-form-item>
                <a-form-item label="表单类型"
                             v-bind="formItemLayout"
                >
                    <a-select showSearch allowClear
                              placeholder="请选择"
                              optionFilterProp="children"
                              :options="formTypeList"
                              :filterOption="getSelectCommonFilterOption"
                              v-decorator="formFieldConf.formTypeId"
                    >
                    </a-select>
                </a-form-item>
                <a-form-item label="描述"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.description"/>
                </a-form-item>
                <a-form-item label="排序值"
                             v-bind="formItemLayout"
                >
                    <a-input-number v-decorator="formFieldConf.orderNum"/>
                </a-form-item>
                <a-form-item label="备注"
                     v-bind="formItemLayout"
                >
                    <a-textarea v-decorator="formFieldConf.remark"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ATextarea from "ant-design-vue/es/input/TextArea";

    import {SmartFormDefinitionCreateFormApi} from './smartFormDefinitionCompsApi'

    export default {
        name: "formTypeList",
        components: {ATextarea, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object,
            formTypeList:Array
        },
        data(){
            var paramsRules ={
                name:[
                    {required:true,message:'请填写表单名称!'}
                ],
                title:[
                    {required:true,message:'请填写标题!'}
                ],
                formTypeId:[
                    {required:true,message:'请选择表单类型!'}
                ],
                description:[
                    {required:true,message:'请填写描述!'}
                ],
                orderNum:[
                    {required:true,message:'请填写排序值!'}
                ],
                remark:[
                    {required:false,message:'请填写备注!'}
                ]
            };
            return {
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 4 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 20 },
                    },
                },
                formFieldConf:{
                    name:["name",{rules:paramsRules.name}],
                    title:["title",{rules:paramsRules.title}],
                    formTypeId:["formTypeId",{rules:paramsRules.formTypeId}],
                    description:["description",{rules:paramsRules.description}],
                    orderNum:["orderNum",{rules:paramsRules.orderNum}],
                    remark:["remark",{rules:paramsRules.remark}]
                },
                smartFormDefinitionCreateForm:{},
                formValObj:{},
                treeSelectConf:{
                    parentId:{
                        treeDefaultExpandAll:false,
                        treeNodeFilterProp:"title",
                        selftTreeData:[]
                    }
                }
            }
        },
        methods:{
            getSelectCommonFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealUpdateFormValue(formObj){
                var _this = this ;
                _this.formValObj = _this.formObj ;
               if(typeof _this.smartFormDefinitionCreateForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                   _this.smartFormDefinitionCreateForm.updateFields({
                       name: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.name,
                       }),
                       title: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.title,
                       }),
                       formTypeId: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.formTypeId,
                       }),
                       description: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.description,
                       }),
                       orderNum: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.orderNum,
                       }),
                       remark: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.remark,
                       })
                   });
               }
            }

        },
        computed:{
            modalCompTitle() {
                return "create" == this.actionType ?  "创建新表单类型" : "更新表单类型信息" ;
            },
            modalCompOkTest(){
                return "create" == this.actionType ?  "创建" : "更新" ;
            }
        },
        created(){
            var _this = this ;
            _this.smartFormDefinitionCreateForm = this.$form.createForm(_this,{
                name:'SmartFormDefinitionCreateForm',
                onFieldsChange: (_, changedFields) => {     //表单字段发生修改
                    if(changedFields){
                        var formValObjTemp = _this.formValObj ;
                        const changeFieldNames = Object.keys(changedFields) ;
                        if(changeFieldNames && changeFieldNames.length > 0){
                            for(var i=0;i<changeFieldNames.length;i++){
                                //当前修改的字段名
                                var changeFieldNameTemp = changeFieldNames[i] ;
                                var fieldChangeObj = changedFields[changeFieldNameTemp];
                                if(fieldChangeObj){
                                    formValObjTemp[changeFieldNameTemp] = fieldChangeObj.value;
                                }
                            }
                        }
                        _this.formValObj = formValObjTemp ;
                    }
                    //通知给父组件
                    this.$emit('change', changedFields);
                },
                mapPropsToFields:() =>{
                    //console.log(_this.formObj);
                    return {
                        name: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.name
                        }),
                        title: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.title
                        }),
                        formTypeId: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.formTypeId
                        }),
                        description: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.description
                        }),
                        orderNum: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.orderNum
                        }),
                        remark: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.remark
                        }),
                    }
                }
            });
        },
        mounted(){
        },
        watch:{
            formObj: {
                handler (val, oval) {
                    debugger;
                    var _this = this ;
                    _this.dealUpdateFormValue(val);
                },
                deep: true,
                immediate:true
            },
            visible:{
                handler(val,oval){  //隐藏与展示弹窗时监听
                    debugger;
                    var _this = this ;
                    if(val === true){
                        if("create" == _this.actionType){   //打开=>创建

                        }   else if("update" == _this.actionType){  //打开=>更新

                        }
                    }   else {  //弹窗关闭
                        //console.log("弹窗展示状态变更:关闭");
                    }
                },
                immediate:true
            }
        }
    }
</script>

<style scoped>

</style>

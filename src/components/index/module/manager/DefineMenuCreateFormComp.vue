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
                layout="vertical"
                :form="defineMenuCreateForm"
            >
                <a-form-item label="上级菜单">
                    <a-tree-select
                        placeholder="选择上级菜单"
                        showSearch allowClear
                        :treeNodeFilterProp="treeSelectConf.parentId.treeNodeFilterProp"
                        :treeDefaultExpandAll="treeSelectConf.parentId.treeDefaultExpandAll"
                        v-decorator="formFieldConf.parentId"
                        :treeData="parentSelectTrees"
                        @change="handleParentTreeOfSearchChange"
                    >
                    </a-tree-select>
                </a-form-item>
                <a-form-item label="菜单名"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.menuName"/>
                </a-form-item>
                <a-form-item label="图标"
                             v-bind="formItemLayout"
                >
                    <span>
                        <a target="_blank" href="https://www.antdv.com/components/icon-cn/">点击查看可选图标</a>
                        <span v-show="typeof formValObj.iconName != 'undefined' && formValObj.iconName.length > 0">
                            (已选图标:&nbsp;&nbsp; <a-icon :type="formValObj.iconName"/> &nbsp;&nbsp;)
                        </span>
                    </span>
                    <a-input v-decorator="formFieldConf.iconName"/>
                </a-form-item>
                <a-form-item label="标注"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.label"/>
                </a-form-item>
                <a-form-item label="排序值"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.orderNum"/>
                </a-form-item>
                <a-form-item label="跳转类型"
                             v-bind="formItemLayout"
                >
                    <a-select showSearch allowClear
                              placeholder="请选择"
                              optionFilterProp="children"
                              :options="menuUrlJumpTypes"
                              :filterOption="getMenuTypeFilterOption"
                              v-decorator="formFieldConf.urlJumpType"
                    >
                    </a-select>
                </a-form-item>
                <a-form-item label="路由Url"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.routerUrl"/>
                </a-form-item>
                <a-form-item label="外部Url"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.hrefUrl"/>
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
    export default {
        name: "DefineMenuCreateFormComp",
        components: {ATextarea, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object,
            menuUrlJumpTypes:Array,
            parentSelectTrees:Array

        },
        data(){
            var paramsRules ={
                menuName:[
                    {required:true,message:'请填写菜单名!'}
                ],
                iconName:[
                    {required:true,message:'请填写图标名!'}
                ],
                parentId:[
                    {required:false,message:'请选择上级菜单!'}
                ],
                label:[
                    {required:false,message:'请填写标识!'}
                ],
                urlJumpType:[
                    {required:true,message:'请选择Url跳转类型!'}
                ],
                routerUrl:[
                    {required:false,message:'请填写路由Url!'}
                ],
                hrefUrl:[
                    {required:false,message:'请填写外部Url!'}
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
                    menuName:["menuName",{rules:paramsRules.menuName}],
                    iconName:["iconName",{rules:paramsRules.iconName}],
                    parentId:["parentId",{rules:paramsRules.parentId}],
                    label:["label",{rules:paramsRules.label}],
                    orderNum:["orderNum",{rules:paramsRules.orderNum}],
                    urlJumpType:["urlJumpType",{rules:paramsRules.urlJumpType}],
                    routerUrl:["routerUrl",{rules:paramsRules.routerUrl}],
                    hrefUrl:["hrefUrl",{rules:paramsRules.hrefUrl}],
                    remark:["remark",{rules:paramsRules.remark}]
                },
                defineMenuCreateForm:{},
                formValObj:{},
                treeSelectConf:{
                    parentId:{
                        treeDefaultExpandAll:false,
                        treeNodeFilterProp:"title",
                    }
                }
            }
        },
        methods:{
            getMenuTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealUpdateFormValue(formObj){
                var _this = this ;
                _this.formValObj = _this.formObj ;
               if(typeof _this.defineMenuCreateForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                   _this.defineMenuCreateForm.updateFields({
                       menuName: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.menuName,
                       }),
                       iconName: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.iconName,
                       }),
                       parentId: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.parentId,
                       }),
                       label: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.label,
                       }),
                       orderNum: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.orderNum,
                       }),
                       urlJumpType: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.urlJumpType,
                       }),
                       routerUrl: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.routerUrl,
                       }),
                       hrefUrl: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.hrefUrl,
                       }),
                       remark: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.remark,
                       })
                   });
               }
            },
            handleParentTreeOfSearchChange(value){  //[上级菜单] SelectTree cchange事件
                console.log("handleParentTreeOfSearchChange",value);
            },
        },
        computed:{
            modalCompTitle() {
                return "create" == this.actionType ?  "创建新菜单" : "更新菜单信息" ;
            },
            modalCompOkTest(){
                return "create" == this.actionType ?  "创建" : "更新" ;
            }
        },
        created(){
            var _this = this ;
            _this.defineMenuCreateForm = this.$form.createForm(_this,{
                name:'DefineMenuCreateForm',
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
                        menuName: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.menuName
                        }),
                        iconName: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.iconName
                        }),
                        parentId: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.parentId
                        }),
                        label: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.label
                        }),
                        orderNum: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.orderNum
                        }),
                        urlJumpType: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.urlJumpType
                        }),
                        routerUrl: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.routerUrl
                        }),
                        hrefUrl: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.hrefUrl
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
                    var _this = this ;
                    _this.dealUpdateFormValue(val);
                },
                deep: true,
                immediate:true
            }
        }
    }
</script>

<style scoped>

</style>

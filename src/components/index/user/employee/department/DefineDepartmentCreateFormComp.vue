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
                :form="defineDepartmentCreateForm"
            >
                <a-form-item label="上级部门">
                    <a-tree-select
                        placeholder="选择上级部门"
                        showSearch allowClear
                        :treeNodeFilterProp="treeSelectConf.parentId.treeNodeFilterProp"
                        :treeDefaultExpandAll="treeSelectConf.parentId.treeDefaultExpandAll"
                        v-decorator="formFieldConf.parentId"
                        :treeData="parentSelectTrees"
                        @change="handleParentTreeOfSearchChange"
                    >
                    </a-tree-select>
                </a-form-item>
                <a-form-item label="部门名"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.name"/>
                </a-form-item>
                <a-form-item label="编码"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.code"/>
                </a-form-item>
                <a-form-item label="排序"
                             v-bind="formItemLayout"
                >
                    <a-input-number v-decorator="formFieldConf.orderNum"/>
                </a-form-item>
                <a-form-item label="描述"
                             v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.description"/>
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
        name: "DefineDepartmentCreateFormComp",
        components: {ATextarea, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object,
            parentSelectTrees:Array
        },
        data(){
            var paramsRules ={
                parentId:[
                    {required:false,message:'请选择上级部门!'}
                ],
                name:[
                    {required:true,message:'请填写部门名!'}
                ],
                code:[
                    {required:true,message:'请填写编码!'}
                ],
                orderNum:[
                    {required:true,message:'请填写排序字段!'}
                ],
                description:[
                    {required:false,message:'请填写描述!'}
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
                    parentId:["parentId",{rules:paramsRules.parentId}],
                    name:["name",{rules:paramsRules.name}],
                    code:["code",{rules:paramsRules.code}],
                    orderNum:["orderNum",{rules:paramsRules.orderNum}],
                    description:["description",{rules:paramsRules.description}],
                    remark:["remark",{rules:paramsRules.remark}]
                },
                defineDepartmentCreateForm:{},
                treeSelectConf:{
                    parentId:{
                        treeDefaultExpandAll:false,
                        treeNodeFilterProp:"title",
                    }
                }
            }
        },
        methods:{
            dealUpdateFormValue(formObj){
                var _this = this ;
               if(typeof _this.defineDepartmentCreateForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                   _this.defineDepartmentCreateForm.updateFields({
                       parentId: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.parentId,
                       }),
                       name: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.name,
                       }),
                       code: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.code,
                       }),
                       orderNum: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.orderNum,
                       }),
                       description: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.description,
                       }),
                       remark: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.remark,
                       })
                   });
               }
            },
            handleParentTreeOfSearchChange(value){  //[上级部门] SelectTree cchange事件
                console.log("handleParentTreeOfSearchChange",value);
            },
        },
        computed:{
            modalCompTitle() {
                return "create" == this.actionType ?  "创建新部门" : "更新部门信息" ;
            },
            modalCompOkTest(){
                return "create" == this.actionType ?  "创建" : "更新" ;
            }
        },
        beforeCreate(){
            var _this = this ;

        },
        created(){
            var _this = this ;
            _this.defineDepartmentCreateForm = this.$form.createForm(_this,{
                name:'DefineDepartmentCreateForm',
                onFieldsChange: (_, changedFields) => {
                    //console.log(changedFields);
                    this.$emit('change', changedFields);
                },
                mapPropsToFields:() =>{
                    //console.log(_this.formObj);
                    return {
                        parentId: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.parentId
                        }),
                        name: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.name
                        }),
                        code: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.code
                        }),
                        orderNum: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.orderNum
                        }),
                        description: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.description
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

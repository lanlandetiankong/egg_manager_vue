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
                        :treeData="treeSelectConf.parentId.selftTreeData"
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

    import {EmployeeDepartmentCompsApi} from '../employeeCompsApi'
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
                        selftTreeData:[]
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
            handleCreateActionInit(){   //弹窗展示为[创建-操作]的初始化
                var _this = this ;
                _this.treeSelectConf.parentId.selftTreeData = _this.parentSelectTrees ;
            },
            handleUpdateActionInit(){   //弹窗展示为[更新-操作]的初始化
                var _this = this ;
                EmployeeDepartmentCompsApi.getDefineDepartmentTreeFilterChildrens(_this.formObj.fid).then((res) => { //更新 上级部门 树
                    if(res && res.success){
                        _this.treeSelectConf.parentId.selftTreeData  = res.resultList ;
                    }
                })
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
            },
            visible:{
                handler(val,oval){  //隐藏与展示弹窗时监听
                    var _this = this ;
                    if(val === true){
                        if("create" == _this.actionType){   //打开=>创建
                            _this.handleCreateActionInit();
                        }   else if("update" == _this.actionType){  //打开=>更新
                            _this.handleUpdateActionInit();
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

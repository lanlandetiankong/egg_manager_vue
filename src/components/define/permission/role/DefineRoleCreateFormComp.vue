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
                :form="defineRoleCreateForm"
            >
                <a-form-item label="角色名">
                    <a-input v-decorator="formFieldConf.name"/>
                </a-form-item>
                <a-form-item label="编码">
                    <a-input v-decorator="formFieldConf.code"/>
                </a-form-item>
                <a-form-item label="类型">
                    <a-select showSearch allowClear
                              placeholder="请选择"
                              optionFilterProp="children"
                              :options="roleTypes"
                              :filterOption="getRoleTypeFilterOption"
                              v-decorator="formFieldConf.type"
                    >
                    </a-select>
                </a-form-item>
                <a-form-item label="备注">
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
        name: "DefineRoleCreateFormComp",
        components: {ATextarea, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object,
            roleTypes:Array
        },
        data(){
            return {
                formFieldConf:{
                    name:["name",{rules:[]}],
                    code:["code",{rules:[]}],
                    type:["type",{rules:[]}],
                    remark:["remark",{rules:[]}]
                },
                defineRoleCreateForm:{}
            }
        },
        methods:{
            getRoleTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealUpdateFormValue(formObj){
                var _this = this ;
               if(typeof _this.defineRoleCreateForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                   _this.defineRoleCreateForm.updateFields({
                       name: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.name,
                       }),
                       code: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.code,
                       }),
                       type: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.type,
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
                return "create" == this.actionType ?  "创建新角色" : "更新角色信息" ;
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
            _this.defineRoleCreateForm = this.$form.createForm(_this,{
                name:'defineRoleCreateForm',
                onFieldsChange: (_, changedFields) => {
                    //console.log(changedFields);
                    this.$emit('change', changedFields);
                },
                mapPropsToFields:() =>{
                    //console.log(_this.formObj);
                    return {
                        name: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.name
                        }),
                        code: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.code
                        }),
                        type: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.type
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

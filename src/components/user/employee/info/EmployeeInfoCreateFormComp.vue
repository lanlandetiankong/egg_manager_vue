<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            title="创建新用户"
            okText="创建"
            cancelText="取消"
            @cancel="() => { $emit('createFormCancel')}"
            @ok="() => { $emit('createFormSubmit')}"
        >
            <a-form
                layout="vertical"
                :form="employeeInfoCreateForm"
            >
                <a-form-item label="账号">
                    <a-input v-decorator="formFieldConf.account"/>
                </a-form-item>
                <a-form-item label="用户名">
                    <a-input v-decorator="formFieldConf.nickName"/>
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input v-decorator="formFieldConf.email"/>
                </a-form-item>
                <a-form-item label="用户类型">
                    <a-input v-decorator="formFieldConf.userType"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "EmployeeInfoCreateFormComp",
        components: {AFormItem},
        props:{
            visible:Boolean,
            formObj:Object
        },
        data(){
            return {
                formFieldConf:{
                    account:["account",{rules:[]}],
                    nickName:["nickName",{rules:[]}],
                    email:["email",{rules:[]}],
                    userType:["userType",{rules:[]}]
                },
                employeeInfoCreateForm:{}
            }
        },
        methods:{
            dealUpdateFormValue(formObj){
                var _this = this ;
               if(typeof _this.employeeInfoCreateForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                   _this.employeeInfoCreateForm.updateFields({
                       account: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.account,
                       }),
                       nickName: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.nickName,
                       }),
                       email: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.email,
                       }),
                       userType: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.userType,
                       })
                   });
               }
            }
        },
        beforeCreate(){
            var _this = this ;

        },
        created(){
            var _this = this ;
            _this.employeeInfoCreateForm = this.$form.createForm(_this,{
                name:'EmployeeInfoCreateForm',
                onFieldsChange: (_, changedFields) => {
                    //console.log(changedFields);
                    this.$emit('change', changedFields);
                },
                mapPropsToFields:() =>{
                    //console.log(_this.formObj);
                    return {
                        account: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.account
                        }),
                        nickName: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.nickName
                        }),
                        email: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.email
                        }),
                        userType: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.userType
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

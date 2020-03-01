<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            :title="modalCompTitle"
            :okText="modalCompOkTest"
            cancelText="取消"
            @cancel="() => { $emit('createFormCancel')}"
            @ok="handleCreateFormSubmit"
        >
            <a-form
                layout="vertical"
                :form="employeeInfoCreateForm"
            >
                <a-form-item label="账号"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.account"/>
                </a-form-item>
                <a-form-item label="用户名"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.nickName"/>
                </a-form-item>
                <a-form-item label="邮箱"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.email"/>
                </a-form-item>
                <a-form-item label="头像"
                     v-bind="formItemLayout"
                >
                    <head-img-upload
                        v-if="visible"
                        ref="headImgUploadRef"
                        :avatarUrl="formObj.avatarUrl"
                    >
                    </head-img-upload>
                </a-form-item>
                <a-form-item label="用户类型"
                     v-bind="formItemLayout"
                >
                    <a-select showSearch allowClear
                              placeholder="请选择"
                              optionFilterProp="children"
                              :options="userTypes"
                              :filterOption="getUserTypeFilterOption"
                              v-decorator="formFieldConf.userType"
                    >
                    </a-select>
                </a-form-item>
                <a-form-item label="用户类型"
                     v-bind="formItemLayout"
                >
                    <a-radio-group buttonStyle="solid"
                               v-decorator="formFieldConf.locked"
                    >
                        <a-radio-button value="1">锁定</a-radio-button>
                        <a-radio-button value="0">不锁定</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    import {dealNumberToStr} from '~Components/_util/util';
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import HeadImgUpload from "~Components/common/img/HeadImgUpload";
    export default {
        name: "EmployeeInfoCreateFormComp",
        components: {HeadImgUpload, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object,
            userTypes:Array
        },
        data(){
            var paramsRules ={
                account:[
                    {required:true,message:'请填写账号!'}
                ],
                nickName:[
                    {required:true,message:'请填写昵称!'}
                ],
                email:[
                    {required:false,message:'请填写邮箱!'},
                    {type: 'email',message: '请填写有效的邮箱!'}
                ],
                avatarUrl:[],
                userType:[
                    {required:true,message:'请填写用户类型!'}
                ],
                locked:[
                    {required:true,message:'请选择是否锁定!'}
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
                    account: ["account", {rules:paramsRules.account}],
                    nickName: ["nickName", {rules: paramsRules.nickName}],
                    email: ["email", {rules: paramsRules.email}],
                    avatarUrl: ["avatarUrl", {rules: paramsRules.avatarUrl}],
                    userType: ["userType", {rules: paramsRules.userType}],
                    locked: ["locked", {rules: paramsRules.locked}]
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
                       avatarUrl: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.avatarUrl,
                       }),
                       userType: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.userType,
                       }),
                       locked: _this.$form.createFormField({
                           ...formObj,
                           value: dealNumberToStr(formObj.locked),
                       }),
                   });
               }
            },
            getUserTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealGetHeadAvatarUrlVal(){  //取得[用户头像上传后的图片object]
                return this.$refs.headImgUploadRef.avatarUrlVal ;
            },
            handleCreateFormSubmit(e){  //创建提交
                var _this = this ;
                _this.$emit('createFormSubmit',e,_this.dealGetHeadAvatarUrlVal());
            }
        },
        computed:{
            modalCompTitle() {
                return "create" == this.actionType ?  "创建新用户" : "更新用户信息" ;
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
                        avatarUrl: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.avatarUrl
                        }),
                        userType: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.userType
                        }),
                        locked: this.$form.createFormField({
                            ..._this.formObj,
                            value: dealNumberToStr(_this.formObj.locked)
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

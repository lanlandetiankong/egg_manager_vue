<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            :title="modalCompTitle"
            :okText="$t('langMap.button.actions.confirmSubmit')"
            :cancelText="$t('langMap.button.actions.cancel')"
            @cancel="() => { $emit('createFormCancel')}"
            @ok="handleCreateFormSubmit"
        >
            <a-form
                layout="vertical"
                :form="createForm"
            >
                <a-form-item :label="$t('langMap.table.fields.em.tenant.belongTenant')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <a-select showSearch allowClear
                              :placeholder="$t('langMap.commons.forms.pleaseChoose')"
                              optionFilterProp="children"
                              :options="belongTenants"
                              :filterOption="getFilterOption"
                              v-decorator="formFieldConf.belongTenantId"
                    >
                    </a-select>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.em.department.belongDepartment')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <a-tree-select
                        :placeholder="$t('langMap.commons.forms.chooseDepartment')"
                        showSearch allowClear
                        v-decorator="formFieldConf.belongDepartmentId"
                        :treeNodeFilterProp="treeSelectConf.belongDepartmentId.treeNodeFilterProp"
                        :treeDefaultExpandAll="treeSelectConf.belongDepartmentId.treeDefaultExpandAll"
                        :treeData="treeSelectConf.belongDepartmentId.selftTreeData"
                        @change="handleBelongDepartmentOfSearchChange"
                    >
                    </a-tree-select>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.em.user.userAccount')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.account"/>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.em.user.userName')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.userName"/>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.em.user.email')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.email"/>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.em.user.avatarUrl')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <head-img-upload
                        v-if="visible"
                        ref="headImgUploadRef"
                        :avatarUrl="formObj.avatarUrl"
                    >
                    </head-img-upload>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.common.lockStatus')"
                             v-bind="FormBaseConfObj.formItemLayout"
                >
                    <a-radio-group buttonStyle="solid"
                                   v-decorator="formFieldConf.locked"
                    >
                        <a-radio-button value="1">{{$t('langMap.button.actions.lock')}}</a-radio-button>
                        <a-radio-button value="0">{{$t('langMap.button.actions.unlock')}}</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    import {FormBaseConfObj} from "~Components/constant_define";

    import {dealNumberToStr} from '~Assets/js/util/baseUtil';
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import HeadImgUpload from "~Components/regular/common/img/HeadImgUpload";
    export default {
        name: "EmployeeInfoCreateFormComp",
        components: {HeadImgUpload, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object,
            belongTenants:Array,
            belongDepartmentTrees:Array
        },
        data(){
            var paramsRules ={
                account:[
                    {required:true,message:this.$t('langMap.commons.forms.pleaseFillOut',[this.$t('langMap.table.fields.em.user.userAccount')])}
                ],
                userName:[
                    {required:true,message:this.$t('langMap.commons.forms.pleaseFillOut',[this.$t('langMap.table.fields.em.user.userName')])}
                ],
                email:[
                    {required:false,message:this.$t('langMap.commons.forms.pleaseFillOut',[this.$t('langMap.table.fields.em.user.email')])},
                    {type: 'email',message:this.$t('langMap.commons.forms.fillInValid',[this.$t('langMap.table.fields.em.user.email')])}
                ],
                avatarUrl:[],
                belongTenantId:[
                    {required:true,message:this.$t('langMap.commons.forms.pleaseSelect',[this.$t('langMap.table.fields.em.tenant.belongTenant')])}
                ],
                belongDepartmentId:[
                    {required:true,message:this.$t('langMap.commons.forms.pleaseSelect',[this.$t('langMap.table.fields.em.department.belongDepartment')])}
                ],
                locked:[
                    {required:true,message:this.$t('langMap.commons.forms.pleaseSelect',[this.$t('langMap.table.fields.common.lockStatus')])}
                ]
            };
            return {
                FormBaseConfObj,
                formFieldConf:{
                    account: ["account", {rules:paramsRules.account}],
                    userName: ["userName", {rules: paramsRules.userName}],
                    email: ["email", {rules: paramsRules.email}],
                    avatarUrl: ["avatarUrl", {rules: paramsRules.avatarUrl}],
                    belongTenantId: ["belongTenantId", {rules: paramsRules.belongTenantId}],
                    belongDepartmentId: ["belongDepartmentId", {rules: paramsRules.belongDepartmentId}],
                    locked: ["locked", {rules: paramsRules.locked}]
                },
                createForm:{},
                treeSelectConf:{
                    belongDepartmentId:{
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
                if(typeof _this.createForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                    _this.createForm.updateFields({
                        account: _this.$form.createFormField({
                            ...formObj,
                            value: formObj.account,
                        }),
                        userName: _this.$form.createFormField({
                            ...formObj,
                            value: formObj.userName,
                        }),
                        email: _this.$form.createFormField({
                            ...formObj,
                            value: formObj.email,
                        }),
                        avatarUrl: _this.$form.createFormField({
                            ...formObj,
                            value: formObj.avatarUrl,
                        }),
                        belongTenantId: _this.$form.createFormField({
                            ...formObj,
                            value: formObj.belongTenantId,
                        }),
                        belongDepartmentId: _this.$form.createFormField({
                            ...formObj,
                            value: formObj.belongDepartmentId,
                        }),
                        locked: _this.$form.createFormField({
                            ...formObj,
                            value: dealNumberToStr(formObj.locked),
                        }),
                    });
                }
            },
            getFilterOption(input,option){
                //[租户]select 搜索过滤
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealGetHeadAvatarUrlVal(){  //取得[用户头像上传后的图片object]
                return this.$refs.headImgUploadRef.avatarUrlVal ;
            },
            handleCreateFormSubmit(e){  //创建提交
                var _this = this ;
                _this.$emit('createFormSubmit',e,_this.dealGetHeadAvatarUrlVal());
            },
            handleBelongDepartmentOfSearchChange(value){  //[所属部门] SelectTree cchange事件
                console.log("handleBelongDepartmentOfSearchChange",value);
            },
            handleCreateActionInit(){   //弹窗展示为[创建-操作]的初始化
                var _this = this ;
                _this.treeSelectConf.belongDepartmentId.selftTreeData = _this.belongDepartmentTrees ;
            },
            handleUpdateActionInit(){   //弹窗展示为[更新-操作]的初始化
                var _this = this ;
                _this.treeSelectConf.belongDepartmentId.selftTreeData = _this.belongDepartmentTrees ;
            },
        },
        computed:{
            modalCompTitle() {
                return "create" == this.actionType ?  this.$t('langMap.button.actions.addByForm') : this.$t('langMap.button.actions.updateByForm') ;
            }
        },
        beforeCreate(){
            var _this = this ;

        },
        created(){
            var _this = this ;
            _this.createForm = this.$form.createForm(_this,{
                name:'createForm',
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
                        userName: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.userName
                        }),
                        email: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.email
                        }),
                        avatarUrl: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.avatarUrl
                        }),
                        belongTenantId: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.belongTenantId
                        }),
                        belongDepartmentId: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.belongDepartmentId
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

<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            :title="modalCompTitle"
            :okText="$t('langMap.button.actions.confirmSubmit')"
            :cancelText="$t('langMap.button.actions.cancel')"
            @cancel="() => { $emit('createFormCancel')}"
            @ok="() => { $emit('createFormSubmit')}"
        >
            <a-form
                layout="vertical"
                :form="announcementTagCreateForm"
            >
                <a-form-item :label="$t('langMap.table.fields.common.tagName')"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.name"/>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.common.description')"
                     v-bind="formItemLayout"
                >
                    <a-input v-decorator="formFieldConf.description"/>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.common.sortVal')"
                     v-bind="formItemLayout"
                >
                    <a-input-number v-decorator="formFieldConf.ordering"/>
                </a-form-item>
                <a-form-item :label="$t('langMap.table.fields.common.remark')"
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
        name: "AnnouncementTagCreateFormComp",
        components: {ATextarea, AFormItem},
        props:{
            visible:Boolean,
            actionType:String,
            formObj:Object
        },
        data(){
            var paramsRules ={
                name:[
                    {required:true,message:'请填写标签名!'}
                ],
                description:[],
                ordering:[
                    {required:true,message:'请填写排序!'},
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
                    description:["description",{rules:paramsRules.description}],
                    ordering:["ordering",{rules:paramsRules.ordering}],
                    remark:["remark",{rules:paramsRules.remark}]
                },
                announcementTagCreateForm:{}
            }
        },
        methods:{
            dealUpdateFormValue(formObj){
                var _this = this ;
               if(typeof _this.announcementTagCreateForm.updateFields != "undefined"){ //避免未初始化form的时候就调用了updatefield
                   _this.announcementTagCreateForm.updateFields({
                       name: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.name,
                       }),
                       description: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.description,
                       }),
                       ordering: _this.$form.createFormField({
                           ...formObj,
                           value: formObj.ordering,
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
                return "create" == this.actionType ? this.$t('langMap.button.actions.addByForm') : this.$t('langMap.button.actions.updateByForm') ;
            }
        },
        beforeCreate(){
            var _this = this ;

        },
        created(){
            var _this = this ;
            _this.announcementTagCreateForm = this.$form.createForm(_this,{
                name:'AnnouncementTagCreateForm',
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
                        description: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.description
                        }),
                        ordering: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.ordering
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

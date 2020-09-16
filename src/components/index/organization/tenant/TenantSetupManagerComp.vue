<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            :title="modalConf.title"
            :okText="modalConf.okText"
            :width="1000"
            :centered="true"
            cancelText="取消"
            @cancel="() => { $emit('setupManagerCancel')}"
            @ok="handleSubmit"
        >
            <user-table-select-comp
                :maxSize="userTableSelect.conf.maxSize"
                :minSize="userTableSelect.conf.minSize"
                :checkIdList="userTableSelect.conf.checkIdList"
            />
        </a-modal>
    </div>
</template>
<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ATextarea from "ant-design-vue/es/input/TextArea";
    import UserTableSelectComp from "~Components/common/user/tableSelect/UserTableSelectComp.vue";
    export default {
        name: "DefineTenantCreateFormComp",
        components: {ATextarea, AFormItem,UserTableSelectComp},
        props:{
            visible:Boolean,
            tenantId:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                modalConf:{
                    title:'设置管理员',
                    okText:'确认提交'
                },
                userTableSelect:{
                    conf:{
                        maxSize:1,
                        minSize:1,
                        checkIdList: []
                    }
                }
            }
        },
        methods:{
            handleSubmit(e){
                //传递数据到父组件处理
                this.$emit('setupManagerSubmit');
            }
        },
        computed:{

        },
        created(){

        },
        mounted(){

        },
        watch:{

        }
    }
</script>

<style scoped>

</style>

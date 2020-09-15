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
            @cancel="() => { $emit('createFormCancel')}"
            @ok="() => { $emit('createFormSubmit')}"
        >
            <user-table-select-comp />
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
            }
        },
        methods:{

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

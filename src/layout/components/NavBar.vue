<template>
    <div>
        <a-icon
            class="trigger"
            :type="collapsedFlag ? 'menu-unfold' : 'menu-fold'"
            @click="collapsedToggle"
        />
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props: {
            collapsed:Boolean
        },
        data() {
            return {
                collapsedFlag:false
            }
        },
        methods:{
            collapsedToggle() {
                 this.collapsedFlag = ! this.collapsedFlag ;
                this.$emit('siderbar-toggle',this.collapsedFlag);
            }
        },
        mounted(){
            this.collapsedFlag = this.$props.collapsed ;
        }
    }
</script>

<style lang="less" scoped>
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
        :hover {
            color: #1890ff;
        }
    }
</style>

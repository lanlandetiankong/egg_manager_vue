<template>
    <div>
        <keep-alive :include="cachedChildrenViews">
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';
    export default {
        name: "PermissionPage",
        mixins:[EggCommonMixin],
        data(){
            return {
                cachedChildrenViews : []
            }
        },
        computed:{
            cachedViews() {
                return this.$store.state.tagsView.cachedViews ;
            }
        },
        methods:{

        },
        watch:{
            cachedViews() {
                this.mixin_refreshChildViewCaches(this,"PermissionPage") ;
            }
        },
        created(){
            this.mixin_refreshChildViewCaches(this,"PermissionPage");
        }
    }
</script>

<style scoped>

</style>

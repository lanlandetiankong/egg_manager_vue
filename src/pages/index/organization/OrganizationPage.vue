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
        name: "OrganizationPage",
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
        watch:{
            cachedViews() {
                this.mixin_refreshChildViewCaches(this,"OrganizationPage") ;
            }
        },
        created(){
            this.mixin_refreshChildViewCaches(this,"OrganizationPage");
        }
    }
</script>

<style scoped>

</style>

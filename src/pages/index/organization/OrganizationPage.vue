<template>
    <div>
        <keep-alive :include="cachedChildrenViews">
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "OrganizationPage",
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
            doChildViewCachesRefresh(pageCompName){     //子节点缓存刷新
                var _this = this;
                var cachedViewMap = this.$store.state.tagsView.cachedViews ;
                if(typeof cachedViewMap != "undefined" && cachedViewMap != null && cachedViewMap.size > 0){
                    var currentCacheChildCompNames = cachedViewMap.get(pageCompName);
                    if(currentCacheChildCompNames && currentCacheChildCompNames.length > 0){
                        if(_this.cachedChildrenViews.length > 0){
                            for(let i = 0; i < currentCacheChildCompNames.length; i++){
                                if(_this.cachedChildrenViews.indexOf(currentCacheChildCompNames[i]) == -1){ //不重复添加
                                    _this.cachedChildrenViews.push(currentCacheChildCompNames[i]);
                                }
                            }
                        }   else {
                            for(let i = 0; i < currentCacheChildCompNames.length; i++){
                                _this.cachedChildrenViews.push(currentCacheChildCompNames[i]);
                            }
                        }
                    }   else {
                        _this.cachedChildrenViews = [] ;
                    }
                }   else {
                    _this.cachedChildrenViews = [] ;
                }
            }
        },
        watch:{
            cachedViews() {
                this.doChildViewCachesRefresh("OrganizationPage") ;
            }
        },
        created(){
            this.doChildViewCachesRefresh("OrganizationPage");
        }
    }
</script>

<style scoped>

</style>

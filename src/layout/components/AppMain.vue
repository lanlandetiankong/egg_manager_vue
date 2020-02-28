<template>
    <section class="app_main" style="min-height: 100%;">
        <transition name="fade" mode="out-in">
            <keep-alive :include="cachedBasePages">
                <router-view style="min-height: 100%;"></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        data(){
            return {
                cachedBasePages : []
            }
        },
        computed:{
            cachedViews() {
                return this.$store.state.tagsView.cachedViews ;
            }
        },
        methods:{
            doBasePageCachesRefresh(){
                var _this = this;
                debugger;
                var cachedViewMap = this.$store.state.tagsView.cachedViews ;
                if(typeof cachedViewMap != "undefined" && cachedViewMap != null && cachedViewMap.size > 0){
                    cachedViewMap.forEach(function (value, key, map) {
                        var keyChildViews = cachedViewMap.get(key);
                        if(typeof keyChildViews != "undefined" && keyChildViews != null ){
                            if(keyChildViews.length > 0 ){
                                //查看效果
                                if(_this.cachedBasePages.indexOf(key) == -1){ //不重复添加
                                    _this.cachedBasePages.push(key);
                                }
                            }   else {
                                //TODO
                                _this.cachedBasePages.remove(key) ;
                                console.log("当前 page 底下没有子页面，需要移除缓存");
                            }
                        }   else {
                            _this.cachedBasePages.remove(key) ;
                        }
                    });
                }   else {
                    _this.cachedBasePages = [] ;
                }
            }
        },
        watch:{
            cachedViews() {
                this.doBasePageCachesRefresh() ;
            }
        },
        created(){
            this.doBasePageCachesRefresh();
        }
    }
</script>
<style>
    .app_main {
        min-height: 100%;
        height: 100%
    }
</style>

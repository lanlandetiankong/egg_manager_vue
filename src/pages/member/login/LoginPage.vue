<template>
    <div class="login-page-root">
        <a-layout id="login-top-layout" class="login-page-layout">
            <login-main-comp
                :otherRouter="othersRouters"
                @login-form-submit="handleLoginFormSubmit"
            >
            </login-main-comp>
        </a-layout>
    </div>
</template>

<script>
    import {LoginMainApi} from './_LoginMainApi.js'
    import {ConstantVars} from '~Utils/constantVars.js'
    import LoginMainComp from '~Components/login/LoginMainComp.vue'

    export default {
        name: "LoginPage",
        components: {
            LoginMainComp
        },
        data() {
            return {
                othersRouters:{
                    register:{
                        to:'/member/register'
                    },
                    forgetPassword:{
                        to:'/member/password/forget'
                    }
                }
            }
        },
        methods:{
            handleLoginFormSubmit(e,loginForm,submitRes){
                var _this = this ;
                if(submitRes){
                    if(submitRes.actionFlag == true){ //后台登录验证成功
                        _this.handleSetUserTokenToCache(submitRes.accountToken);
                        _this.handleSetAuthorizationToCache(submitRes.authorization);
                        _this.handleSetRouterUrlsToCache(submitRes.routerUrlSet);
                        _this.handleSetGrantedPermissionsToCache(submitRes.permissionSet);
                        _this.handleMenuListToRouters();
                        _this.$router.push("/index");
                    }
                }
            },
            handleSetUserTokenToCache(userTokenObj){    //设置 token
                this.$store.dispatch('doSetUserToken',userTokenObj) ;
                window.sessionStorage.setItem("userToken",JSON.stringify(userTokenObj));
                console.log(JSON.stringify(window.sessionStorage.getItem("userToken")));
            },
            handleSetAuthorizationToCache(authorization){   //设置 JWT 值
                this.$store.dispatch('doSetAuthorization',authorization) ;
                window.sessionStorage.setItem("authorization",authorization);
            },
            handleSetRouterUrlsToCache(routerUrls){   //设置 可访问的router路径-Set集合
                this.$store.dispatch('doSetVisibleRouterUrls',routerUrls) ;
                window.sessionStorage.setItem("visibleRouterUrls",JSON.stringify(routerUrls));
            },
            handleSetGrantedPermissionsToCache(grantedPermissions){   //设置 可使用的 权限code 集合
                this.$store.dispatch('doSetGrantedPermissions',grantedPermissions) ;
                window.sessionStorage.setItem("grantedPermissions",JSON.stringify(grantedPermissions));
            },
            dealCheckMenuItemPutAble(routerItem){ //返回是否可添加到routerUrlMap
                return routerItem.path ;
            },
            dealSetMenuConfToRouter(toRouter,menuConf) {    //将值设置到vue router定义
                if(menuConf){
                    var menuIconName = menuConf.iconName;
                    if(menuIconName){
                        toRouter.meta.icon = menuIconName ;
                    }
                    var menuName = menuConf.name;
                    if(menuName){
                        toRouter.meta.title = menuName ;
                    }
                    toRouter.meta.visitLimit = false ;
                }
            },
            dealRecursiveMenuChildrenToMap(routerUrlMap,routerItem,parentUrl){
                var _this = this ;
                parentUrl = (parentUrl) ? parentUrl+"/" : "/" ;
                if(_this.dealCheckMenuItemPutAble(routerItem)){
                    var realUrl = (parentUrl+routerItem.path).replace("//","/");
                    if(realUrl.indexOf("/") != 0){
                        realUrl = "/" + realUrl ;
                    }
                    routerUrlMap.set(realUrl,routerItem) ;
                }
                var itemChildrens = routerItem.children ;
                if(itemChildrens && itemChildrens.length > 0){
                    var nextParentUrl = parentUrl+routerItem.path ;
                    for(var childIdx in itemChildrens){
                        _this.dealRecursiveMenuChildrenToMap(routerUrlMap,itemChildrens[childIdx],nextParentUrl);
                    }
                }
            },
            handleMenuListToRouters(){
                LoginMainApi.doGetAllMenu().then(res => {
                    if(res.hasError == false){
                        var menuList = res.resultList;
                        var urlMap = res.resultMap ;
                        this.$store.dispatch('doDelAllViews') ; //登录前清空已访问页面的tag缓存
                        this.$store.dispatch('doSetGrantMenuList',menuList) ;
                        var _this = this ;
                        var routersArrTemp = _this.$router.options.routes;
                        var routerUrlMap = new Map();
                        if(routersArrTemp && routersArrTemp.length > 0){
                            for(var idx in routersArrTemp){
                                var routerItem = routersArrTemp[idx];
                                _this.dealRecursiveMenuChildrenToMap(routerUrlMap,routerItem);
                            }
                        }
                        for(var urlKey in urlMap){
                            var grantMenuUrlFlag = routerUrlMap.has(urlKey);
                            if(grantMenuUrlFlag == true){   //如果定义的路由有对应的后台相关配置
                                var urlConf =  urlMap[urlKey];
                                var routerItem = routerUrlMap.get(urlKey);
                                _this.dealSetMenuConfToRouter(routerItem,urlConf); //根据后台配置修改路由的相关配置
                            }
                        }
                        //console.log(routerUrlMap);
                    }
                });
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "_LoginPage.less";


</style>

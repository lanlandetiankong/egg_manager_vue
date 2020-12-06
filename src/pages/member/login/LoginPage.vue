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
    import { mapGetters } from 'vuex'
    import {AsyncRouterUtil} from '~Router/asyncRouterUtil.js';
    import {LoginMainApi} from './_LoginMainApi.js'
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
        computed: {
            tagViewOpendArray() {
                return this.$store.state.tagsView.visitedViews ;
            },
            ...mapGetters([
                'routingStore_grantedMenuList',
                'routingStore_grantedMenuUrlMap'
            ])
        },
        methods:{
            handleLoginFormSubmit(e,loginForm,submitRes){
                var _this = this ;
                debugger;
                if(submitRes){
                    if(submitRes.success){ //后台登录验证成功
                        _this.handleSetUserTokenToCache(submitRes.accountToken);
                        _this.handleSetAuthorizationToCache(submitRes.authorization);
                        _this.handleSetRouterUrlsToCache(submitRes.routerUrlSet);
                        _this.handleSetGrantedPermissionsToCache(submitRes.permissionSet);
                        _this.handleMenuListToCache();
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
            handleMenuListToCache(){  //将后台的[菜单配置]更新到 VueRouter配置中
                var _this = this ;
                LoginMainApi.doGetAllMenu().then(res => {
                    debugger;
                    if(res.success){
                        var menuList = res.gridList;
                        var urlMap = res.dataMap ;
                        this.$store.dispatch('doDelAllViews') ; //登录前清空已访问页面的tag缓存
                        window.sessionStorage.setItem("grantedMenuList",JSON.stringify(menuList));
                        window.sessionStorage.setItem("grantedMenuUrlMap",JSON.stringify(urlMap));
                        this.$store.dispatch('doSetGrantedMenuList',menuList) ;
                        this.$store.dispatch('doSetGrantedMenuUrlMap',urlMap) ;
                        _this.handleMenuListToRouters(urlMap);
                    }
                });
            },
            handleMenuListToRouters(grantedMenuUrlMap){      //将后台的[菜单配置]更新到 VueRouter配置中
                AsyncRouterUtil.dealMenuListToRouters(grantedMenuUrlMap,this);
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "_LoginPage.less";


</style>

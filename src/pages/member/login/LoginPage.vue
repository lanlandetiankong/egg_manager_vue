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
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "_LoginPage.less";


</style>

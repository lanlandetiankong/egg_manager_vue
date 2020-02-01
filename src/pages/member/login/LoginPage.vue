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
            handleLoginFormSubmit(e,loginForm){

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "_LoginPage.less";


</style>

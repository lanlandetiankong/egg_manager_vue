<template>
    <div class="login-main-comp-root">
        <div>
            <a-form
                class="login-box"
                :form="loginForm"
                @submit="handleLoginSubmit"
            >
                <a-form-item
                    label="账号"
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                    v-model="loginForm.userAccount"
                >
                    <a-input
                        placeholder="请输入用户账号"
                    >
                        <a-icon
                            slot="prefix"
                            type="user"
                            style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="密码"
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                    v-model="loginForm.password"
                >
                    <a-input
                        type="password"
                        placeholder="请输入用户密码"
                    >
                        <a-icon
                            slot="prefix"
                            type="lock"
                            style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                >
                    <span style="float:right">
                        <a-checkbox>
                            记住我
                        </a-checkbox>
                        <a-button type="link" >
                            注册账号
                        </a-button>
                        <a-button type="link" >
                            忘记密码
                        </a-button>
                    </span>
                </a-form-item>
                <a-form-item
                    label=" "
                    :colon=false
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                >
                    <a-button
                        icon="login"
                        type="primary"
                        html-type="submit"
                        :disabled="hasLoginFormError()"
                    >
                        登陆
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";

    export default {
        name: "LoginMainComp",
        components: {AFormItem},
        data() {
            return {
                loginForm: {
                    userAccount: '',
                    password: ''
                },
                loginFormConf: {
                    labelCol: {span: 4},
                    wrapperCol: {span: 20}
                },
            }
        },
        methods: {
            handleLoginSubmit() {
                this.$router.push("/");
            },
            hasLoginFormError() {
                //判断loginForm是否有错误
                return false;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "./_LoginMainComp.styl";
</style>

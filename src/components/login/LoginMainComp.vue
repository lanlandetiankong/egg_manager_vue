<template>
    <div class="login-main-comp-root">
        <div class="login-box">
            <a-form
                :form="loginForm"
                @submit="handleLoginSubmit"
            >
                <a-form-item
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                    v-model="loginForm.userAccount"
                >
                    <template slot="label">
                        <span class="formBaseCls">账号</span>
                    </template>
                    <a-input
                        placeholder="请输入用户账号"
                        v-model="loginForm.userAccount"
                    >
                        <a-icon
                            slot="prefix"
                            type="user"
                            style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                    v-model="loginForm.password"
                >
                    <template slot="label">
                        <span class="formBaseCls">密码</span>
                    </template>
                    <a-input
                        type="password"
                        placeholder="请输入用户密码"
                        v-model="loginForm.password"
                    >
                        <a-icon
                            slot="prefix"
                            type="lock"
                            style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item
                    label=" "
                    :colon=false
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                >
                    <a-row>
                        <a-col :span=6>
                            <a-switch
                                checkedChildren="记住我"
                                unCheckedChildren=""
                            >
                            </a-switch>
                        </a-col>
                        <a-col :span=18>
                            <a-button block
                                      icon="login"
                                      type="primary"
                                      html-type="submit"
                                      :disabled="hasLoginFormError()"
                            >
                                登陆
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form-item>
            </a-form>
            <a-row type="flex" align="middle" justify="end">
                <a-col :span=6>
                    <router-link :to="othersRouters.register.to">注册账号</router-link>
                </a-col>
                <a-col :span=6>
                    <router-link :to="othersRouters.forgetPassword.to">忘记密码</router-link>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";

    import {LoginMainCompApi} from './_LoginMainCompApi'

    export default {
        name: "LoginMainComp",
        components: {ACol, ARow, AFormItem},
        props:{
            othersRouters:{
                type:Object,
                default:function () {
                    return {
                        register:{
                            to:'/member/register'
                        },
                        forgetPassword:{
                            to:'/member/password/forget'
                        }
                    }
                }
            }
        },
        data() {
            return {
                loginForm: {
                    userAccount: 'SuperRoot',
                    password: '123456'
                },
                loginFormConf: {
                    labelCol: {span: 4},
                    wrapperCol: {span: 20}
                },
            }
        },
        methods: {
            handleLoginSubmit(e) {
                e.preventDefault(); //拦截form提交的默认事件
                LoginMainCompApi.submitLoginFormByAccount(this.loginForm).then((res) => {
                    this.$emit('login-form-submit',e,this.loginForm,res);
                });
            },
            hasLoginFormError() {
                //判断loginForm是否有错误
                return false;
            }
        }
    }
</script>

<style lang="less" scoped>
   @import "_LoginMainComp.less";


</style>

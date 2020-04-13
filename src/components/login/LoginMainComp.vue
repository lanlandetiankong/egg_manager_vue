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
                    :colon=false
                    :label-col="loginFormConf.labelCol"
                    :wrapper-col="loginFormConf.wrapperCol"
                >
                    <template slot="label">
                        <span class="formBaseCls">验证码</span>
                    </template>
                    <Verify
                        ref="loginVerifyRef"
                        :type="verifyConf.picture.type"
                        :width="verifyConf.picture.width"
                        :height="verifyConf.picture.height"
                        :fontSize="verifyConf.picture.fontSize"
                        :codeLength="verifyConf.picture.codeLength"
                        :showButton="verifyConf.picture.showButton"
                        @success="handleVerifySuccess"
                        @error="handleVerifyError"
                    ></Verify>
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

    import Verify from 'vue2-verify'

    import {LoginMainCompApi} from './_LoginMainCompApi'

    export default {
        name: "LoginMainComp",
        components: {ACol, ARow, AFormItem,Verify},
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
                verifyConf:{
                    picture:{
                        type:"picture",
                        width:"100%",
                        height:"100%",
                        fontSize:"30px",
                        codeLength:4,
                        showButton:false    //是否展示按钮
                    },
                    more:{
                        success:false
                    }
                },
            }
        },
        methods: {
            dealTriggerVerify(){    //触发 Verify 的验证事件
                this.$refs.loginVerifyRef.$refs.instance.checkCode() ;
            },
            dealVerifySubmit(){ //触发Verify提交事件并验证
                var _this = this ;
                _this.dealTriggerVerify();
                if(_this.verifyConf.more.success == false){
                    _this.$message.error("验证码未填写或错误！");
                }
                return _this.verifyConf.more.success ;
            },
            handleLoginSubmit(e) {
                e.preventDefault(); //拦截form提交的默认事件
                var verifyFlag = this.dealVerifySubmit() ;
                if(verifyFlag == true){
                    LoginMainCompApi.submitLoginFormByAccount(this.loginForm).then((res) => {
                        debugger;
                        if(res.hasError == false){
                            this.$emit('login-form-submit',e,this.loginForm,res);
                        }
                    });
                }
            },
            hasLoginFormError() {
                //判断loginForm是否有错误
                return false;
            },
            handleVerifySuccess(e){
                this.verifyConf.more.success = true;
            },
            handleVerifyError(e){
                this.verifyConf.more.success = false;
            },
        }
    }
</script>

<style lang="less" scoped>
   @import "_LoginMainComp.less";


</style>

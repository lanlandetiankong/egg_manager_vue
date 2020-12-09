<template>
    <div>
        <a-row type="flex" align="middle" justify="end">
            <a-col :span=2>
                <a-button v-if="langLocale==='zh'" @click="langChangeToZh">
                    English
                </a-button>
                <a-button  v-else @click="langChangeToZh">
                    中文
                </a-button>
            </a-col>
            <a-col :span=2>
                <a-row>
                    <a-tag color="blue">
                        {{loginUserName}}
                    </a-tag>
                </a-row>
            </a-col>
            <a-col :span=1 >
                <a-avatar
                    :src="loginUserAvatarUrl"
                    alt="图片加载失败"
                />
            </a-col>
            <a-col :span=1>
                <a-dropdown
                    :trigger="['click']"
                    placement="bottomCenter"
                >
                    <a-icon type="down-circle"
                            :style="{fontSize:'20px'}"
                            :spin=true
                            theme="filled"
                    />
                    <a-menu slot="overlay" @click="handleMoreSettingClick">
                        <a-menu-item key="user_loginout"
                        >
                            {{$t('langMap.button.member.logOut')}}
                        </a-menu-item>
                        <a-menu-item key="user_center">
                            {{$t('langMap.button.member.ersonalCenter')}}
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import constantParams from '~Config/constantParams' ;
    import {i18nUtil} from "~Config/i18n/i18nUtil";
    import ACol from "ant-design-vue/es/grid/Col";
    import ARow from "ant-design-vue/es/grid/Row";
    export default {
        name: "NavBar",
        components: {ARow, ACol},
        props: {
            userInfo:Object
        },
        data() {
            return {}
        },
        computed:{
            loginUserName(){
                var userTokenCache = window.sessionStorage.getItem("userToken");
                if(userTokenCache){
                    var userTokenObj = JSON.parse(userTokenCache);
                    return userTokenObj.userName ;
                }   else {
                    return "未知用户";
                }
            },
            loginUserAvatarUrl(){   //取得登录用户的头像
                var userTokenCache = window.sessionStorage.getItem("userToken");
                if(userTokenCache){
                    var userTokenObj = JSON.parse(userTokenCache);
                    var avatarUrl = userTokenObj.avatarUrl ;
                    if(avatarUrl){
                        var urlPrefix = constantParams.props.upload.url.prefix ;
                        return urlPrefix+avatarUrl ;
                    }
                }
            },
            langLocale(){
                return (this.$i18n.locale) ? this.$i18n.locale : 'zh' ;
            }
        },
        methods:{
            handleMoreSettingClick(e){  //更多操作点击事件
                var _this = this ;
                if(e.key == "user_loginout"){   //退出登录
                    _this.$emit('userLoginOut',e);
                }   else if(e.key == "user_center"){ //个人中心
                    _this.$emit('goToUserCenter',e);
                }
            },
            langChangeToZh(){
                let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
                this.$i18n.locale = lang ;
                i18nUtil.reflushCache(this.$i18n.locale);
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
        :hover {
            color: #1890ff;
        }
    }
</style>

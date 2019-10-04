<template>
    <div>
        <a-row type="flex" align="middle" justify="end">
            <a-col :span=2>
                <a-row>
                    <a-tag color="blue">
                        呆着的剑客
                    </a-tag>
                </a-row>
            </a-col>
            <a-col :span=1 >
                <a-avatar
                    src="/static/img/user/panda_egg.jpg"
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
                    <a-menu slot="overlay">
                        <a-menu-item key="user_loginout"
                                     @click=""
                        >
                            退出登录
                        </a-menu-item>
                        <a-menu-item key="user_center">
                            个人中心
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import ACol from "ant-design-vue/es/grid/Col";
    import ARow from "ant-design-vue/es/grid/Row";
    export default {
        name: "NavBar",
        components: {ARow, ACol},
        props: {
            userInfo:Object
        },
        data() {
            return {
            }
        },
        methods:{

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

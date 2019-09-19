<template>
    <div class="index-page-root">
        <a-layout>
            <a-affix>
                <a-layout-header class="header">
                    <div class="logo"/>
                    <a-menu
                        theme="dark"
                        mode="horizontal"
                        :defaultSelectedKeys="['2']"
                        :style="{ lineHeight: '64px' }"
                    >
                        <a-menu-item key="1">nav 1</a-menu-item>
                    </a-menu>
                </a-layout-header>
            </a-affix>

            <a-layout :style="{ marginLeft: '200px' }">
                <a-layout-sider
                    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
                    v-model="siderConf.collapsed"
                >
                    <a-menu
                        mode="inline"
                        theme="dark"
                    >
                        <template v-for="item in menuList">
                            <a-menu-item v-if="!item.children" :key="item.key">
                                <a-icon type="pie-chart" />
                                <span>{{item.name}}</span>
                            </a-menu-item>
                            <sub-menu-comp v-else :menu-info="item" :key="item.key"/>
                        </template>
                    </a-menu>
                </a-layout-sider>
                <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                    <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
                        ...
                        <br/>
                        Really
                        <br/>...<br/>...<br/>...<br/>
                        long
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
                        <br/>...<br/>...<br/>...<br/>...<br/>...<br/>
                        content
                    </div>
                </a-layout-content>
            </a-layout>
            <a-layout-footer :style="{ textAlign: 'center'}">
                @eggegg Egg Manager For Open
            </a-layout-footer>
        </a-layout>
    </div>
</template>
<script>
    import IndexMainComp from '~Components/index/IndexMainComp'
    import ALayoutSider from "ant-design-vue/es/layout/Sider";
    import SubMenuComp from '~Components/menu/SubMenuComp' ;
    import {IndexPageApi} from './_IndexPage.js' ;

    export default {
        name: "IndexPage",
        components: {
            ALayoutSider,
            IndexMainComp,
            SubMenuComp
        },
        data() {
            return {
                siderConf: {
                    collapsed: false
                },
                menuList: []
            }
        },
        methods: {
            handleGetMenus() {
                var _this = this;
                IndexPageApi.doGetAllMenu().then(res => {
                    _this.menuList = res.resultList;
                    console.log(_this.menuList);
                });

            }
        },
        mounted() {
            this.handleGetMenus();

        }
    }
</script>

<style lang="stylus" scoped>
    @import "_IndexPage.styl"
</style>
<style>
    #index-layout .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, .2);
        margin: 16px 28px 16px 0;
        float: left;
    }
</style>

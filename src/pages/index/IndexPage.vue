<template>
    <div class="index-page-root">
        <a-layout id="index-layout-root">
            <a-layout-sider
                v-model="siderConf.collapsed"
            >
                <div :class="sideBarLogoCls">Egg Manager</div>
                <a-menu
                    mode="inline"
                    theme="dark"
                    class="index-menu"
                    @click="dealMenuClick"
                >
                    <template v-for="item in menuList">
                        <a-menu-item v-if="!item.children" :key="item.key">
                            <a-icon type="pie-chart"/>
                            <span>{{item.name}}</span>
                        </a-menu-item>
                        <sub-menu-comp v-else :menu-info="item" :key="item.key"/>
                    </template>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0;">
                    <a-icon
                        class="trigger"
                        :type="siderConf.collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> siderConf.collapsed = !siderConf.collapsed"
                    />
                </a-layout-header>
                <a-layout-content
                    class="index-layout-content">
                    <div>
                        <a-tabs
                            v-model="tabsConf.activityKey"
                            type="editable-card"
                            :tabPosition="tabsConf.mode"
                            :hideAdd=true
                            @change="dealTabsChange"
                            @edit="dealTabsEdit"
                            @tabClick="dealTabsClick"
                        >
                            <template v-for="tabItem of tabsList">
                                <a-tab-pane :tab="tabItem.name" :key="tabItem.id" style="width: 100%">
                                    <div :style="{ padding: '24px', background: '#fff', textAlign: 'center',height:'100%'}">
                                        {{tabItem.name}} + {{tabItem.id}}
                                        <component is="Error404Comp"></component>
                                    </div>
                                </a-tab-pane>
                            </template>
                        </a-tabs>
                    </div>
                </a-layout-content>
                <a-layout-footer :style="{ textAlign: 'center'}">
                    @eggegg Egg Manager For Open
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
<script>

    import ARadioButton from "ant-design-vue/es/radio/RadioButton";
    import ALayoutSider from "ant-design-vue/es/layout/Sider";

    import SubMenuComp from '~Components/menu/SubMenuComp' ;
    import IndexMainComp from '~Components/index/IndexMainComp';

    import Error404Comp from '~Components/error/4xx/Error404Comp';


    import {IndexPageApi} from './_IndexPage.js' ;


    export default {
        name: "IndexPage",
        components: {
            ARadioButton,
            ALayoutSider,
            IndexMainComp,
            SubMenuComp,
            Error404Comp
        },
        data() {
            return {
                siderConf: {
                    collapsed: false,
                },
                menuList: [],
                tabsList:[
                    {
                        id:'1000001',
                        name:'第一个'
                    },{
                        id:'1000002',
                        name:'第2个'
                    },{
                        id:'1000003',
                        name:'第3个'
                    }
                ] ,
                tabsConf: {
                    activityKey: '',
                    mode: 'top',
                    defaultOpen:[],
                }
            }
        },
        computed: {
            sideBarLogoCls(){
                return this.siderConf.collapsed ? "logo-collapsed" : "logo"
            }
        },
        methods: {
            handleGetMenus() {
                var _this = this;
                IndexPageApi.doGetAllMenu().then(res => {
                    _this.menuList = res.resultList;
                    console.log(_this.menuList);
                });
            },
            dealMenuClick(obj) {
                console.log(obj);
            },

            dealTabsChange(activeKey) {

            },
            dealTabsEdit(targetKey, action) {

            },
            dealTabsClick(activeKey) {

            }
        },
        mounted() {
            this.handleGetMenus();

        }
    }
</script>

<style lang="less" scoped>
    @import "./_IndexPage.less";
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
